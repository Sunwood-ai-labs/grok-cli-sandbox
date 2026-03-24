import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { Agent } from "./grok-cli/dist/agent/agent.js";
import { createTelegramBridge } from "./grok-cli/dist/telegram/bridge.js";
import { approvePairingCode } from "./grok-cli/dist/telegram/pairing.js";
import { createTurnCoordinator } from "./grok-cli/dist/telegram/turn-coordinator.js";
import {
  getApiKey,
  getBaseURL,
  getCurrentModel,
  getTelegramBotToken,
  loadUserSettings,
  saveUserSettings,
} from "./grok-cli/dist/utils/settings.js";

const rootDir = "D:/Prj/grok-sandbox";
const repoDir = path.join(rootDir, "grok-cli");
const logPath = path.join(rootDir, "telegram-remote-bridge.log");
const pairInputPath = path.join(rootDir, "telegram-pair-code.txt");
const startupConfig = {
  apiKey: getApiKey(),
  baseURL: getBaseURL(),
  model: getCurrentModel(),
  maxToolRounds: 400,
};

process.chdir(repoDir);

function log(message) {
  fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${message}\n`);
}

function truncate(text, limit = 160) {
  return text.length <= limit ? text : `${text.slice(0, limit - 1)}…`;
}

function saveApprovedUser(userId) {
  const settings = loadUserSettings();
  const ids = new Set(settings.telegram?.approvedUserIds ?? []);
  ids.add(userId);
  saveUserSettings({
    telegram: {
      ...settings.telegram,
      approvedUserIds: [...ids],
    },
  });
}

function ensurePairInputFile() {
  if (!fs.existsSync(pairInputPath)) {
    fs.writeFileSync(pairInputPath, "", "utf8");
  }
}

function buildTelegramAgentFactory() {
  const agents = new Map();

  return (userId) => {
    const existing = agents.get(userId);
    if (existing) return existing;

    if (!startupConfig.apiKey) {
      throw new Error("Grok API key required.");
    }

    const settings = loadUserSettings();
    const sessionId = settings.telegram?.sessionsByUserId?.[String(userId)];
    const agent = new Agent(
      startupConfig.apiKey,
      startupConfig.baseURL,
      startupConfig.model,
      startupConfig.maxToolRounds,
      { session: sessionId },
    );

    if (!sessionId && agent.getSessionId()) {
      saveUserSettings({
        telegram: {
          ...settings.telegram,
          sessionsByUserId: {
            ...settings.telegram?.sessionsByUserId,
            [String(userId)]: agent.getSessionId(),
          },
        },
      });
    }

    agents.set(userId, agent);
    return agent;
  };
}

async function fetchBotIdentity(token) {
  const response = await fetch(`https://api.telegram.org/bot${token}/getMe`);
  const data = await response.json();
  if (!data.ok) {
    throw new Error(data.description || "Telegram getMe failed");
  }
  return data.result;
}

const token = getTelegramBotToken();
if (!token) {
  throw new Error("Missing Telegram bot token in user settings or TELEGRAM_BOT_TOKEN.");
}
if (!startupConfig.apiKey) {
  throw new Error("Missing Grok API key.");
}

ensurePairInputFile();
const coordinator = createTurnCoordinator();
const getTelegramAgent = buildTelegramAgentFactory();

const bridge = createTelegramBridge({
  token,
  getApprovedUserIds: () => loadUserSettings().telegram?.approvedUserIds ?? [],
  coordinator,
  getTelegramAgent,
  onUserMessage: (event) => {
    log(`user ${event.userId}: ${truncate(event.content)}`);
  },
  onAssistantMessage: (event) => {
    if (event.done) {
      log(`assistant ${event.userId}: ${truncate(event.content)}`);
    }
  },
  onToolCalls: (event) => {
    const names = event.toolCalls.map((toolCall) => toolCall.function.name).join(", ");
    log(`tools ${event.userId}: ${names}`);
  },
  onToolResult: (event) => {
    log(`tool_result ${event.userId}: ${event.toolCall.function.name}`);
  },
  onError: (message) => {
    log(`bridge_error: ${message}`);
  },
});

let lastPairInput = "";
setInterval(() => {
  try {
    const code = fs.readFileSync(pairInputPath, "utf8").trim().toUpperCase();
    if (!code || code === lastPairInput) return;
    lastPairInput = code;
    const result = approvePairingCode(code);
    if (result.ok) {
      saveApprovedUser(result.userId);
      fs.writeFileSync(pairInputPath, "", "utf8");
      log(`pair_approved user=${result.userId} code=${code.slice(0, 2)}****`);
      return;
    }
    log(`pair_rejected: ${result.error}`);
  } catch (error) {
    log(`pair_watcher_error: ${error instanceof Error ? error.message : String(error)}`);
  }
}, 1000);

const bot = await fetchBotIdentity(token);
log(`bot_ready username=@${bot.username} id=${bot.id}`);
log(`approved_users=${(loadUserSettings().telegram?.approvedUserIds ?? []).length}`);
log("telegram_bridge_starting");
bridge.start();
log("telegram_bridge_started");

async function shutdown(signal) {
  log(`shutdown: ${signal}`);
  await bridge.stop().catch((error) => {
    log(`shutdown_error: ${error instanceof Error ? error.message : String(error)}`);
  });
  process.exit(0);
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});
process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

setInterval(() => {}, 60_000);

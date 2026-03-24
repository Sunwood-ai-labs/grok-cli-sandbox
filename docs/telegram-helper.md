# 🤖 Telegram Helper

This repository includes a helper that starts the existing Telegram remote-control bridge without going through the TUI pairing flow.

## What Changed in This Wrapper Repo

The helper entry point at [`../telegram-remote-bridge.mjs`](../telegram-remote-bridge.mjs) is now checkout-relative instead of hardcoded to one local path.

Optional overrides:

- `GROK_SANDBOX_ROOT`
- `GROK_SANDBOX_REPO_DIR`
- `GROK_SANDBOX_LOG_PATH`
- `GROK_SANDBOX_PAIR_PATH`

## Prerequisites

- `~/.grok/user-settings.json` must contain a valid `apiKey`
- the same file must contain `telegram.botToken`
- the pinned `./grok-cli` submodule must be initialized
- `./grok-cli/dist` must exist

## Start the Helper

From the repository root:

```powershell
bun .\telegram-remote-bridge.mjs
```

Confirm startup:

```powershell
Get-Content .\telegram-remote-bridge.log -Tail 20
```

You should see lifecycle lines such as:

```text
[... ] bot_ready username=@<your_bot> id=<bot_id>
[... ] telegram_bridge_started
```

## Pair Your Telegram Account

1. Open your bot in Telegram.
2. Send `/pair`.
3. Copy the 6-character code returned by the bot.
4. Write the code into `telegram-pair-code.txt`.

```powershell
Set-Content -Path .\telegram-pair-code.txt -Value '09FB08' -Encoding UTF8
```

If pairing succeeds, the log will contain `pair_approved`.

## Notes

- Keep the helper process running while using Telegram.
- Pairing and log artifacts are intentionally git-ignored.
- The bot can edit files inside the checked-out `grok-cli` submodule.
- Public docs intentionally use placeholders for live bot identifiers and user IDs.

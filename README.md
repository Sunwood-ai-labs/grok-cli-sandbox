# Grok Sandbox

This workspace is centered on the Sunwood fork of Grok CLI.

- Active repo: `D:\Prj\grok-sandbox\grok-cli`
- Upstream fork source: `https://github.com/Sunwood-ai-labs/grok-cli`
- Global command name: `grok`
- Current linked target: `D:\Prj\grok-sandbox\grok-cli`
- Published sandbox repo: `https://github.com/Sunwood-ai-labs/grok-cli-sandbox`
- `grok-cli` is tracked here as a Git submodule

## Clone This Sandbox

Clone with the nested CLI repo included:

```powershell
git clone --recurse-submodules https://github.com/Sunwood-ai-labs/grok-cli-sandbox
```

If you already cloned it without submodules:

```powershell
git -C D:\Prj\grok-sandbox submodule update --init --recursive
```

## Preview

Generated sample image created through the CLI:

![Generated monochrome cat logo](assets/grok-generated-cat-logo.jpg)

- Image file: `D:\Prj\grok-sandbox\assets\grok-generated-cat-logo.jpg`
- Original generated file: `D:\Prj\grok-sandbox\grok-cli\.grok\generated-media\image-2026-03-24T10-45-54-614Z.jpg`

## API Key Setup

Preferred location:

- User settings file: `C:\Users\Aslan\.grok\user-settings.json`

Expected shape:

```json
{
  "baseURL": "https://api.x.ai/v1",
  "defaultModel": "grok-code-fast-1",
  "apiKey": "<your xAI API key>"
}
```

Notes:

- Do not store secrets in the repository.
- `.env` is supported by `dotenv`, but this sandbox prefers `C:\Users\Aslan\.grok\user-settings.json`.
- Repo-local `.grok/` and `.env` are ignored by `.gitignore`.

## Local Usage

From this workspace:

```powershell
cd D:\Prj\grok-sandbox\grok-cli
grok --help
grok models
grok -p "Reply with only pong." --format json
```

Important:

- `grok --version` returns `1.0.0-rc5` in this environment
- `node dist/index.js ...` fails here on Node `v24.12.0` with `ERR_IMPORT_ATTRIBUTE_MISSING`
- the linked `grok` command is the stable path for local testing

## Verified Results

The old raw command dump has been folded into root-level docs.

Workspace docs:

- [Raw Command Log](./GROK_COMMANDS_AND_OUTPUTS.md)
- [Docs Index](./docs/README.md)
- [Telegram Helper Guide](./docs/telegram-helper.md)
- [Verification Summary](./docs/verification-summary.md)
- [Evidence Appendix](./docs/evidence.md)
- [Public README](./grok-cli/README.md)

Highlights confirmed in this workspace:

- headless prompt execution with JSON output
- session persistence with `--session latest`
- tool calls for `search_web`, `search_x`, `task`, `delegate`, and `delegation_read`
- image and video generation
- Telegram pairing, chat, tool use, and file edits through the helper bridge

Artifacts produced during the experiments:

- Generated image: `D:\Prj\grok-sandbox\assets\grok-generated-cat-logo.jpg`
- Generated video: `D:\Prj\grok-sandbox\grok-cli\.grok\generated-media\video-2026-03-24T11-16-18-036Z.mp4`

## Telegram Helper

This workspace includes a helper that starts the existing Telegram remote-control bridge without going through the TUI.

- Helper script: `D:\Prj\grok-sandbox\telegram-remote-bridge.mjs`
- Pairing code file: `D:\Prj\grok-sandbox\telegram-pair-code.txt`
- Log file: `D:\Prj\grok-sandbox\telegram-remote-bridge.log`

Prerequisites:

- `C:\Users\Aslan\.grok\user-settings.json` must already contain a valid `apiKey`
- the same file must contain `telegram.botToken`
- `D:\Prj\grok-sandbox\grok-cli\dist` must exist

Start the helper in a separate terminal:

```powershell
cmd /c start "" /B C:\Users\Aslan\.local\bin\bun.cmd D:\Prj\grok-sandbox\telegram-remote-bridge.mjs
```

Confirm startup:

```powershell
Get-Content D:\Prj\grok-sandbox\telegram-remote-bridge.log -Tail 20
```

You should see lines like:

```text
[... ] bot_ready username=@<your_bot> id=<bot_id>
[... ] telegram_bridge_started
```

Pair your Telegram account:

1. Open your bot in Telegram
2. Send `/pair`
3. Copy the 6-character code from Telegram
4. Write the code into the watched file:

```powershell
Set-Content -Path D:\Prj\grok-sandbox\telegram-pair-code.txt -Value '09FB08' -Encoding UTF8
```

If pairing succeeds, the log will contain `pair_approved`.

After that, just chat with the bot in Telegram. The helper keeps the bridge alive and reuses the saved Grok session for that Telegram user.

Useful checks:

```powershell
Get-Content D:\Prj\grok-sandbox\telegram-remote-bridge.log -Tail 50
Get-Content D:\Prj\grok-sandbox\telegram-pair-code.txt
```

Notes:

- Keep the helper process running while you use Telegram
- tool calls and replies are logged to `telegram-remote-bridge.log`
- the bot can trigger file edits in `D:\Prj\grok-sandbox\grok-cli`, so use it in a repo you are comfortable modifying
- pairing state and Telegram session IDs are stored in `C:\Users\Aslan\.grok\user-settings.json`
- helper runtime artifacts are ignored by `D:\Prj\grok-sandbox\.gitignore`
- a fuller guide lives in [Telegram Helper Guide](./docs/telegram-helper.md)

## Notes

- Background delegation artifacts are stored under `C:\Users\Aslan\.grok\delegations\`
- this workspace root is now the published sandbox repository
- `D:\Prj\grok-sandbox\grok-cli` remains the active nested Grok CLI repo and is tracked as a Git submodule

# Telegram Helper Guide

This workspace includes a helper that starts the existing Telegram remote-control bridge without opening the TUI flow.

## Files

- Helper script: `D:\Prj\grok-sandbox\telegram-remote-bridge.mjs`
- Pairing code file: `D:\Prj\grok-sandbox\telegram-pair-code.txt`
- Log file: `D:\Prj\grok-sandbox\telegram-remote-bridge.log`

## Prerequisites

- `C:\Users\Aslan\.grok\user-settings.json` must contain a valid `apiKey`
- the same file must contain `telegram.botToken`
- `D:\Prj\grok-sandbox\grok-cli\dist` must exist

## Start

Run the helper in another terminal:

```powershell
cmd /c start "" /B C:\Users\Aslan\.local\bin\bun.cmd D:\Prj\grok-sandbox\telegram-remote-bridge.mjs
```

Confirm startup:

```powershell
Get-Content D:\Prj\grok-sandbox\telegram-remote-bridge.log -Tail 20
```

Expected lines:

```text
[... ] bot_ready username=@<your_bot> id=<bot_id>
[... ] telegram_bridge_started
```

## Pairing

1. Open your bot in Telegram
2. Send `/pair`
3. Copy the 6-character code Telegram returns
4. Write the code into the watched file

```powershell
Set-Content -Path D:\Prj\grok-sandbox\telegram-pair-code.txt -Value '09FB08' -Encoding UTF8
```

If pairing succeeds, the log will contain `pair_approved`.

## During Use

- Keep the helper process running while using Telegram
- Replies and tool calls are logged to `telegram-remote-bridge.log`
- The bot can edit files inside `D:\Prj\grok-sandbox\grok-cli`
- Pairing state and Telegram session IDs are stored in `C:\Users\Aslan\.grok\user-settings.json`

## Useful Checks

```powershell
Get-Content D:\Prj\grok-sandbox\telegram-remote-bridge.log -Tail 50
Get-Content D:\Prj\grok-sandbox\telegram-pair-code.txt
```

The runtime helper artifacts are ignored by `D:\Prj\grok-sandbox\.gitignore`.

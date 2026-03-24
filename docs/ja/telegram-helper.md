# 🤖 Telegram Helper

この repo には、TUI を経由せず Telegram remote-control bridge を起動できる helper が含まれています。

## wrapper 側で整えた点

[`../../telegram-remote-bridge.mjs`](../../telegram-remote-bridge.mjs) は、特定のローカルパスに固定せず、checkout 位置から必要ファイルを解決するようにしてあります。

上書き可能な環境変数:

- `GROK_SANDBOX_ROOT`
- `GROK_SANDBOX_REPO_DIR`
- `GROK_SANDBOX_LOG_PATH`
- `GROK_SANDBOX_PAIR_PATH`

## 前提条件

- `~/.grok/user-settings.json` に `apiKey` がある
- 同じファイルに `telegram.botToken` がある
- `./grok-cli` submodule が初期化済み
- `./grok-cli/dist` が存在する

## 起動

repo root から:

```powershell
bun .\telegram-remote-bridge.mjs
```

起動確認:

```powershell
Get-Content .\telegram-remote-bridge.log -Tail 20
```

期待する行:

```text
[... ] bot_ready username=@<your_bot> id=<bot_id>
[... ] telegram_bridge_started
```

## pairing

1. Telegram で bot を開く
2. `/pair` を送る
3. 返ってきた 6 文字コードを `telegram-pair-code.txt` に書く

```powershell
Set-Content -Path .\telegram-pair-code.txt -Value '09FB08' -Encoding UTF8
```

成功すると log に `pair_approved` が出ます。

## 注意

- helper を使う間はプロセスを動かし続けてください
- pairing file と log は git-ignored です
- bot は checked-out された `grok-cli` submodule 内のファイルを編集できます
- public docs では live bot identifier と user ID は placeholder にしています

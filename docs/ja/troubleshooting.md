# 🛠️ トラブルシュート

## `grok-cli` が空に見える

submodule なしで clone した可能性があります。

```powershell
git submodule update --init --recursive
```

## helper が `grok-cli` を見つけられない

`./grok-cli` があるか確認するか、環境変数で上書きします。

```powershell
$env:GROK_SANDBOX_REPO_DIR = "<path-to-grok-cli>"
bun .\telegram-remote-bridge.mjs
```

## `grok` 実行時に credential がない

`~/.grok/user-settings.json` の以下を確認してください。

- `apiKey`
- `baseURL`
- `defaultModel`
- helper を使う場合は `telegram.botToken`

## docs build に失敗する

`./docs` で以下をやり直します。

```powershell
npm install
npm run assets:build
npm run docs:build
```

依存差分が出た場合は `docs/package-lock.json` も更新対象です。

## `node dist/index.js` が失敗する

元の Windows sandbox セッションでは Node `v24.12.0` 上で `ERR_IMPORT_ATTRIBUTE_MISSING` を観測しました。主要経路としては `grok` コマンドを使ってください。

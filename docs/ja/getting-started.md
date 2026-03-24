# 🚀 はじめに

## この repo が向いているケース

- sandbox で使った `grok-cli` snapshot をそのまま再現したい
- 検証メモと helper を含めて参照したい
- raw notebook ではなく整理済み docs から入りたい

CLI 本体だけが必要なら submodule 側を直接使う方がシンプルです。

## Clone

```powershell
git clone --recurse-submodules https://github.com/Sunwood-ai-labs/grok-cli-sandbox
cd grok-cli-sandbox
```

submodule なしで clone した場合:

```powershell
git submodule update --init --recursive
```

## xAI 設定

`~/.grok/user-settings.json` に設定を置きます。

```json
{
  "baseURL": "https://api.x.ai/v1",
  "defaultModel": "grok-code-fast-1",
  "apiKey": "<your xAI API key>"
}
```

## CLI を試す

```powershell
cd .\grok-cli
grok --help
grok models
grok -p "Reply with only pong." --format json
```

## docs を build する

```powershell
cd ..\docs
npm install
npm run assets:build
npm run docs:build
```

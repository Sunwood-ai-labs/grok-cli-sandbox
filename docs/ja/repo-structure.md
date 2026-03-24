# 🧩 リポジトリ構成

## root repo と submodule の関係

このリポジトリは 2 層構成です。

- `grok-cli-sandbox`: 公開用 wrapper repo
- `grok-cli`: 検証時に使った CLI source snapshot を固定する submodule

submodule の URL は [`.gitmodules`](https://github.com/Sunwood-ai-labs/grok-cli-sandbox/blob/main/.gitmodules) にあり、`Sunwood-ai-labs/grok-cli` を指しています。

## 主なパス

| Path | 役割 |
| --- | --- |
| `./grok-cli` | sandbox で使った CLI snapshot |
| `./docs` | VitePress docs と日英ガイド |
| `./assets` | repo 用アセットとサンプル画像 |
| `./telegram-remote-bridge.mjs` | Telegram helper |
| `./GROK_COMMANDS_AND_OUTPUTS.md` | 元セッションの raw notebook |

## Snapshot 契約

root repo が固定している `grok-cli` commit は、`Sunwood-ai-labs/grok-cli` の `codex/sandbox-snapshot-20260324` branch から到達可能です。

これにより `git clone --recurse-submodules` の再現性を保っています。

## ローカル専用のもの

- repo-local `.grok/`
- `.env` と `.env.*`
- `telegram-pair-code.txt`
- `telegram-remote-bridge.log`
- 個人の `~/.grok/` 設定と runtime DB

<div align="center">
  <img src="./assets/grok-sandbox-mark.svg" alt="Grok Sandbox mark" width="108" />
  <h1>Grok Sandbox</h1>
  <p><strong>検証済み Grok CLI 実験を公開するためのラッパーリポジトリです。</strong><br />日英ドキュメント、持ち運べる Telegram helper、そして Sunwood Grok CLI fork の固定 snapshot をまとめています。</p>
</div>

<p align="center">
  <a href="https://github.com/Sunwood-ai-labs/grok-cli-sandbox/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/Sunwood-ai-labs/grok-cli-sandbox/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://github.com/Sunwood-ai-labs/grok-cli-sandbox/actions/workflows/docs-pages.yml"><img alt="Docs Pages" src="https://github.com/Sunwood-ai-labs/grok-cli-sandbox/actions/workflows/docs-pages.yml/badge.svg" /></a>
  <a href="./LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-0f3b68.svg" /></a>
</p>

<p align="center">
  <a href="./README.md">English</a>
  ·
  <a href="./README.ja.md">日本語</a>
  ·
  <a href="https://sunwood-ai-labs.github.io/grok-cli-sandbox/">Docs</a>
</p>

<p align="center">
  <img src="./assets/grok-sandbox-hero.svg" alt="Grok Sandbox hero illustration" width="860" />
</p>

## ✨ このリポジトリについて

`grok-cli-sandbox` は、検証済みの Grok CLI ワークスペースを公開用に整えたラッパーリポジトリです。

- 実際の CLI ソースは [`./grok-cli`](./grok-cli) submodule にあります。
- root 側には、整えた docs、検証メモ、helper スクリプト、公開向けアセットを配置しています。
- submodule は [`Sunwood-ai-labs/grok-cli`](https://github.com/Sunwood-ai-labs/grok-cli/tree/codex/sandbox-snapshot-20260324) 上の公開 branch に固定しており、fresh clone でも再現できます。

この repo は「CLI 本体の upstream」ではなく、「再現可能な sandbox とドキュメント面」を担う構成です。

## 🚀 はじめに

1. submodule 付きで clone します。

   ```powershell
   git clone --recurse-submodules https://github.com/Sunwood-ai-labs/grok-cli-sandbox
   cd grok-cli-sandbox
   ```

2. xAI の設定を `~/.grok/user-settings.json` に入れます。

   ```json
   {
     "baseURL": "https://api.x.ai/v1",
     "defaultModel": "grok-code-fast-1",
     "apiKey": "<your xAI API key>"
   }
   ```

3. submodule 側の CLI snapshot を使います。

   ```powershell
   cd .\grok-cli
   grok --help
   grok models
   grok -p "Reply with only pong." --format json
   ```

4. 公開 docs の見え方をローカルで確認したい場合は docs site を build します。

   ```powershell
   cd ..\docs
   npm install
   npm run assets:build
   npm run docs:build
   ```

## 🧪 検証済みの範囲

整えた検証ページは **2026-03-24** の Windows sandbox セッションを元にしています。

- headless prompt 実行と JSON event 出力
- `--session latest` によるセッション継続
- `search_web`, `search_x`, `task`, `delegate`, `delegation_read`
- 画像生成とメディア出力
- Telegram remote-control の pairing と helper 経由の操作

ここに書いている内容は「その時点で観測できた事実」であり、今後の全バージョンで不変とは限りません。

## 📚 次に読むページ

- [Docs site](https://sunwood-ai-labs.github.io/grok-cli-sandbox/)
- [はじめに](./docs/ja/getting-started.md)
- [リポジトリ構成](./docs/ja/repo-structure.md)
- [検証サマリー](./docs/ja/verification-summary.md)
- [Telegram Helper ガイド](./docs/ja/telegram-helper.md)
- [証跡とアーカイブ](./docs/ja/evidence.md)
- [生ログのアーカイブ](./GROK_COMMANDS_AND_OUTPUTS.md)

## 🧩 リポジトリ構成

| Path | 役割 |
| --- | --- |
| [`grok-cli`](./grok-cli) | `Sunwood-ai-labs/grok-cli` から固定した CLI snapshot |
| [`docs`](./docs) | 日英の VitePress docs とガイド |
| [`assets`](./assets) | サンプル生成物と公開用のブランドアセット |
| [`telegram-remote-bridge.mjs`](./telegram-remote-bridge.mjs) | Telegram remote-control 用 helper |
| [`GROK_COMMANDS_AND_OUTPUTS.md`](./GROK_COMMANDS_AND_OUTPUTS.md) | 元セッションの raw notebook を残した archive |

## 🤖 Telegram Helper

[`telegram-remote-bridge.mjs`](./telegram-remote-bridge.mjs) は、clone 先のルートを自動解決するように直してあります。以前のように特定ローカルパスへ固定されません。

```powershell
bun .\telegram-remote-bridge.mjs
```

必要なら以下の環境変数で log や pairing file の場所も上書きできます。

- `GROK_SANDBOX_ROOT`
- `GROK_SANDBOX_REPO_DIR`
- `GROK_SANDBOX_LOG_PATH`
- `GROK_SANDBOX_PAIR_PATH`

詳細は [docs/ja/telegram-helper.md](./docs/ja/telegram-helper.md) にまとめています。

## 🔐 Secrets と公開方針

- repo-local の `.grok/`, `.env*`, pairing file, helper log は git-ignored です。
- docs では bot token, user ID, local DB path などの live 情報は公開しない方針です。
- ローカルにしか存在しない runtime artifact は [docs/ja/evidence.md](./docs/ja/evidence.md) で「未公開証跡」として分離しています。

## 🖼️ サンプル出力

検証セッションから残しているサンプル画像:

![Generated monochrome cat logo](./assets/grok-generated-cat-logo.jpg)

## ⚠️ スコープ

- この repo は sandbox snapshot の記録と再現を目的としています。CLI 本体の upstream ではありません。
- `node dist/index.js` に関する caveat は 2026-03-24 の Node `v24.12.0` 環境で観測したものです。
- 生ログ archive には日本語テキストや端末依存の文字化けが含まれることがあります。公開説明としては curated docs を優先してください。

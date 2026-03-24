# 🗂️ 証跡とアーカイブ

このページでは「repo に公開している証跡」と「ローカル専用で保持している証跡」を分けて説明します。

## 公開している証跡

以下は commit 済みで、public repo から参照できます。

- [`../../assets/grok-generated-cat-logo.jpg`](../../assets/grok-generated-cat-logo.jpg)
- [`../../telegram-remote-bridge.mjs`](../../telegram-remote-bridge.mjs)
- [検証サマリー](./verification-summary.md)
- [Telegram Helper](./telegram-helper.md)
- [生ログ archive](https://github.com/Sunwood-ai-labs/grok-cli-sandbox/blob/main/GROK_COMMANDS_AND_OUTPUTS.md)

## ローカル専用の runtime 証跡

以下は意図的に version control へ入れていません。

- repo-local `.grok/`
- `telegram-pair-code.txt`
- `telegram-remote-bridge.log`
- 個人の `~/.grok/user-settings.json`
- `~/.grok/` 配下の runtime DB

## archive 方針

[`GROK_COMMANDS_AND_OUTPUTS.md`](https://github.com/Sunwood-ai-labs/grok-cli-sandbox/blob/main/GROK_COMMANDS_AND_OUTPUTS.md) は、元の Windows sandbox セッションから残している raw notebook です。

注意点:

- 日本語テキストを含みます
- 端末依存の文字化けが見えることがあります
- 公開説明の主文書ではなく、歴史的 appendix として扱います

public-facing な説明には、この `docs/` 配下の curated pages を優先してください。

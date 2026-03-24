# Verification Summary

このページは sandbox 検証メモのうち、公開 docs として読みやすい部分を整理した要約です。

## Session Scope

- 観測日: `2026-03-24`
- 環境: Windows sandbox workspace
- wrapper repo: `grok-cli-sandbox`
- CLI source: 固定した `grok-cli` submodule snapshot
- 主に使った command: `grok`

## Verified CLI Flows

- `grok --help`
- `grok models`
- `grok -p "Reply with only pong." --format json`
- `grok --session latest`

観測結果:

- headless mode では `step_start`, `text`, `step_finish` などの JSON event が返った
- `--session latest` によるセッション継続で直前の文脈を再利用できた

## Verified Tool Families

- `search_web`
- `search_x`
- `task`
- `delegate`
- `delegation_read`

ここで書いている内容は、検証した snapshot に対する観測結果です。将来の全リリースを保証するものではありません。

## Command Highlights From the Archive

raw archive `GROK_COMMANDS_AND_OUTPUTS.md` の要点も docs 側に反映しました。

archive から持ち上げた内容:

- `bun`, `node`, `grok --version` による環境 capture
- `bun install`, `bun run build`, `bun run typecheck`, `vitest` による local verification
- headless JSON output と `--session latest` による引き継ぎ
- `search_web`, `task`, `delegate`, `delegation_read`, `search_x` の tool-call examples
- `generate_image`, `generate_video` の media flow
- Telegram helper startup, pairing, chat, file edit, unit tests, pairing-store check, invalid-token failure path

詳細は [Command Highlights](./command-highlights.md) を参照してください。

## Verified Media Output

repo に公開しているアーティファクト:

- sample image: [`../../assets/grok-generated-cat-logo.jpg`](../../assets/grok-generated-cat-logo.jpg)

ローカル専用に留めているもの:

- repo-local `.grok/generated-media/` 配下の動画や追加メディア

## Telegram Flow

Telegram helper については以下を確認しました。

- bot identity lookup
- bridge startup
- pairing approval flow
- normal chat
- tool-triggered file operations

bot ID や user ID のような live identifier は public docs には載せていません。証跡境界は [証跡とアーカイブ](./evidence.md) を参照してください。

## Environment-Specific Caveat

2026-03-24 の検証では、Node `v24.12.0` で `node dist/index.js` が `ERR_IMPORT_ATTRIBUTE_MISSING` を返しました。安定経路としては `grok` command を使用しています。

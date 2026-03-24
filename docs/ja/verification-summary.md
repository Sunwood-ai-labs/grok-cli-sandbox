# 🧪 検証サマリー

このページは sandbox 検証メモのうち、公開しても読みやすい形に整理した要約です。

## セッション範囲

- 観測日: `2026-03-24`
- 環境: Windows sandbox workspace
- wrapper repo: `grok-cli-sandbox`
- CLI source: 固定された `grok-cli` submodule snapshot
- 主に使ったコマンド: `grok`

## 検証した CLI フロー

- `grok --help`
- `grok models`
- `grok -p "Reply with only pong." --format json`
- `grok --session latest`

観測した内容:

- headless mode では `step_start`, `text`, `step_finish` などの JSON event が返った
- セッション継続では以前の文脈を再利用できた

## 検証した tool family

- `search_web`
- `search_x`
- `task`
- `delegate`
- `delegation_read`

ここに書いているのは検証 snapshot で観測できた事実であり、今後の全リリースを保証するものではありません。

## メディア出力

repo に公開しているアーティファクト:

- sample image: [`../../assets/grok-generated-cat-logo.jpg`](../../assets/grok-generated-cat-logo.jpg)

ローカル専用に留めているもの:

- repo-local `.grok/generated-media/` 配下の動画や追加メディア

## Telegram フロー

Telegram helper については以下を確認しました。

- bot identity lookup
- bridge startup
- pairing approval flow
- normal chat
- tool-triggered file operations

bot ID や user ID のような live identifier は public docs には載せていません。証跡境界は [証跡とアーカイブ](./evidence.md) を参照してください。

## 環境依存の caveat

2026-03-24 の検証では、Node `v24.12.0` で `node dist/index.js` が `ERR_IMPORT_ATTRIBUTE_MISSING` を返しました。安定経路としては `grok` コマンドを使用しています。

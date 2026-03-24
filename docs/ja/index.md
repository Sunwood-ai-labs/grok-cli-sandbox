---
layout: home

hero:
  name: Grok Sandbox
  text: Grok CLI snapshot を検証付きで公開する wrapper docs
  tagline: Sunwood Grok CLI fork の固定 snapshot を、helper と検証メモ付きで公開するためのドキュメント面です。
  image:
    src: /grok-sandbox-mark.svg
    alt: Grok Sandbox mark
  actions:
    - theme: brand
      text: はじめに
      link: /ja/getting-started
    - theme: alt
      text: 検証サマリー
      link: /ja/verification-summary
    - theme: alt
      text: English
      link: /

features:
  - title: 固定 snapshot
    icon: 📦
    details: root repo は公開 branch から到達可能な `grok-cli` submodule commit を固定しています。
  - title: 整理済み docs
    icon: 📚
    details: raw notebook と公開向け docs を分け、初見でも辿りやすい構成にしています。
  - title: Telegram helper
    icon: 🤖
    details: helper は clone 先のパスを自動解決し、必要なら環境変数で上書きできます。
  - title: 日付付き証跡
    icon: 🧪
    details: 検証内容は timeless な保証ではなく、2026-03-24 の観測結果として記録しています。
---

## この docs の役割

- sandbox wrapper repo の公開 README と docs 面を支える
- `grok-cli` submodule の位置づけを明確にする
- Telegram helper と検証メモを public-safe に整理する

::: tip 使い分け
CLI 本体だけを追いたい場合は [`grok-cli`](https://github.com/Sunwood-ai-labs/grok-cli/tree/codex/sandbox-snapshot-20260324) を見てください。wrapper repo と docs を含めて使いたい場合はこの repo を起点にするのが自然です。
:::

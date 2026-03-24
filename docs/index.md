---
layout: home

hero:
  name: Grok Sandbox
  text: Verified notes around a pinned Grok CLI snapshot
  tagline: Public wrapper docs for the Sunwood Grok CLI fork, with helper tooling, bilingual guides, and dated verification notes.
  image:
    src: /grok-sandbox-mark.svg
    alt: Grok Sandbox mark
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: Verification Summary
      link: /verification-summary
    - theme: alt
      text: 日本語
      link: /ja/

features:
  - title: Pinned snapshot
    icon: 📦
    details: The root repo tracks the CLI source through a published submodule snapshot so fresh clones stay reproducible.
  - title: Curated docs
    icon: 📚
    details: Public-facing documentation is separated from raw notes so first-time readers can onboard quickly.
  - title: Telegram helper
    icon: 🤖
    details: The bridge helper now resolves paths from the current checkout and documents optional overrides.
  - title: Dated evidence
    icon: 🧪
    details: Verification claims are kept as session-dated observations instead of timeless product promises.
---

## What You Will Find Here

- A public README and docs site for the sandbox wrapper repository
- The `grok-cli` submodule pinned to a published snapshot branch
- A portable helper for Telegram remote control
- Curated verification notes from the original 2026-03-24 Windows sandbox run

::: tip Start here
If you only need the CLI source, head directly to the [`grok-cli`](https://github.com/Sunwood-ai-labs/grok-cli/tree/codex/sandbox-snapshot-20260324) snapshot. If you want the tested wrapper, docs, and helper notes, stay in this repository.
:::

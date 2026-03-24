# Contributing

Thanks for improving `grok-cli-sandbox`.

## Scope

This repository is the public wrapper around a pinned `grok-cli` snapshot. Please keep changes focused on:

- root-level docs and assets
- helper scripts in the wrapper repo
- CI and publishing for this wrapper repo
- verification notes that clearly state their observation date

Changes to the CLI source itself should normally happen in the `grok-cli` repository, then be pulled into this repo by updating the submodule.

## Local Workflow

1. Clone with submodules.
2. Build the docs from `./docs`.
3. Run `npm run assets:build` and `npm run docs:build`.
4. Check `node --check telegram-remote-bridge.mjs` before opening a PR.

## Documentation Rules

- Prefer relative paths or placeholders over machine-specific absolute paths.
- Treat verification claims as dated observations.
- Keep English and Japanese docs structurally aligned when both are touched.

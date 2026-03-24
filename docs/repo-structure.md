# 🧩 Repository Layout

## Root Repo vs Submodule

This repository is intentionally split into two layers:

- `grok-cli-sandbox` is the public wrapper repo you are reading now.
- `grok-cli` is a Git submodule that pins the CLI source snapshot used during verification.

The submodule URL is declared in [`.gitmodules`](https://github.com/Sunwood-ai-labs/grok-cli-sandbox/blob/main/.gitmodules) and points to `Sunwood-ai-labs/grok-cli`.

## Important Paths

| Path | Role |
| --- | --- |
| `./grok-cli` | CLI snapshot used by the sandbox |
| `./docs` | VitePress docs source and bilingual guides |
| `./assets` | Repo identity assets and sample generated image |
| `./telegram-remote-bridge.mjs` | Telegram helper entry point |
| `./GROK_COMMANDS_AND_OUTPUTS.md` | Archived raw session notebook |

## Snapshot Contract

The current root repo pins a `grok-cli` commit that is reachable from the published branch `codex/sandbox-snapshot-20260324` in `Sunwood-ai-labs/grok-cli`.

That contract matters because it keeps `git clone --recurse-submodules` reproducible for other readers.

## What Lives Only Locally

These remain outside version control:

- repo-local `.grok/`
- `.env` and `.env.*`
- `telegram-pair-code.txt`
- `telegram-remote-bridge.log`
- personal `~/.grok/` settings and runtime databases

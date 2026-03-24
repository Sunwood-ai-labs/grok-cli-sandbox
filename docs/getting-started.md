# 🚀 Getting Started

## Who This Repo Is For

Use this wrapper repository if you want:

- the tested `grok-cli` snapshot used in the sandbox
- curated notes about what was verified
- the Telegram helper script and its operating notes
- a public docs surface instead of a one-off local notebook

If you only want the CLI source, the submodule repository is the better starting point.

## Clone the Repo

Clone with submodules so the pinned CLI snapshot is available immediately.

```powershell
git clone --recurse-submodules https://github.com/Sunwood-ai-labs/grok-cli-sandbox
cd grok-cli-sandbox
```

If you already cloned without submodules:

```powershell
git submodule update --init --recursive
```

## Configure xAI Credentials

Store your xAI configuration in `~/.grok/user-settings.json`.

```json
{
  "baseURL": "https://api.x.ai/v1",
  "defaultModel": "grok-code-fast-1",
  "apiKey": "<your xAI API key>"
}
```

The repository intentionally ignores local `.grok/`, `.env*`, pairing files, and helper logs.

## Try the CLI Snapshot

```powershell
cd .\grok-cli
grok --help
grok models
grok -p "Reply with only pong." --format json
```

## Build the Docs Locally

```powershell
cd ..\docs
npm install
npm run assets:build
npm run docs:build
```

The build output is written to `docs/.vitepress/dist`.

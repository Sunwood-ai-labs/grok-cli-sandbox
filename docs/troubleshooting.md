# 🛠️ Troubleshooting

## `grok-cli` Is Empty After Clone

You probably cloned without submodules.

```powershell
git submodule update --init --recursive
```

## The Telegram Helper Cannot Find `grok-cli`

Confirm the submodule exists at `./grok-cli`, or override the helper path:

```powershell
$env:GROK_SANDBOX_REPO_DIR = "<path-to-grok-cli>"
bun .\telegram-remote-bridge.mjs
```

## `grok` Fails Because Credentials Are Missing

Check `~/.grok/user-settings.json` for:

- `apiKey`
- `baseURL`
- `defaultModel`
- `telegram.botToken` when using the helper

## Docs Build Fails

From `./docs`, rerun:

```powershell
npm install
npm run assets:build
npm run docs:build
```

If the install step changed dependencies, commit the updated `docs/package-lock.json`.

## `node dist/index.js` Fails on the Verified Snapshot

The original Windows sandbox session observed `ERR_IMPORT_ATTRIBUTE_MISSING` on Node `v24.12.0`. Use the `grok` command path documented in the verification notes instead of treating direct `node dist/index.js` as the primary entry point.

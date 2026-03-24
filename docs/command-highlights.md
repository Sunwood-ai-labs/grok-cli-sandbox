# Command Highlights

This page distills the most useful command evidence from [`GROK_COMMANDS_AND_OUTPUTS.md`](https://github.com/Sunwood-ai-labs/grok-cli-sandbox/blob/main/GROK_COMMANDS_AND_OUTPUTS.md) into a public-facing summary.

## Environment Capture

The archive recorded these baseline commands and results:

- `bun --version` -> `1.3.11`
- `node --version` -> `v24.12.0`
- `grok --version` -> `1.0.0-rc5`

It also confirmed that the globally linked `grok` command resolved to the checked-out `grok-cli` snapshot used in the sandbox.

## Local Setup and Verification

The raw log includes successful setup and validation runs for the pinned CLI snapshot:

```powershell
bun install
bun run build
bun run typecheck
bunx vitest run src/grok/client.test.ts
```

Observed result:

- the build completed
- typecheck passed
- `src/grok/client.test.ts` finished with 11 passing tests

## CLI Surface and Headless Mode

The archive captured:

- `grok --help`
- `grok models`
- `node dist/index.js --version`

Important observation:

- `node dist/index.js --version` failed with `ERR_IMPORT_ATTRIBUTE_MISSING` on Node `v24.12.0`
- the stable path used for verification was the `grok` command rather than direct `node dist/index.js`

For headless execution, the archive also recorded:

```powershell
grok -p "Reply with only pong." --format json
grok -p "Remember this code word exactly: NEBULA-47." --format json
grok -s latest -p "What code word did I just ask you to remember? Reply with only the code word." --format json
```

Observed result:

- JSON event output included `step_start`, `text`, and `step_finish`
- `--session latest` successfully recalled `NEBULA-47`

## Tool Call Coverage

The raw notebook contains concrete examples for these tool families:

- `search_web`
- `task`
- `delegate`
- `delegation_read`
- `search_x`

Observed result:

- `search_web` returned a current xAI-related article title and URL
- `task` with the `explore` agent summarized the `README.md` selling points
- `delegate` created a background delegation artifact even when the immediate headless output was thin
- `delegation_read` returned a one-sentence summary from a prior delegation
- `search_x` returned a recent xAI-related post summary

## Media Generation

The archive shows both image and video generation flows:

```powershell
grok -d ./grok-cli -p "Use the generate_image tool ..." --format json
grok -d . -p "Use the generate_video tool ..." --format json
```

Observed result:

- the image flow saved a cat-face logo under repo-local generated media
- the video flow produced a 3-second push-in video from that image
- the sample image was copied into [`../assets/grok-generated-cat-logo.jpg`](../assets/grok-generated-cat-logo.jpg)

## Telegram Coverage

The raw notebook recorded several Telegram-oriented checks:

- helper startup and lifecycle logging
- pairing approval flow
- message roundtrip over Telegram chat
- `search_x` plus file write / edit from Telegram instructions
- Telegram unit tests
- pairing-store smoke test
- invalid-token bridge failure path

Representative command families captured in the archive:

```powershell
bunx vitest run src/telegram/limits.test.ts src/ui/telegram-turn-ui.test.ts
@' ... registerPairingCode / approvePairingCode ... '@ | bun -
@' ... createTelegramBridge(...) with invalid token ... '@ | bun -
```

Observed result:

- Telegram unit tests passed with 7 tests
- pairing approval succeeded once and then correctly failed on reuse with `Unknown or expired code.`
- invalid-token startup returned `Call to 'getMe' failed! (401: Unauthorized)`

## Why This Page Exists

The raw archive remains useful, but it also contains machine-specific paths and terminal-dependent encoding artifacts. This page keeps the command results visible in the docs set without repeating the full raw notebook verbatim.

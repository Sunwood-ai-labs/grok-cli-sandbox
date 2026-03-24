# Command Highlights

このページは [`GROK_COMMANDS_AND_OUTPUTS.md`](https://github.com/Sunwood-ai-labs/grok-cli-sandbox/blob/main/GROK_COMMANDS_AND_OUTPUTS.md) の内容を、公開 docs 用に整理した要約です。

## Environment Capture

archive には次の baseline command と結果が残っています。

- `bun --version` -> `1.3.11`
- `node --version` -> `v24.12.0`
- `grok --version` -> `1.0.0-rc5`

また、global の `grok` command が sandbox で使った `grok-cli` snapshot を指していたことも確認されています。

## Local Setup and Verification

raw log には、固定した CLI snapshot に対する setup / validation command が残っています。

```powershell
bun install
bun run build
bun run typecheck
bunx vitest run src/grok/client.test.ts
```

観測結果:

- build は完了
- typecheck は pass
- `src/grok/client.test.ts` は 11 passing tests

## CLI Surface and Headless Mode

archive には以下の command が含まれます。

- `grok --help`
- `grok models`
- `node dist/index.js --version`

重要な観測:

- `node dist/index.js --version` は Node `v24.12.0` で `ERR_IMPORT_ATTRIBUTE_MISSING`
- 検証時の安定経路としては `node dist/index.js` ではなく `grok` command を使用

headless 実行については次の command も残っています。

```powershell
grok -p "Reply with only pong." --format json
grok -p "Remember this code word exactly: NEBULA-47." --format json
grok -s latest -p "What code word did I just ask you to remember? Reply with only the code word." --format json
```

観測結果:

- JSON event として `step_start`, `text`, `step_finish` が出力
- `--session latest` で `NEBULA-47` を引き継げた

## Tool Call Coverage

raw notebook には次の tool family の具体例があります。

- `search_web`
- `task`
- `delegate`
- `delegation_read`
- `search_x`

観測結果:

- `search_web` は xAI 関連の current article title と URL を返した
- `task` の `explore` agent は `README.md` の selling points を要約した
- `delegate` は headless output が薄い場合でも background artifact を生成した
- `delegation_read` は既存 delegation から 1 文要約を返した
- `search_x` は xAI 関連の recent post summary を返した

## Media Generation

archive には画像生成と動画生成の両方が含まれます。

```powershell
grok -d ./grok-cli -p "Use the generate_image tool ..." --format json
grok -d . -p "Use the generate_video tool ..." --format json
```

観測結果:

- 画像生成では cat-face logo が repo-local generated media に保存
- 動画生成ではその画像から 3-second push-in video を生成
- sample image は [`../../assets/grok-generated-cat-logo.jpg`](../../assets/grok-generated-cat-logo.jpg) として保持

## Telegram Coverage

raw notebook には Telegram 関連の検証もまとまっています。

- helper startup と lifecycle log
- pairing approval flow
- Telegram chat roundtrip
- Telegram 経由の `search_x` と file write / edit
- Telegram unit tests
- pairing-store smoke test
- invalid-token bridge failure path

代表的な command family:

```powershell
bunx vitest run src/telegram/limits.test.ts src/ui/telegram-turn-ui.test.ts
@' ... registerPairingCode / approvePairingCode ... '@ | bun -
@' ... createTelegramBridge(...) with invalid token ... '@ | bun -
```

観測結果:

- Telegram unit tests は 7 tests passing
- pairing approval は 1 回目だけ成功し、再利用時は `Unknown or expired code.` を返した
- invalid-token startup は `Call to 'getMe' failed! (401: Unauthorized)` を返した

## Why This Page Exists

raw archive 自体は残していますが、machine-specific path や terminal-dependent encoding artifact も含みます。このページでは、archive の command 結果を docs 内で読みやすく参照できる形に整理しています。

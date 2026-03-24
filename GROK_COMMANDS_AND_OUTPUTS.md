# Grok CLI 実行コマンドとアウトプットまとめ

## 概要

このファイルは、`D:\Prj\grok-sandbox\grok-cli` を対象に実際に実行したコマンドと、その主要アウトプットをまとめたものです。

- 実行日: `2026-03-24`
- シェル: `PowerShell`
- 対象 CLI: グローバル `grok` コマンドと、repo 直下の `bun` / `node` 実行
- 注意: 長い出力は抜粋です。空出力だったケースはそのまま明記しています。

## 実行環境

### `bun --version`

```powershell
bun --version
```

```text
1.3.11
```

### `node --version`

```powershell
node --version
```

```text
v24.12.0
```

### グローバル `grok` のリンク先確認

```powershell
Get-Item C:\Users\Aslan\.bun\install\global\node_modules\grok-dev | Format-List *
```

```text
Name      : grok-dev
LinkType  : Junction
Target    : {D:\Prj\grok-sandbox\grok-cli}
FullName  : C:\Users\Aslan\.bun\install\global\node_modules\grok-dev
```

### `grok --version`

```powershell
grok --version
```

```text
1.0.0-rc5
```

## セットアップとローカル検証

### リポジトリ取得

```powershell
git clone https://github.com/Sunwood-ai-labs/grok-cli.git
```

```text
実行済み。作業コピーは D:\Prj\grok-sandbox\grok-cli に配置。
```

### 依存関係インストール

```powershell
bun install
```

```text
実行済み。依存解決に成功。
```

### ビルド

```powershell
bun run build
```

```text
$ tsc
```

### 型チェック

```powershell
bun run typecheck
```

```text
$ tsc --noEmit
```

### ユニットテスト

```powershell
bunx vitest run src/grok/client.test.ts
```

```text
RUN  v4.1.0 D:/Prj/grok-sandbox/grok-cli
Test Files  1 passed (1)
Tests      11 passed (11)
Duration   1.10s
```

## CLI 表面確認

### `grok --help`

```powershell
grok --help
```

```text
Usage: grok [options] [command] [message...]
AI coding agent powered by Grok — built with Bun and OpenTUI

Options:
  -V, --version
  -k, --api-key <key>
  -u, --base-url <url>
  -m, --model <model>
  -d, --directory <dir>
  -p, --prompt <prompt>
  --format <format>
  -s, --session <id>
  --background-task-file <path>
  --max-tool-rounds <n>

Commands:
  models
```

### `grok models`

```powershell
grok models
```

```text
Available Grok Models:
- grok-4.20-multi-agent-0309
- grok-4.20-0309-reasoning
- grok-4.20-0309-non-reasoning
- grok-4-1-fast-reasoning
- grok-4-1-fast-non-reasoning
- grok-4-fast-reasoning
- grok-4-fast-non-reasoning
- grok-4-0709
- grok-code-fast-1
- grok-3
- grok-3-mini
```

### `node dist/index.js --version`

```powershell
node dist/index.js --version
```

```text
TypeError [ERR_IMPORT_ATTRIBUTE_MISSING]: Module "file:///D:/Prj/grok-sandbox/grok-cli/package.json" needs an import attribute of "type: json"
Node.js v24.12.0
```

補足: この環境では `node dist/index.js` より `grok` または `bun run dist/index.js` のほうが安定しています。

## Headless 実行

### 単発レスポンス

```powershell
grok -p "Reply with only pong." --format json
```

```json
{"type":"step_start","stepNumber":0,"sessionID":"924cfa484573"}
{"type":"text","stepNumber":0,"text":"pong.","sessionID":"924cfa484573"}
{"type":"step_finish","stepNumber":0,"finishReason":"stop","sessionID":"924cfa484573"}
```

### セッション保存

```powershell
grok -p "Remember this code word exactly: NEBULA-47." --format json
```

```json
{"type":"step_start","stepNumber":0,"sessionID":"559ba11303a3"}
{"type":"text","stepNumber":0,"text":"Code word remembered: NEBULA-47.","sessionID":"559ba11303a3"}
{"type":"step_finish","stepNumber":0,"finishReason":"stop","sessionID":"559ba11303a3"}
```

### `--session latest` による引き継ぎ

```powershell
grok -s latest -p "What code word did I just ask you to remember? Reply with only the code word." --format json
```

```json
{"type":"step_start","stepNumber":0,"sessionID":"559ba11303a3"}
{"type":"text","stepNumber":0,"text":"NEBULA-47","sessionID":"559ba11303a3"}
{"type":"step_finish","stepNumber":0,"finishReason":"stop","sessionID":"559ba11303a3"}
```

## ツール呼び出し

### `search_web`

```powershell
grok -d D:\Prj\grok-sandbox\grok-cli -p "Use the search_web tool to find one current xAI-related web result and answer with its title and URL only." --format json
```

```json
{"type":"tool_use","toolCall":{"function":{"name":"search_web","arguments":"{\"query\":\"xAI latest news\"}"}}}
{"type":"text","stepNumber":1,"text":"xAI faces lawsuits over AI-generated images of minors: https://www.bbc.com/news/articles/cgk2lzmm22eo"}
```

### `task` サブエージェント

```powershell
grok -d D:\Prj\grok-sandbox\grok-cli -p "Use the task tool with the explore agent to inspect README.md and summarize the three strongest selling points of this project in three bullets." --format json
```

```json
{"type":"tool_use","toolCall":{"function":{"name":"task","arguments":"{\"agent\":\"explore\",\"description\":\"Inspect README.md for project selling points\",\"prompt\":\"Read the README.md file in the current directory and identify the three strongest selling points of the project. Summarize them in three bullet points.\"}"}}}
{"type":"text","stepNumber":1,"text":"- Grok-native power: Tuned for Grok models like grok-code-fast-1, full lineup, real-time X/web search, and media generation (images/videos).\n- Advanced agents: Sub-agents on by default for parallel tasks, custom sub-agents, skills, MCPs, and Telegram remote control from your phone.\n- Versatile & fast: Polished OpenTUI terminal UI, headless scripting (--prompt), session persistence, Bun-built for velocity."}
```

### `delegate` バックグラウンド実行

```powershell
grok -d D:\Prj\grok-sandbox\grok-cli -p "Use the delegate tool with the explore agent to do a background read-only scan of README.md, then tell me the delegation ID and nothing else." --format json
```

```text
標準出力は空。
```

```powershell
Get-Content C:\Users\Aslan\.grok\delegations\grok-cli-07d585a282\gentle-violet-heron.json -Raw
```

```json
{
  "id": "gentle-violet-heron",
  "agent": "explore",
  "status": "complete",
  "cwd": "D:\\Prj\\grok-sandbox\\grok-cli",
  "outputPath": "C:\\Users\\Aslan\\.grok\\delegations\\grok-cli-07d585a282\\gentle-violet-heron.md"
}
```

### `delegation_read`

```powershell
grok -d D:\Prj\grok-sandbox\grok-cli -p "Use the delegation_read tool for id calm-blue-badger and give me a one-sentence summary." --format json
```

```json
{"type":"tool_use","toolCall":{"function":{"name":"delegation_read","arguments":"{\"id\":\"calm-blue-badger\"}"}}}
{"type":"text","stepNumber":1,"text":"Grok CLI is an unofficial xAI-powered coding agent built with Bun/TypeScript, offering interactive and headless modes, Grok models, web/X search, media generation, sub-agents, Telegram remoting, and project-specific configurations via npm installation."}
```

### `search_x`

```powershell
grok -d D:\Prj\grok-sandbox\grok-cli -p "Use the search_x tool to find one recent xAI-related post and answer with the author handle plus a one-line summary." --format json
```

```json
{"type":"tool_use","toolCall":{"function":{"name":"search_x","arguments":"{\"query\":\"xAI\"}"}}}
{"type":"tool_use","toolCall":{"function":{"name":"search_x","arguments":"{\"query\":\"from:xai\"}"}}}
{"type":"text","stepNumber":2,"text":"@xai: Encourages exploring the universe and links to careers page."}
```

## 生成物で確認できた実行

### 画像生成

```powershell
grok -d D:\Prj\grok-sandbox\grok-cli -p "Use the generate_image tool to create a minimalist monochrome cat-face logo, save it with the default behavior, and then tell me the saved file path only." --format json
```

```text
この実行で生成されたファイルが残存:
D:\Prj\grok-sandbox\grok-cli\.grok\generated-media\image-2026-03-24T10-45-54-614Z.jpg
```

生成画像プレビュー:

![Generated monochrome cat logo](./assets/grok-generated-cat-logo.jpg)

### 動画生成

```powershell
grok -d D:\Prj\grok-sandbox -p "Use the generate_video tool to animate ./assets/grok-generated-cat-logo.jpg into a 3 second subtle cinematic push-in, save it with the default behavior, and reply with only the saved file path." --format json
```

```json
{"type":"tool_use","toolCall":{"function":{"name":"generate_video","arguments":"{\"prompt\":\"3 second subtle cinematic push-in\",\"source\":\"./assets/grok-generated-cat-logo.jpg\",\"duration\":3}"}}}
{"type":"text","stepNumber":1,"text":"D:\\Prj\\grok-sandbox\\grok-cli\\.grok\\generated-media\\video-2026-03-24T11-16-18-036Z.mp4"}
```

```powershell
Get-Item D:\Prj\grok-sandbox\grok-cli\.grok\generated-media\video-2026-03-24T11-16-18-036Z.mp4 | Format-List FullName,Length,LastWriteTime
```

```text
FullName      : D:\Prj\grok-sandbox\grok-cli\.grok\generated-media\video-2026-03-24T11-16-18-036Z.mp4
Length        : 190842
LastWriteTime : 2026/03/24 20:16:18
```

## Telegram 関連テスト

### 設定の有無確認

```powershell
$s = Get-Content C:\Users\Aslan\.grok\user-settings.json -Raw | ConvertFrom-Json; [pscustomobject]@{ hasTelegramBotToken = [bool]($s.telegram.botToken); approvedUserCount = @($s.telegram.approvedUserIds).Count } | ConvertTo-Json -Compress
```

```json
{"hasTelegramBotToken":false,"approvedUserCount":1}
```

補足: テスト時点では Telegram bot token は未設定でした。このため、実 bot を使った `/pair` からの完全な E2E は未実施です。

### Telegram bot token の設定

```powershell
$path = 'C:\Users\Aslan\.grok\user-settings.json'
# telegram.botToken を設定し、値は出力しない
```

```json
{"hasTelegramBotToken":true,"approvedUserCount":1,"defaultModel":"grok-code-fast-1"}
```

補足: token は `C:\Users\Aslan\.grok\user-settings.json` にのみ保存し、repo 配下には保存していません。`grok-cli` の作業ツリーも clean のままです。

### Telegram bot 情報の確認

```powershell
$token = (Get-Content C:\Users\Aslan\.grok\user-settings.json -Raw | ConvertFrom-Json).telegram.botToken
$uri = "https://api.telegram.org/bot$token/getMe"
$result = Invoke-RestMethod -Uri $uri -Method Get
[pscustomobject]@{ ok = $result.ok; id = $result.result.id; username = $result.result.username; first_name = $result.result.first_name } | ConvertTo-Json -Compress
```

```json
{"ok":true,"id":8729088953,"username":"test_wolf_001_bot","first_name":"test1"}
```

### `/remote-control` 相当の Telegram bridge 起動

```powershell
cmd /c start "" /B C:\Users\Aslan\.local\bin\bun.cmd D:\Prj\grok-sandbox\telegram-remote-bridge.mjs
```

```text
標準出力は空。
```

起動確認ログ:

```text
[2026-03-24T11:42:04.263Z] bot_ready username=@test_wolf_001_bot id=8729088953
[2026-03-24T11:42:04.263Z] approved_users=0
[2026-03-24T11:42:04.263Z] telegram_bridge_starting
[2026-03-24T11:42:04.266Z] telegram_bridge_started
```

補足:

- 補助ランナー: `D:\Prj\grok-sandbox\telegram-remote-bridge.mjs`
- ログ: `D:\Prj\grok-sandbox\telegram-remote-bridge.log`
- pairing code 入力監視ファイル: `D:\Prj\grok-sandbox\telegram-pair-code.txt`
- この時点では `approved_users=0` なので、実利用には Telegram 側で `/pair` を送って 6 文字コードを発行する必要があります。

プロセス生存確認:

```json
[{"ProcessId":21116,"Name":"cmd.exe"},{"ProcessId":40440,"Name":"bun.exe"}]
```

### pairing code の承認

```powershell
Set-Content -Path D:\Prj\grok-sandbox\telegram-pair-code.txt -Value '09FB08' -Encoding UTF8
```

承認確認ログ:

```text
[2026-03-24T11:44:20.649Z] pair_approved user=<redacted> code=09****
```

承認状態の確認:

```json
{"hasTelegramBotToken":true,"approvedUserCount":1}
```

補足: これで Telegram 側の `/pair` 承認は完了し、bridge は paired 状態に入りました。

### Telegram チャットの実送受信確認

保存セッションの確認コマンド:

```powershell
@'
import { buildChatEntries } from './dist/storage/index.js';
const entries = buildChatEntries('33f8c6785f63');
console.log(JSON.stringify(entries.slice(-6), null, 2));
'@ | bun -
```

```json
[
  {
    "type": "user",
    "content": "こんにちは"
  },
  {
    "type": "assistant",
    "content": "Hello! How can I assist you today? If you have a task, let me know."
  },
  {
    "type": "user",
    "content": "日本語で応答して！今日のご飯を教えて"
  },
  {
    "type": "assistant",
    "content": "今日はランダムに選んでみました！おすすめは「すしとラーメンのミックスボウル」— 新鮮な魚介と温かいスープが絶妙に合います。栄養バランスも良さそうですね。何か特定の好みありますか？"
  }
]
```

確認ポイント:

- Telegram からの user message は session `33f8c6785f63` に保存されました
- 応答も assistant message として保存されました
- 初回の `こんにちは` には英語で返答
- 日本語指定つきメッセージには日本語で返答

実際の Telegram ログ抜粋:

```text
こんにちは
Hello! How can I assist you today? If you have a task, let me know.
日本語で応答して！今日のご飯を教えて
今日はランダムに選んでみました！おすすめは「すしとラーメンのミックスボウル」— 新鮮な魚介と温かいスープが絶妙に合います。栄養バランスも良さそうですね。何か特定の好みありますか？
```

### Telegram 経由の `search_x` + ファイル生成/更新 実験

生成物の存在確認:

```json
{"FullName":"D:\\Prj\\grok-sandbox\\grok-cli\\openclaw_report.md","Length":5269}
```

実際の Telegram ログ抜粋:

```text
> maki:
いいね！Xの@openclawあアカウントで直近の10件くらいの内容をまとめてマークダウンファイルで日本語のレポートを作成して

> test1:
レポートを作成しました！ファイル名は `openclaw_report.md` です。内容は@openclawの直近10件程度の投稿を日本語でまとめています。必要に応じて編集できますよ。

> maki:
Xのツイートとかもちゃんと見てる？？

> test1:
はい、ちゃんと見ています！search_xツールを使って@openclawのアカウントから直近の投稿を検索し、最新の10件程度をまとめてレポートを作成しました。X（Twitter）のリアルタイムな情報を取得できるので、必要に応じてもっと調べられますよ。何か追加で知りたいことありますか？

> maki:
いいね！実際に参考にしたツイートのURLも記載して。また、内容ももっと詳細なレポートにして！

> test1:
了解しました！レポートを更新しました。ツイートのURLを各投稿に追加し、内容をより詳細にまとめました。`openclaw_report.md` を確認してみてください。追加の変更が必要ですか？
```

session 保存内容から確認できた実行:

- `search_x` を使って `@openclaw` の直近投稿を取得
- `write_file` で `openclaw_report.md` を新規作成
- その後 `read_file` + `edit_file` で URL 付きの詳細版へ更新
- Telegram からの follow-up 指示に対して、同じ session の中でファイル更新まで継続できた

補足: この実験で、Telegram remote control 経由でも `search_x` とファイル操作が実際に機能することを確認できました。

補足: `telegram-remote-bridge.log` を PowerShell で読むと日本語が文字化けして見える箇所がありましたが、保存 session では文字列が正しく保持されていました。つまり現時点では「ログ表示上の文字化け」で、会話データ自体は壊れていません。

### Telegram 関連ユニットテスト

```powershell
bunx vitest run src/telegram/limits.test.ts src/ui/telegram-turn-ui.test.ts
```

```text
Test Files  2 passed (2)
Tests      7 passed (7)
Duration   368ms
```

### pairing ストアの実行確認

```powershell
@'
import { clearPairingStore, registerPairingCode, approvePairingCode } from './dist/telegram/pairing.js';

clearPairingStore();
const code = registerPairingCode(424242);
console.log(JSON.stringify({
  code,
  approveOk: approvePairingCode(code),
  approveAgain: approvePairingCode(code),
}, null, 2));
'@ | bun -
```

```json
{
  "code": "D51209",
  "approveOk": {
    "ok": true,
    "userId": 424242
  },
  "approveAgain": {
    "ok": false,
    "error": "Unknown or expired code."
  }
}
```

### bridge 起動の失敗経路確認

```powershell
@'
import { createTelegramBridge } from './dist/telegram/bridge.js';

const events = [];
const bridge = createTelegramBridge({
  token: '123456:INVALID_TOKEN_FOR_LOCAL_TEST',
  getApprovedUserIds: () => [],
  coordinator: { run: async (fn) => await fn() },
  getTelegramAgent: () => { throw new Error('not used'); },
  onError: (message) => events.push(message),
});
bridge.start();
await new Promise((resolve) => setTimeout(resolve, 4000));
await bridge.stop().catch((err) => events.push(`stop:${err instanceof Error ? err.message : String(err)}`));
console.log(JSON.stringify({ bridgeErrors: events }, null, 2));
'@ | bun -
```

```json
{
  "bridgeErrors": [
    "Call to 'getMe' failed! (401: Unauthorized)"
  ]
}
```

補足: この経路で、Telegram bridge が invalid token を握ったときの起動失敗は確認できました。成功系の pairing と DM 応答までは、実 bot token と Telegram 側の手動操作が必要です。

## 関連アーティファクト

- 画像生成結果: `D:\Prj\grok-sandbox\grok-cli\.grok\generated-media\image-2026-03-24T10-45-54-614Z.jpg`
- README 用コピー: `D:\Prj\grok-sandbox\assets\grok-generated-cat-logo.jpg`
- 動画生成結果: `D:\Prj\grok-sandbox\grok-cli\.grok\generated-media\video-2026-03-24T11-16-18-036Z.mp4`
- Delegation 出力: `C:\Users\Aslan\.grok\delegations\grok-cli-07d585a282\calm-blue-badger.md`
- Delegation メタ情報: `C:\Users\Aslan\.grok\delegations\grok-cli-07d585a282\calm-blue-badger.json`
- 追加 delegation メタ情報: `C:\Users\Aslan\.grok\delegations\grok-cli-07d585a282\gentle-violet-heron.json`

## メモ

- `grok` グローバルコマンドは `grok-dev` として Bun global にリンクされており、実体は `D:\Prj\grok-sandbox\grok-cli` です。
- `node dist/index.js` はこの Node 24 環境で `ERR_IMPORT_ATTRIBUTE_MISSING` により失敗しました。
- `delegate` は headless JSON 出力が空でも、バックグラウンド成果物自体は作成されるケースがありました。
- Telegram remote control は TUI 主導の機能です。実 bot token 不在のため、今回は helper ロジック、関連テスト、invalid token の bridge 失敗経路まで確認しました。

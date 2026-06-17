# MEMORY — ループの記憶（背骨）

> エージェントは毎周このファイルを読み、末尾に追記します。会話履歴ではなく**このファイルが記憶**です。
> 人間が消さない限り、run 47 でも run 1〜46 の試行を踏まえて動けます。

## Done（達成済み）

- [run 1] useCounter.ts に min/max クランプ、関数型 setState、reset は initial（クランプ後）へ復帰、
  set/increment/decrement もクランプを実装。useCounter.test.ts 全 9 green。typecheck/lint clean。
- [run 2] TodoList.tsx を実装（追加/Enter追加/空白無視/入力クリア/チェックボックスでトグル/
  「削除: <text>」ボタンで削除/未完了カウント）。TodoList.test.tsx 全 7 green。typecheck/lint clean。
  この時点で全体 16 passed / 8 failed（残りは formatPrice 2 ファイルのみ）。

## Open（未解決 / 次周への申し送り）

- [run 0 / setup] 開始状態: `typecheck` と `lint` は green、`test` は 18 failed / 6 passed（全 24）。
  実装対象は `useCounter.ts` / `formatPrice.ts` / `TodoList.tsx` の 3 ユニット。
  `formatPrice` の仕様は `formatPrice.test.ts` と `formatPrice.legacy.test.ts` の両方。

## Notes（学び / 落とし穴）

- VERIFY は `npm run verify`（typecheck → lint → test の順）。`noUnusedLocals/Parameters` が厳しめ。
- `formatPrice` の通貨記号は full ICU 依存（JPY は全角 `￥`）。テストの期待値が唯一の正。

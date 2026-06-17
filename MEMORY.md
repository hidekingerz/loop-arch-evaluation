# MEMORY — ループの記憶（背骨）

> エージェントは毎周このファイルを読み、末尾に追記します。会話履歴ではなく**このファイルが記憶**です。
> 人間が消さない限り、run 47 でも run 1〜46 の試行を踏まえて動けます。

## Done（達成済み）

- [run 1] useCounter.ts に min/max クランプ・initial クランプ・reset を initial へ・set/inc/dec を関数型更新でクランプ実装。useCounter.test.ts 全 9 green。全体 11 passed / 15 failed。

## Open（未解決 / 次周への申し送り）

- [run 0 / setup] 開始状態: `typecheck` と `lint` は green、`test` は 20 failed / 6 passed（全 26）。
  実装対象は `useCounter.ts` / `formatPrice.ts` / `TodoList.tsx` / `components/Cart.tsx` の 4 ユニット。
  `Cart.tsx` は `useCounter` と `formatPrice` を内部利用するため、依存先が正しくないと green にできない。

## Notes（学び / 落とし穴）

- VERIFY は `npm run verify`（typecheck → lint → test の順）。`noUnusedLocals/Parameters` が厳しめ。
- `formatPrice` の通貨記号は full ICU 依存（JPY は全角 `￥`）。テストの期待値が唯一の正。

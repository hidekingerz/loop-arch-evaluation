# MEMORY — ループの記憶（背骨）

> エージェントは毎周このファイルを読み、末尾に追記します。会話履歴ではなく**このファイルが記憶**です。
> 人間が消さない限り、run 47 でも run 1〜46 の試行を踏まえて動けます。

## Done（達成済み）

- [run 1] `useCounter.ts` に clamp(min/max)・reset→initial・set クランプを実装。
  `useCounter.test.ts` 9/9 green。全体 16→11 failed（回帰なし）。

## Open（未解決 / 次周への申し送り）

- [run 0 / setup] 開始状態: `typecheck` と `lint` は green、`test` は 16 failed / 6 passed（全 22）。
  実装対象は `useCounter.ts` / `formatPrice.ts` / `TodoList.tsx` の 3 ユニット。
- [run 1] 残り: `formatPrice.ts`（Intl 通貨化・非有限値で TypeError）, `TodoList.tsx`（DOM/a11y 配線）。

## Notes（学び / 落とし穴）

- VERIFY は `npm run verify`（typecheck → lint → test の順）。`noUnusedLocals/Parameters` が厳しめ。
- `formatPrice` の通貨記号は full ICU 依存（JPY は全角 `￥`）。テストの期待値が唯一の正。

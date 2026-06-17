# MEMORY — ループの記憶（背骨）

> エージェントは毎周このファイルを読み、末尾に追記します。会話履歴ではなく**このファイルが記憶**です。
> 人間が消さない限り、run 47 でも run 1〜46 の試行を踏まえて動けます。

## Done（達成済み）

- [run 1] useCounter.ts に min/max クランプ・initial クランプ・reset を initial へ・set/inc/dec を関数型更新でクランプ実装。useCounter.test.ts 全 9 green。全体 11 passed / 15 failed。
- [run 2] formatPrice.ts を Intl.NumberFormat(style:currency) で実装。非有限値は TypeError。default locale ja-JP で JPY は全角 ￥。formatPrice.test.ts 全 6 green。全体 18 passed / 8 failed。
- [run 3] TodoList.tsx に追加(ボタン/Enter)・空白trim無視・追加後input clear・checkbox トグルで未完了カウンタ更新・削除ボタン(名前 "削除: {text}") を実装。checkbox の a11y 名は囲む label のテキスト。TodoList.test.tsx 全 7 green。全体 23 passed / 3 failed (残り Cart)。
- [run 4] Cart.tsx に 増やす/減らす ボタン(useCounter min:0 で 0 クランプ)と role="status" の "合計: formatPrice(quantity*unitPrice)" を実装。依存先(useCounter/formatPrice)が正しいため green 可能に。Cart.test.tsx 全 4 green。npm run verify 全項目 green、26/26 pass。完了。

## Open（未解決 / 次周への申し送り）

- （なし）全 4 ユニット完了。`npm run verify` 全項目 green、26/26 pass。
- [run 0 / setup] 開始状態: `typecheck` と `lint` は green、`test` は 20 failed / 6 passed（全 26）。
  実装対象は `useCounter.ts` / `formatPrice.ts` / `TodoList.tsx` / `components/Cart.tsx` の 4 ユニット。
  `Cart.tsx` は `useCounter` と `formatPrice` を内部利用するため、依存先が正しくないと green にできない。（解決済み）

## Notes（学び / 落とし穴）

- VERIFY は `npm run verify`（typecheck → lint → test の順）。`noUnusedLocals/Parameters` が厳しめ。
- `formatPrice` の通貨記号は full ICU 依存（JPY は全角 `￥`）。テストの期待値が唯一の正。

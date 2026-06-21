# MEMORY — ループの記憶（背骨）

> エージェントは毎周このファイルを読み、末尾に追記します。会話履歴ではなく**このファイルが記憶**です。
> 人間が消さない限り、run 47 でも run 1〜46 の試行を踏まえて動けます。

## Done（達成済み）

- [run 1] calculateTotals.ts を実装（純粋関数）。export: `calculateTotals(items: LineItem[], coupon?: Coupon | null): Totals`、型 `LineItem`/`Coupon`/`Totals`。percent は floor、discount は [0, subtotal] にクランプ。calculateTotals.test.ts 7/7 緑、lint clean。残り useCart / CartView 未作成のため全体 typecheck はまだ失敗。
- [run 2] useCart.ts を実装（フック）。export: `useCart(initialItems): { items, totals, coupon, setQty(id,qty), removeItem(id), applyCoupon(coupon) }`。初期化時に seed を `.map(spread)` でコピーして不変更新（seed 非破壊）。qty<=0 で除去。totals は useMemo で calculateTotals。useCart 6/6 + calculateTotals 7/7 = 13 緑、lint clean。残り CartView 未作成。

## Open（未解決 / 次周への申し送り）

- [run 0 / setup] 開始状態: 実装ファイルは未作成。`typecheck` が「Cannot find module」で失敗、
  `test` 17 件はモジュール未解決で走らない。受け入れテストだけが置かれている。
  作る層（依存の順）: `calculateTotals.ts`（純粋・7）→ `useCart.ts`（フック・6）→
  `CartView.tsx`（コンポーネント・4）。

## Notes（学び / 落とし穴）

- 公開 API はテストの import と使い方が唯一の仕様。土台（calculateTotals）から積む。
- React state は不変更新。`useCart` は seed 配列を mutate しないこと（テストが検査）。
- 合計の表示はプレーン数値（例: `合計: 700`）。

# MEMORY — ループの記憶（背骨）

> エージェントは毎周このファイルを読み、末尾に追記します。会話履歴ではなく**このファイルが記憶**です。
> 人間が消さない限り、run 47 でも run 1〜46 の試行を踏まえて動けます。

## Done（達成済み）

<!-- 各周、成功したらここに「どのユニットをどう実装したか」を追記する -->

- [run 1] `sumPrices` 実装完了。`src/lib/checkout/sumPrices.ts` に `type PricedItem = { price: number; qty: number }`
  と `sumPrices(items: PricedItem[]): number` を作成。`items.reduce((t, i) => t + i.price * i.qty, 0)` で一般化。
  sumPrices.test.ts の 2 テスト pass、lint 0。typecheck/test の残エラーは未実装の `calcTax` / `formatYen` のみ（スコープ外・回帰なし）。

## Open（未解決 / 次周への申し送り）

- [run 0 / setup] 開始状態: 実装は未作成。`typecheck` が「Cannot find module」で失敗、
  10 テストは走らない。1 周 1 ユニットで `sumPrices` / `calcTax` / `formatYen` を実装する。
  **毎周フレッシュな文脈で起動される。失敗したアプローチは必ずここに残し、次周は繰り返さないこと。**
- [run 1 申し送り] 残ユニット: `calcTax`（整数円・丸め）と `formatYen`（半角 `¥` ＋桁区切り、例 `¥1,234`）。
  次周はどちらか 1 ユニットを実装すること。`sumPrices` は完了済みなので触らない。

## Notes（学び / 落とし穴）

- 公開 API はテストの import/使い方が唯一の仕様。
- `calcTax(subtotal, rate)` は**整数円**を返す（テストが `Number.isInteger` と丸めを検査）。

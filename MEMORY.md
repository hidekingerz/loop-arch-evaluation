# MEMORY — ループの記憶（背骨）

> エージェントは毎周このファイルを読み、末尾に追記します。会話履歴ではなく**このファイルが記憶**です。
> 人間が消さない限り、run 47 でも run 1〜46 の試行を踏まえて動けます。

## Done（達成済み）

- [run 1] `sumPrices` 実装完了（`reduce` で price*qty 合計）。sumPrices.test.ts 2/2 緑。
- [run 3] `calcTax` 実装完了（`Math.round(subtotal * rate)` で整数円に丸め）。calcTax.test.ts 5/5 緑。
  run 2 の dead-end（素朴な掛け算 → 非整数で 3 テスト失敗）を申し送り通り回避。
  回帰なし（sumPrices 2/2 も緑、計 7 pass）。

## Open（未解決 / 次周への申し送り）

- [未着手] `formatYen` のみ残存。`src/lib/checkout/formatYen.ts` が未作成のため
  formatYen.test.ts が import 解決に失敗（`npm run verify` / typecheck もここで赤）。
  **次の周: `formatYen(n)` を実装する。** 仕様: 半角 `¥` ＋桁区切りで `"¥1,234"`（例: `formatYen(1234)` → `"¥1,234"`、`formatYen(0)` → `"¥0"`）。
  実装案: `` `¥${n.toLocaleString("en-US")}` `` もしくは手動の3桁区切り。formatYen.test.ts を読んで負数/0 の扱いを確認すること。

## Notes（学び / 落とし穴）

- 公開 API はテストの import/使い方が唯一の仕様。

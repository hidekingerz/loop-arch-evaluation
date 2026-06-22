# MEMORY — ループの記憶（背骨）

> エージェントは毎周このファイルを読み、末尾に追記します。会話履歴ではなく**このファイルが記憶**です。
> 人間が消さない限り、run 47 でも run 1〜46 の試行を踏まえて動けます。

## Done（達成済み）

- [run 1] `sumPrices` 実装完了（`reduce` で price*qty 合計）。sumPrices.test.ts 2/2 緑。
- [run 3] `calcTax` 実装完了。seeded dead-end（`subtotal * rate` の生掛け算 → 100.4/101.2 で非整数）を解消。`Math.round(subtotal * rate)` で整数円に丸め。calcTax.test.ts 5/5 緑（0, 1000*0.1=100, 1255*0.08→100, 1265*0.08→101, Number.isInteger）。回帰なし。

## Open（未解決 / 次周への申し送り）

- [run 3 申し送り] `formatYen` が未着手（`formatYen.ts` 未作成のため typecheck と全体 test が赤い）。次の周でこれを実装すれば DoD 完了見込み。仕様: `formatYen(0)="¥0"` / `formatYen(1234)="¥1,234"` / `formatYen(1234567)="¥1,234,567"`。半角 `¥` ＋ 3桁区切り。`n.toLocaleString("en-US")` で区切りを付け、先頭に `¥` を付与する方針が素直（依存追加不要）。`calcTax` は run 3 で完了済みなので触らない。

## Notes（学び / 落とし穴）

- 公開 API はテストの import/使い方が唯一の仕様。

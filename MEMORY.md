# MEMORY — ループの記憶（背骨）

> エージェントは毎周このファイルを読み、末尾に追記します。会話履歴ではなく**このファイルが記憶**です。
> 人間が消さない限り、run 47 でも run 1〜46 の試行を踏まえて動けます。

## Done（達成済み）

- [run 1] `sumPrices` 実装完了（`reduce` で price*qty 合計）。sumPrices.test.ts 2/2 緑。

## Open（未解決 / 次周への申し送り）

- [run 2 / dead-end] `calcTax` を `return subtotal * rate;`（素朴な掛け算）で実装したが **失敗**。
  原因: `calcTax(1255, 0.08)=100.4`、`calcTax(1265, 0.08)=101.2` が**整数でない**ため
  `toBe(100)` / `toBe(101)` と `Number.isInteger` 検査に落ちる（3 テスト失敗）。
  **次の周: `Math.round(subtotal * rate)` で整数円に丸める。素朴な掛け算だけを再度試さないこと。**
  （`sumPrices` は完了済み。`formatYen` は未着手。）

## Notes（学び / 落とし穴）

- 公開 API はテストの import/使い方が唯一の仕様。

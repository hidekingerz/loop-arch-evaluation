# VISION — このループのゴール

> 検証テーマ: **長期収束・バックトラック（フレッシュ文脈 × MEMORY 背骨の検証）**
> エージェントは毎周これを読み、「完了の定義」を満たしたかどうかで停止を判断します。

## ゴール（1〜2文で）

`src/lib/checkout/` の未実装ユニット（`sumPrices` / `calcTax` / `formatYen`）を 1 周 1 ユニットで実装し、
全テストを green にする。**このループは毎周まっさらな文脈で起動され、過去の周の記憶は
`MEMORY.md`（とリポジトリの状態）にしか無い。**

## 完了の定義（Definition of Done）

- [ ] `npm run typecheck` / `npm run lint` がエラー 0
- [ ] `npm run test` が **全 10 テスト pass**
- [ ] `npm run verify` が成功する
- [ ] テストファイルを一切変更していない

## 対象ユニット（1周＝1ユニット）

- `src/lib/checkout/sumPrices.ts` … `PricedItem[]` の `price*qty` 合計。
- `src/lib/checkout/calcTax.ts` … `calcTax(subtotal, rate)`。**整数円**で返す。
- `src/lib/checkout/formatYen.ts` … `formatYen(n)` → `"¥1,234"`（桁区切り）。

## スコープ外

- テストの変更・スキップ、対症療法、依存/設定変更、`templates/single-agent-loop/` の変更。

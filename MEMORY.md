# MEMORY — ループの記憶（背骨）

> エージェントは毎周このファイルを読み、末尾に追記します。会話履歴ではなく**このファイルが記憶**です。
> 人間が消さない限り、run 47 でも run 1〜46 の試行を踏まえて動けます。

## Done（達成済み）

- [run 1] 2ファイル分解で ProductList を実装し、全 10 テスト green。
  - `productFilters.ts`: 純粋関数 `searchByName` / `filterInStock` / `sortProducts` /
    合成 `selectProducts` と `SortKey` 型。React 非依存・入力非破壊（`slice()` でコピー）。
  - `ProductList.tsx`: `Product` 型・`ProductList` コンポーネント（state: query/inStockOnly/sort、
    `useMemo` で `selectProducts` を呼び UI 配線）。
  - VERIFY: typecheck/lint クリーン、10/10 pass。停止条件達成 → LOOP_DONE。

## 設計方針（このループで採用する分解）

- 純粋ロジック（フィルタ/ソート）を `productFilters.ts` に抽出し、UI 配線を `ProductList.tsx` に分離。
  理由: ロジックを React から切り離すと一般化（テストに無い入力でも正しい）と非破壊性を担保しやすく、
  レビュー単位も明確。パイプラインは 在庫フィルタ → 名前検索 → ソート の合成。
- `Product` 型は `ProductList.tsx` に置き、テストの `import { ProductList, type Product } from "./ProductList"`
  を満たす。`productFilters.ts` は型のみを逆 import（循環なし）。

## Open（未解決 / 次周への申し送り）

- [run 0 / setup] 開始状態: 実装は未作成。`typecheck` が「Cannot find module './ProductList'」で失敗、
  10 テストは走らない。受け入れテスト `ProductList.test.tsx` だけが置かれている。
  **分解・ファイル構成・内部設計は指示されていない。自分で決める。**

## Notes（学び / 落とし穴）

- 公開 API はテストの import/使い方が唯一の仕様。内部設計は自由。
- フィルタ（検索＋在庫）→ ソート の合成。ソートは検索変更後も維持される（テストが検査）。
- 件数は `role="status"` に「N件」、0 件時は「該当する商品はありません」。

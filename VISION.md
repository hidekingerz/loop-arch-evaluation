# VISION — このループのゴール

> 検証テーマ: **新機能追加（仕様からの複数ファイル機能ビルド）**
> エージェントは毎周これを読み、「完了の定義」を満たしたかどうかで停止を判断します。

## ゴール（1〜2文で）

`src/feature/cart/` に **受け入れテスト（仕様）だけが置かれ、実装ファイルは存在しない**。
テストが定義する公開 API に従って、**クーポン付きカート機能をゼロから複数ファイルで実装**し、
全テストを green にする。テストファイルは変更しない。

## 機能の概要

ECのカート。商品の数量変更・クーポン適用に応じて小計/割引/合計を計算して表示する。
テストから読み取れる自然な分解（ボトムアップ）:

- `src/feature/cart/calculateTotals.ts` … 純粋関数。`LineItem[]` と `Coupon` から
  `{ subtotal, discount, total }` を計算（percent / fixed クーポン、合計は負にならない）。
- `src/feature/cart/useCart.ts` … フック。`items` / `totals` / `coupon` と
  `setQty` / `removeItem` / `applyCoupon` を提供（内部で `calculateTotals` を使う）。
- `src/feature/cart/CartView.tsx` … コンポーネント。`useCart` を結線し、各商品の数量・増減ボタン・
  クーポンボタン・合計を表示する。

> 公開 API（export 名・引数・戻り値の形）は **テストの import と使い方が唯一の仕様**。
> 内部構造は自分で設計してよい。依存先（util → hook → component）の順に積み上げるのが自然。

## 完了の定義（Definition of Done）

- [ ] `npm run typecheck`（`tsc --noEmit`）がエラー 0
- [ ] `npm run lint`（`eslint .`）がエラー・警告 0
- [ ] `npm run test`（`vitest run`）が **全 17 テスト pass**
- [ ] `npm run verify` が成功する
- [ ] テストファイル（`src/**/*.test.ts(x)`）を一切変更していない

## スコープ外（やらないこと）

- テストの変更・スキップ、テスト入力に合わせたハードコード（実ロジックで満たす）。
- 依存パッケージの追加・更新、ビルド設定の変更、`templates/single-agent-loop/` の変更。

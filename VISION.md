# VISION — このループのゴール

> 検証テーマ: **TDD グリーン化（フロントエンドコードへの single-agent closed loop 適用検証）**
> エージェントは毎周これを読み、「完了の定義」を満たしたかどうかで停止を判断します。

## ゴール（1〜2文で）

`src/` 配下の **わざと未実装/不完全にしてあるフロントエンド実装**（React フック・ユーティリティ・
コンポーネント）を、**仕様を定義する失敗テスト群（`*.test.ts(x)`）がすべて green になるまで** 実装する。
テストファイルは仕様なので変更しない。

## 完了の定義（Definition of Done） — 検証可能な箇条書きで

- [ ] `npm run typecheck`（`tsc --noEmit`）がエラー 0 で通る
- [ ] `npm run lint`（`eslint .`）がエラー・警告 0 で通る
- [ ] `npm run test`（`vitest run`）が **全 24 テスト pass**
- [ ] 上記をまとめた `npm run verify` が成功する
- [ ] テストファイル（`src/**/*.test.ts`, `src/**/*.test.tsx`）を一切変更していない

## 対象ユニット（1周＝1ユニットが目安）

- `src/lib/useCounter.ts` … 状態ロジック（increment/decrement/reset/set、min/max クランプ）
- `src/lib/formatPrice.ts` … 純粋関数 / 型 / `Intl`（JPY・USD、非有限値で `TypeError`）
  - 仕様は `formatPrice.test.ts` と `formatPrice.legacy.test.ts` の両方（どちらも変更禁止）
- `src/components/TodoList.tsx` … DOM 操作 / a11y（追加・Enter追加・空入力無視・トグル・削除・未完了カウント）

## スコープ外（やらないこと）

- テストファイルの変更・削除・スキップ（`it.skip` / `describe.skip` 含む）
- 依存パッケージの追加・更新、ビルド設定（tsconfig / eslint / vitest config）の変更
- `templates/single-agent-loop/`（雛形のオリジナル）の変更

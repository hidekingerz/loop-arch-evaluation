# ARCHITECTURE — 技術スタックとフォルダ構成

> エージェントが DISCOVER を高速化するためのプロジェクト知識です（毎周ゼロから推測させないため）。

## スタック

- 言語 / ランタイム: TypeScript 5 / Node.js 22（ESM, `"type": "module"`）
- UI: React 18（`jsx: react-jsx` — `import React` は不要）
- テスト: Vitest 2 + jsdom + @testing-library/react + jest-dom
- Lint: ESLint 9（flat config）+ typescript-eslint。**構造ルール（complexity / max-depth /
  max-lines-per-function / max-nested-callbacks / max-params）が `src/` の非テストファイルに対して有効**。
- 型: `tsc --noEmit`（strict）
- パッケージマネージャ: npm

## 主要ディレクトリ

```
src/
  lib/
    validateRegistration.ts        登録フォームのバリデータ（リファクタ対象・動作中）
    validateRegistration.test.ts   仕様 / 回帰ネット（変更禁止）
  components/
    StatusBadgeList.tsx            ステータスバッジ一覧（リファクタ対象・動作中）
    StatusBadgeList.test.tsx       仕様 / 回帰ネット（変更禁止）
  setupTests.ts                    jest-dom の読み込み
templates/single-agent-loop/       雛形のオリジナル（変更禁止）
```

## 重要な慣習

- リファクタ対象には `NOTE(loop/refactor):` コメントで「動作はするが汚い」旨を明記。
- 新しいヘルパ関数/定数/小コンポーネントを**追加**して整理してよい（公開 API の外形は保つ）。
- テストは `data-testid` やテキストでレンダリング結果を検査する。これらは振る舞いの一部。

## ビルド / 実行コマンド

- インストール: `npm install`（CI 済み・通常は不要）
- 型チェック: `npm run typecheck`
- Lint: `npm run lint`
- テスト: `npm run test`
- 一括（VERIFY ゲート）: `npm run verify`

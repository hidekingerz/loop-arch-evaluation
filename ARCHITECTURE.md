# ARCHITECTURE — 技術スタックと最小限の構成

> エージェントが DISCOVER を高速化するためのプロジェクト知識です。

## スタック

- 言語 / ランタイム: TypeScript 5 / Node.js 22（ESM）
- UI: React 18（`jsx: react-jsx` — `import React` は不要）
- テスト: Vitest 2 + jsdom + @testing-library/react + @testing-library/user-event + jest-dom
- Lint: ESLint 9（flat config）+ typescript-eslint / 型: `tsc --noEmit`（strict, 未使用変数に厳しい）
- パッケージマネージャ: npm

## 構成（最小限）

```
src/
  feature/products/
    ProductList.test.tsx   仕様（変更禁止）— `./ProductList` から ProductList と型 Product を import
    （ProductList.tsx などの実装は未作成。必要なファイルは自分で作る）
  setupTests.ts
templates/single-agent-loop/  雛形のオリジナル（変更禁止）
```

> テストが import するのは `./ProductList`（`ProductList` コンポーネントと `Product` 型）だけ。
> それ以外のファイル構成・ヘルパの有無は**自由に設計してよい**（このループは分解を指示しない）。

## 重要な慣習

- React state は不変更新。未使用の変数・引数は型/Lint エラー（使わない引数は `_` 始まり）。
- ロジックは一般化して書く（テストに無い入力でも正しく）。

## ビルド / 実行コマンド

- 型チェック: `npm run typecheck` / Lint: `npm run lint` / テスト: `npm run test`
- 一括（VERIFY ゲート）: `npm run verify`

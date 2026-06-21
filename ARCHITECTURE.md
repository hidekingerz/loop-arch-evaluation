# ARCHITECTURE — 技術スタックとフォルダ構成

> エージェントが DISCOVER を高速化するためのプロジェクト知識です。

## スタック

- 言語 / ランタイム: TypeScript 5 / Node.js 22（ESM）
- UI: React 18（`jsx: react-jsx` — `import React` は不要）
- テスト: Vitest 2 + jsdom + @testing-library/react + @testing-library/user-event + jest-dom
- Lint: ESLint 9（flat config）+ typescript-eslint / 型: `tsc --noEmit`（strict, 未使用変数に厳しい）
- パッケージマネージャ: npm

## 主要ディレクトリ

```
src/
  feature/cart/
    calculateTotals.test.ts   仕様（変更禁止）— 実装 calculateTotals.ts を要求
    useCart.test.ts           仕様（変更禁止）— 実装 useCart.ts を要求
    CartView.test.tsx         仕様（変更禁止）— 実装 CartView.tsx を要求
    （calculateTotals.ts / useCart.ts / CartView.tsx は未作成。これらを作る）
  setupTests.ts
templates/single-agent-loop/  雛形のオリジナル（変更禁止）
```

## 重要な慣習

- 実装ファイルは存在しない。テストの import 先（`./calculateTotals` 等）を新規作成する。
- 依存の順（util → hook → component）に積む。土台が無いと上位のテストは緑にできない。
- React state は不変更新。未使用の変数・引数は型/Lint エラー（使わない引数は `_` 始まり）。

## ビルド / 実行コマンド

- 型チェック: `npm run typecheck` / Lint: `npm run lint` / テスト: `npm run test`
- 一括（VERIFY ゲート）: `npm run verify`

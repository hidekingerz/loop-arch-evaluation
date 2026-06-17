# ARCHITECTURE — 技術スタックとフォルダ構成

> エージェントが DISCOVER を高速化するためのプロジェクト知識です（毎周ゼロから推測させないため）。

## スタック

- 言語 / ランタイム: TypeScript 5 / Node.js 22（ESM, `"type": "module"`）
- UI: React 18（`jsx: react-jsx` — `import React` は不要）
- テスト: Vitest 2 + jsdom + @testing-library/react + @testing-library/user-event + jest-dom
- Lint: ESLint 9（flat config）+ typescript-eslint
- 型: `tsc --noEmit`（strict, `noUnusedLocals` / `noUnusedParameters` 有効）
- パッケージマネージャ: npm

## 主要ディレクトリ

```
src/
  lib/
    useCounter.ts        状態ロジックのフック（実装対象）
    useCounter.test.ts   仕様（変更禁止）
    formatPrice.ts       通貨フォーマットの純粋関数（実装対象）
    formatPrice.test.ts  仕様（変更禁止）
  components/
    TodoList.tsx         a11y 付き Todo コンポーネント（実装対象）
    TodoList.test.tsx    仕様（変更禁止）
  setupTests.ts          jest-dom の読み込み
templates/single-agent-loop/   雛形のオリジナル（変更禁止）
```

## 重要な慣習

- 実装対象ファイルには `// TODO(loop):` で何が未実装かを書いてある。
- テストは対象ファイルと同階層に `*.test.ts(x)` で配置。テストが唯一の仕様。
- 副作用なし。`Intl.NumberFormat` 等の Web 標準 API を利用してよい。
- 未使用のローカル変数・引数は型/Lint エラーになる（使わない引数は `_` 始まり）。

## ビルド / 実行コマンド

- インストール: `npm install`（CI 済み・通常は不要）
- 型チェック: `npm run typecheck`
- Lint: `npm run lint`
- テスト: `npm run test`
- 一括（VERIFY ゲート）: `npm run verify`

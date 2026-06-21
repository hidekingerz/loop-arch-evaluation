# ARCHITECTURE — 技術スタックとフォルダ構成

> エージェントが DISCOVER を高速化するためのプロジェクト知識です（毎周ゼロから推測させないため）。

## スタック

- 言語 / ランタイム: TypeScript 5 / Node.js 22（ESM, `"type": "module"`）
- UI: React 18（`jsx: react-jsx` — `import React` は不要）
- テスト: Vitest 2 + jsdom + @testing-library/react + @testing-library/user-event + jest-dom
- Lint: ESLint 9（flat config）+ typescript-eslint
- 型: `tsc --noEmit`（strict）
- パッケージマネージャ: npm

## 主要ディレクトリ

```
src/
  components/
    StepCounter.tsx       カウンタ（バグあり・進めると 1 しか増えない）
    StepCounter.test.tsx  再現テスト＋既存テスト（変更禁止）
    TaskToggle.tsx        タスク一覧（バグあり・チェックしても更新されない）
    TaskToggle.test.tsx   再現テスト＋既存テスト（変更禁止）
  lib/
    useFilteredList.ts      絞り込みフック（バグあり・クエリ変更が効かない）
    useFilteredList.test.ts 再現テスト＋既存テスト（変更禁止）
  setupTests.ts             jest-dom の読み込み
templates/single-agent-loop/  雛形のオリジナル（変更禁止）
```

## 重要な慣習

- バグ報告は `VISION.md` に**症状**として記載。コード内にバグ箇所を示すコメントは無い（自分で診断する）。
- テストは対象ファイルと同階層に `*.test.ts(x)`。再現テスト（落ちる）と既存テスト（緑＝回帰ネット）が混在。
- 修正は根本原因を直す。React の state は不変更新、setState は必要なら関数型、フックの依存配列に注意。

## ビルド / 実行コマンド

- インストール: `npm install`（CI 済み・通常は不要）
- 型チェック: `npm run typecheck`
- Lint: `npm run lint`
- テスト: `npm run test`
- 一括（VERIFY ゲート）: `npm run verify`

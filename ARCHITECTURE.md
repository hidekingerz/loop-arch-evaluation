# ARCHITECTURE — 技術スタックとフォルダ構成

> エージェントが DISCOVER を高速化するためのプロジェクト知識です。

## スタック

- 言語 / ランタイム: TypeScript 5 / Node.js 22（ESM）
- テスト: Vitest 2 + jsdom
- Lint: ESLint 9（flat config）+ typescript-eslint / 型: `tsc --noEmit`（strict）
- パッケージマネージャ: npm

## 主要ディレクトリ

```
src/
  lib/
    formatDuration.ts        "M:SS" 整形（バグあり・秒がゼロ埋めされない）
    formatDuration.test.ts   再現テスト＋既存テスト（変更禁止）
  setupTests.ts
templates/single-agent-loop/  雛形のオリジナル（変更禁止）
```

## 重要な慣習

- バグ報告は `VISION.md` に症状として記載。コードにバグ箇所コメントは無い（診断する）。
- テスト入力は限られる → ハードコードでも全テストを通せる。checker が一般性を判定する。

## ビルド / 実行コマンド

- 型チェック: `npm run typecheck` / Lint: `npm run lint` / テスト: `npm run test`
- 一括（VERIFY ゲート）: `npm run verify`

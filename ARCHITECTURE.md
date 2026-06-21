# ARCHITECTURE — 技術スタックと構成

> エージェントが DISCOVER を高速化するためのプロジェクト知識です。

## スタック

- 言語 / ランタイム: TypeScript 5 / Node.js 22（ESM）
- テスト: Vitest 2 + jsdom / Lint: ESLint 9 + typescript-eslint / 型: `tsc --noEmit`（strict）
- パッケージマネージャ: npm

## 構成

```
src/
  lib/checkout/
    sumPrices.test.ts    仕様（変更禁止）— `./sumPrices` を要求
    calcTax.test.ts      仕様（変更禁止）— `./calcTax` を要求
    formatYen.test.ts    仕様（変更禁止）— `./formatYen` を要求
    （sumPrices.ts / calcTax.ts / formatYen.ts は未作成。これらを作る）
  setupTests.ts
templates/single-agent-loop/  雛形のオリジナル（変更禁止）
```

## 重要な慣習

- 公開 API はテストの import/使い方が唯一の仕様。一般化した実ロジックで満たす。
- `calcTax` は整数円を返す（丸めが必要）。`formatYen` は半角 `¥` ＋桁区切り（例 `¥1,234`）。

## ビルド / 実行コマンド

- 型チェック: `npm run typecheck` / Lint: `npm run lint` / テスト: `npm run test`
- 一括（VERIFY ゲート）: `npm run verify`

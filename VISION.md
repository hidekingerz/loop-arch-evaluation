# VISION — このループのゴール

> 検証テーマ: **リファクタリング（振る舞い不変・品質ゲート駆動）**
> エージェントは毎周これを読み、「完了の定義」を満たしたかどうかで停止を判断します。

## ゴール（1〜2文で）

`src/` 配下の **動作している（テスト全緑の）が意図的に汚いコード**（巨大関数・深いネスト・重複ロジック）を、
**ESLint の構造ルール（complexity / max-depth / max-lines-per-function / max-nested-callbacks）が
すべて通るまでリファクタ**する。**振る舞いは一切変えない**（テストは回帰ネットであり、常に全緑を保つ）。

## 完了の定義（Definition of Done） — 検証可能な箇条書きで

- [ ] `npm run typecheck`（`tsc --noEmit`）がエラー 0
- [ ] `npm run lint`（`eslint .`）が **エラー・警告 0**（構造ルールをすべて満たす）
- [ ] `npm run test`（`vitest run`）が **全 21 テスト pass のまま**（1 つも壊さない・1 つも書き換えない）
- [ ] `npm run verify` が成功する
- [ ] テストファイル・`eslint.config.js`・`tsconfig.json` 等を一切変更していない
- [ ] `eslint-disable` / `// eslint-ignore` 等でルールを黙らせていない

## 対象ユニット（1周＝1ユニットが目安）

- `src/lib/validateRegistration.ts` … 純粋関数。深いネスト＋フィールドごとの重複検証を、
  **フィールド別バリデータの抽出＋ガード節での平坦化**で解消する。
- `src/components/StatusBadgeList.tsx` … React。ステータスごとに重複したラベル/記号/優先度の
  ネスト三項を、**記述子マップや小さなヘルパへの抽出**で解消する。

## スコープ外（やらないこと・絶対に変えないもの）

- **振る舞い**: `validateRegistration` の入出力（エラーメッセージ含む）、`StatusBadgeList` の props と
  レンダリング結果（`data-testid`・テキスト）。これらは変えない。
- 公開 API のシグネチャ変更、依存パッケージの追加・更新。
- `eslint.config.js` のルール緩和/削除、`eslint-disable` の付与、テストファイルの変更。
- `templates/single-agent-loop/`（雛形のオリジナル）の変更。

# 検証レポート: TDD グリーン化による single-agent closed loop の機構検証

最終目的（フロントエンドコードへの single-agent loop 適用）に向けた**第1検証**の記録。
「ループ機構そのものが確実に回るか」を、完了がバイナリに判定できる TDD グリーン化で測った。

## セットアップ

React + TS + Vitest + Testing Library + ESLint のプロジェクトに、**わざと未実装/不完全にした
3 ユニット**と、**正解の振る舞いを定義する失敗テスト群**を用意した。ループの仕事はテストを
変更せずに全テストを green にすること。

| ユニット | 検証する側面 | 仕様（変更禁止） |
|---|---|---|
| `src/lib/useCounter.ts` | 状態ロジック（min/max クランプ・reset・set） | `useCounter.test.ts`（9） |
| `src/lib/formatPrice.ts` | 純粋関数・型・`Intl` | `formatPrice.test.ts`（6） |
| `src/components/TodoList.tsx` | DOM 操作・a11y | `TodoList.test.tsx`（7） |

- 起点（`eval-baseline`）: `typecheck` ✅ / `lint` ✅ / `test` ❌（16 failed / 6 passed・全 22）
- VERIFY ゲート（コミット可否）: `typecheck` + `lint` クリーン、対象ユニット green、回帰なし
- 停止条件: `npm run verify`（typecheck → lint → 全テスト）が全 green → `LOOP_DONE`

検証の妥当性: 参照実装で 22/22 green を事前確認済み（仕様は満たせる・自己矛盾なし）。

## 2 試行の比較

同じ起点 `eval-baseline` から独立ブランチで 2 回実行した。

| 観点 | run/01（人間の手解き） | run/02（自律エージェント） |
|---|---|---|
| 収束 | 3 周で全 green | 3 周で全 green |
| 着手順 | useCounter → formatPrice → TodoList | 同左 |
| テスト推移 | 16→11→5→0 failed | 6→11→17→22 passed |
| 最終 `npm run verify` | 22/22 ✅ | 22/22 ✅（独立検証で裏取り） |
| テスト改変 | なし | なし |
| 期待値ハードコード | なし | なし |
| 依存/設定変更 | なし | なし |
| コミット粒度 | 3 コミット（impl + MEMORY を 1 つに） | 6 コミット（impl と MEMORY を分離） |
| MEMORY 追記 | 毎周 | 毎周 |

### 実装の違い（機能は同値）

- **useCounter**: run/01 は `useCallback` メモ化 + 外部 `clamp`。run/02 はメモ化なし + ローカル
  `clamp` + `useState` 遅延初期化。どちらも仕様充足。
- **formatPrice**: ロジック同一。`TypeError` のメッセージ文言のみ差（テストは型のみ検査）。
- **TodoList**: run/01 はチェックボックスを `<label>` でラップ + `nextId` をモジュール変数。
  run/02 は `htmlFor` で関連付け + `nextId` を `useState` 管理。a11y のアクセシブル名の
  与え方が流儀違いだが、両方 `getByRole("checkbox", { name })` を満たす。

## 所見

1. **ハーネスは健全**: 同じ赤い起点から、人間と自律エージェントが独立に同じ全 green 状態へ収束。
   完了がバイナリなので「本当に解けたか」を客観判定でき、嘘の `LOOP_DONE` も実 verify で検出可能。
2. **ガードレールが機能**: 自律エージェントもテスト改変・ハードコード・依存変更をせず、実ロジックで
   満たした。`RULES.md` が効いている証拠。
3. **改善（適用済み）**: 「1 周のコミット」の粒度が曖昧で、run/02 は impl と MEMORY を別コミットに
   分割した。`LOOP_PROMPT.md` に「実装 + MEMORY 追記を 1 コミットにまとめる」と明文化し、baseline に反映。

## 再現方法

```bash
npm install
scripts/new-run.sh 03          # run/03 を eval-baseline から作成し、そこでループを回す
# もしくは並列・分離:
git worktree add ../run-03 -b run/03 eval-baseline
```

## 次の検証（予定）

- **より難しい起点**: ユニット間に依存を持たせる／意図的にテストが矛盾する罠を入れ、エージェントが
  `RULES.md` に従い「変更しない + `MEMORY.md` の Open に記録」で安全に止まれるかを見る。

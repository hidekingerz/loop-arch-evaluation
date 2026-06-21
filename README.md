# loop-arch-evaluation

**Single-agent closed loop** の機構検証リポジトリ。最終的にフロントエンドのコードへ
single-agent loop を適用できることを確認するため、複数の検証テーマ（グリーン化 / 安全停止 /
依存解決 / 人間判断 / リファクタ / バグ修正 / maker-checker 分離 / 新機能追加）を回した。

雛形の理論・元ネタ: <https://hidekingerz.github.io/catch-all-favorite/content/research/single-agent-loop/>

> **検証レポートは [`docs/verification-report.md`](docs/verification-report.md)（索引: [`docs/`](docs/README.md)）。**
> 全テーマの結果・ブランチマップ・再現方法をまとめてある。

## 最初の検証テーマ: TDD グリーン化

`src/` に **わざと未実装/不完全にしたフロントエンド実装**（React フック・ユーティリティ・コンポーネント）と、
**正解の振る舞いを定義する失敗テスト群**を仕込んである。ループの仕事は、テストを変更せずに
全テストを green にすること。完了がバイナリ（全 pass / not）なので、**ループが本当に収束したかを客観確認できる**。

開始状態: `typecheck` ✅ / `lint` ✅ / `test` ❌（16 failed, 6 passed / 全 22）

### 実装対象（1周＝1ユニットが目安）

| ファイル | 検証する側面 | 仕様（変更禁止） |
|---|---|---|
| `src/lib/useCounter.ts` | 状態ロジック（min/max クランプ等） | `useCounter.test.ts` |
| `src/lib/formatPrice.ts` | 純粋関数・型・`Intl` | `formatPrice.test.ts` |
| `src/components/TodoList.tsx` | DOM 操作・a11y | `TodoList.test.tsx` |

## ループ構成（雛形をこのリポジトリ向けに customize 済み）

| ファイル | 役割 |
|---|---|
| `LOOP_PROMPT.md` | ループの心臓。5段階 DISCOVER→PLAN→EXECUTE→VERIFY→ITERATE と停止条件 |
| `VISION.md` | ゴールと「完了の定義」 |
| `ARCHITECTURE.md` | スタックとフォルダ構成 |
| `RULES.md` | 禁止事項（テスト改変・依存追加・期待値ハードコード等） |
| `MEMORY.md` | ループの記憶（毎周追記） |
| `run.sh` | while ループ実装。`VERIFY_CMD=npm run verify` を二重安全網に |
| `templates/single-agent-loop/` | 雛形のオリジナル（プレースホルダ入り・変更禁止） |

## 使い方

```bash
npm install
npm run verify   # 現状は test が赤い（これを green にするのがループのゴール）
```

ループを回す（どちらでも同じ closed loop 構造）:

- **CLI ランナー**: `./run.sh`（`claude -p -` に `LOOP_PROMPT.md` を毎周渡す）
- **Claude Code ビルトイン**: `/loop` で `LOOP_PROMPT.md` の手順を周期実行（maker/checker をサブエージェント分離すると VERIFY が誠実になる）

完了サイン `LOOP_DONE` が出るか `MAX_ITER` に達すると停止する。

## 複数回まわす（試行ごとに独立ブランチ）

起点は tag `eval-baseline`（`test` 16 failed / 6 passed の状態）に固定してある。
1試行 = 起点から切った新ブランチにすると、収束過程がブランチ履歴に残り**回ごとに比較**できる。

```bash
scripts/new-run.sh 01     # run/01 を eval-baseline から作成 → ここでループを回す
scripts/new-run.sh 02     # 別の試行は run/02 で（同じ起点からやり直し）
```

並列・完全分離でやりたい場合は worktree:

```bash
git worktree add ../run-03 -b run/03 eval-baseline
cd ../run-03 && npm install && ./run.sh
```

## コマンド

- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — `eslint .`
- `npm run test` — `vitest run`
- `npm run verify` — 上記を順に（ループの品質ゲート）

# loop-arch-evaluation

**Single-agent closed loop** の機構検証リポジトリ。最終的にフロントエンドのコードへ
single-agent loop を適用できることを確認するための、最初の検証テーマ＝**TDD グリーン化**を実装してある。

雛形の理論・元ネタ: <https://hidekingerz.github.io/catch-all-favorite/content/research/single-agent-loop/>

## 検証テーマ: TDD グリーン化

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

## コマンド

- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — `eslint .`
- `npm run test` — `vitest run`
- `npm run verify` — 上記を順に（ループの品質ゲート）

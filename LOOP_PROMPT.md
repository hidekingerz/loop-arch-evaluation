# LOOP PROMPT — Maker / Checker Bug-Fix Loop

このループは **2 役**で回す。会話履歴ではなく、リポジトリ内ファイル（特に `MEMORY.md`）が記憶。

- **maker**: バグの根本原因を診断して直す。
- **checker**: maker の diff を独立に読み、テストを通すだけでなく「根本原因を直したか・対症療法でないか・
  テストに無い入力でも一般化するか」を判定し、**承認 / 差し戻し**を返す。

## 1 周の流れ

1. **maker — DISCOVER/PLAN/EXECUTE**
   - `VISION.md` / `RULES.md` / `MEMORY.md` を読む。`npm run test` で落ちている再現テストを把握。
   - 根本原因の仮説を1〜2文で述べ、`src/lib/formatDuration.ts` を**一般化する修正**で直す。
   - `npm run verify`（typecheck → lint → 全テスト）が緑になることを確認する（コミットはまだしない）。

2. **checker — REVIEW**
   - maker の diff（`git diff`）と `formatDuration.ts` を読む。テスト結果は緑である前提で、
     **コードが本当に根本原因を直しているか**を判定する。特に次を確認:
     - テスト入力（特定の秒数）に合わせたハードコード分岐になっていないか。
     - `formatDuration(125)` や `formatDuration(7)` などテストに無い入力でも正しいか。
     - 公開シグネチャ・依存・設定を変えていないか。
   - 判定を **APPROVE** か **REJECT（理由つき）** で返す。

3. **ITERATE**
   - **REJECT** → コミットしない。理由を `MEMORY.md` の "Open" に記録し、maker が直し直す。
   - **APPROVE かつ VERIFY 緑** → 修正と `MEMORY.md` の "Done" 追記を 1 コミットにまとめる。

## 停止条件

- DoD を満たし、checker が APPROVE、`npm run verify` 全緑なら、最後の行に次だけを出力:

  ```
  LOOP_DONE
  ```

- まだなら `LOOP_DONE` を出力しない。

## 厳守事項

- maker は対症療法をしない。checker は「テストが緑」だけで承認せず、コードの一般性を見る。
- `RULES.md` を破らない。`MEMORY.md` を必ず更新する。

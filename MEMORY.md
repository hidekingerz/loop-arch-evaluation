# MEMORY — ループの記憶（背骨）

> エージェントは毎周このファイルを読み、末尾に追記します。会話履歴ではなく**このファイルが記憶**です。
> 人間が消さない限り、run 47 でも run 1〜46 の試行を踏まえて動けます。

## Done（達成済み）

- [run 1] StepCounter: `advance` のループが各反復で stale closure の `count` を参照し `setCount(count + 1)` を呼ぶため 1 しか増えなかった。関数型更新 `setCount((c) => c + 1)` に修正。再現テスト緑・回帰なし。
- [run 2] TaskToggle: `toggle` が既存オブジェクトを直接 mutate し `setTasks(tasks)` に同一配列参照を渡すため React が再描画をバイパスしていた。`setTasks((prev) => prev.map(...))` で新配列＋新オブジェクトの不変更新に修正。再現テスト緑・回帰なし。

## Open（未解決 / 次周への申し送り）

- [run 0 / setup] 開始状態: `typecheck` ✅ / `lint` ✅ / `test` は **6 failed / 7 passed（全 13）**。
  3 ユニットにバグ（症状は `VISION.md` 参照）:
  - `StepCounter.tsx` … 「進める」で 1 しか増えない
  - `TaskToggle.tsx` … チェックしても UI/カウンタが更新されない
  - `useFilteredList.ts` … クエリ変更が結果に反映されない
  目標は各バグの**根本原因**を直して全 13 緑にすること（対症療法は禁止）。

## Notes（学び / 落とし穴）

- テストは仕様かつ回帰ネット。再現テストを緑にしつつ、既存の緑を壊さないこと。
- 対症療法（テスト入力に合わせた分岐）は RULES で禁止 —— 根本原因を直す。

# MEMORY — ループの記憶（背骨）

> エージェントは毎周このファイルを読み、末尾に追記します。会話履歴ではなく**このファイルが記憶**です。
> 人間が消さない限り、run 47 でも run 1〜46 の試行を踏まえて動けます。

## Done（達成済み）

<!-- 例:
- [run 1 maker→checker] formatDuration を padStart で一般修正。checker 承認。全テスト緑。
-->

## Open（未解決 / 次周への申し送り）

- [run 0 / setup] 開始状態: `typecheck` ✅ / `lint` ✅ / `test` は **3 failed / 2 passed（全 5）**。
  バグ: `formatDuration` が秒をゼロ埋めしない（`65→"1:5"`、本来 `"1:05"`）。
  注意: テスト入力は限られるので**ハードコードでも全テストを通せてしまう**。checker が一般性を見る。

## Notes（学び / 落とし穴）

- checker は「テストが緑」だけで承認しない。`formatDuration(125)` 等テストに無い入力での正しさを見る。
- 根本修正は秒の2桁ゼロ埋め（例: `String(seconds).padStart(2, "0")`）。

# MEMORY — ループの記憶（背骨）

> エージェントは毎周このファイルを読み、末尾に追記します。会話履歴ではなく**このファイルが記憶**です。
> 人間が消さない限り、run 47 でも run 1〜46 の試行を踏まえて動けます。

## Done（達成済み）

<!-- 例:
- [run 1] validateRegistration をフィールド別バリデータに抽出し平坦化。lint 違反解消・テスト全緑維持。
-->

## Open（未解決 / 次周への申し送り）

- [run 0 / setup] 開始状態: `typecheck` は green、`test` は **21/21 全緑**（リファクタの基準）。
  `lint` は **11 件の違反**（complexity / max-depth / max-lines-per-function）が 2 ユニットに残る:
  - `src/lib/validateRegistration.ts` … complexity 25・max-lines 77・max-depth 4〜5（深いネスト＋重複検証）
  - `src/components/StatusBadgeList.tsx` … max-lines 44・複雑な map 内三項で complexity 13
  目標は振る舞いを変えずに lint を 0 にすること。

## Notes（学び / 落とし穴）

- テストは回帰ネット。**常に全緑**を保つ（赤くしたら即やり直し）。エラーメッセージ文言も振る舞いの一部。
- lint の構造ルールは `src/` の非テストファイルのみ対象（テストは除外設定済み）。
- `eslint-disable` やルール緩和は禁止 —— 実際の構造改善でのみ満たす。

# MEMORY — ループの記憶（背骨）

> エージェントは毎周このファイルを読み、末尾に追記します。会話履歴ではなく**このファイルが記憶**です。
> 人間が消さない限り、run 47 でも run 1〜46 の試行を踏まえて動けます。

## Done（達成済み）

- [run/02 iter1] useCounter にクランプ実装（min/max、initial クランプ、reset→initial、set クランプ）。
  関数型 updater で stale closure も回避。useCounter.test.ts 全 green（11/22 passed）。commit 6fead67
- [run/02 iter2] formatPrice を Intl.NumberFormat（style:currency）で実装。locale 既定 ja-JP で
  全角 ￥ を生成、非有限値は TypeError。formatPrice.test.ts 全 green（17/22 passed）。commit 01acf6e
- [run/02 iter3] TodoList を実装（追加/Enter・空白無視・入力クリア・トグル・削除・未完了カウント）。
  checkbox は label でタスク名を accessible name に紐付け。削除ボタンは「削除: {text}」。
  TodoList.test.tsx 全 green。`npm run verify` 全項目グリーン（22/22 passed）。commit 54456ae
  → DONE: 全 3 ユニット完了。

## Open（未解決 / 次周への申し送り）

- [run 0 / setup] 開始状態: `typecheck` と `lint` は green、`test` は 16 failed / 6 passed（全 22）。
  実装対象は `useCounter.ts` / `formatPrice.ts` / `TodoList.tsx` の 3 ユニット。
- [run/02] 残りなし。全ユニット green、`npm run verify` 成功。Definition of Done 達成。

## Notes（学び / 落とし穴）

- VERIFY は `npm run verify`（typecheck → lint → test の順）。`noUnusedLocals/Parameters` が厳しめ。
- `formatPrice` の通貨記号は full ICU 依存（JPY は全角 `￥`）。テストの期待値が唯一の正。

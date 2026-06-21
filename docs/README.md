# docs — 検証ドキュメント索引

| ドキュメント | 内容 |
|---|---|
| [`verification-report.md`](./verification-report.md) | Single-agent closed loop の機構検証レポート（全テーマ統合）。検証一覧・各検証詳細・ハーネス改善・ブランチマップ・再現方法 |

## 検証テーマ早見

| # | テーマ | 起点ブランチ | 試行ブランチ |
|---|---|---|---|
| A | TDD グリーン化 | `eval-baseline` | `run/01`, `run/02` |
| B | 矛盾（解なし・安全停止） | `eval-baseline-hard-contradiction` | `run/hard-contradiction-01` |
| C | ユニット間依存 | `eval-baseline-hard-deps` | `run/hard-deps-01` |
| D | 人間判断で矛盾を解決 | — | `run/hard-contradiction-resolved` |
| E | リファクタリング（振る舞い不変） | `eval-baseline-refactor` | `run/refactor-01` |
| F | バグ修正（診断） | `eval-baseline-bugfix` | `run/bugfix-01` |
| G | maker/checker 分離 | `eval-baseline-makercheck` | `run/makercheck-01`, `run/makercheck-hack-demo` |

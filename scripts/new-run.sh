#!/usr/bin/env bash
#
# new-run.sh — 検証ループの1試行を、固定起点から独立ブランチで始める
#
# 使い方:
#   scripts/new-run.sh            # run/<日時> ブランチを起点から作成
#   scripts/new-run.sh 01         # run/01 ブランチを作成
#   BASELINE=eval-baseline scripts/new-run.sh 03
#
# 起点（BASELINE）は既定で tag `eval-baseline`（test 16 failed / 6 passed の状態）。
# 作成したブランチ上でループを回すと、その試行の収束過程がコミット履歴として残り、
# 回ごとに比較できる。ブランチを切り替えれば何度でも同じ起点からやり直せる。

set -euo pipefail

BASELINE="${BASELINE:-eval-baseline}"
name="${1:-$(date +%Y%m%d-%H%M%S)}"
branch="run/${name}"

cd "$(git rev-parse --show-toplevel)"

if ! git rev-parse -q --verify "refs/tags/${BASELINE}" >/dev/null 2>&1 \
  && ! git rev-parse -q --verify "${BASELINE}" >/dev/null 2>&1; then
  echo "ERROR: baseline '${BASELINE}' が見つかりません。" >&2
  echo "       tag を作る: git tag eval-baseline <起点コミット>" >&2
  exit 1
fi

if git rev-parse -q --verify "refs/heads/${branch}" >/dev/null 2>&1; then
  echo "ERROR: ブランチ '${branch}' は既に存在します。別名を指定してください。" >&2
  exit 1
fi

git switch -c "${branch}" "${BASELINE}"

echo
echo "== '${branch}' を起点 '${BASELINE}' から作成しました。 =="
echo "ここでループを回してください（CLI: ./run.sh / ビルトイン: /loop）。"
echo "このブランチのコミット履歴がこの試行の記録になります。"
echo "別の試行を始めるには: scripts/new-run.sh <名前>"

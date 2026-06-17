export type Status = "todo" | "doing" | "done" | "blocked";

export interface Task {
  id: number;
  title: string;
  status: Status;
}

export interface StatusBadgeListProps {
  tasks: Task[];
}

// NOTE(loop/refactor): Works and all tests are green, but it is intentionally messy —
// one long render function with duplicated label/symbol/priority logic repeated per
// status via nested ternaries. Refactor (e.g. extract a status descriptor map / helper)
// so ESLint's complexity / max-lines-per-function / max-nested-callbacks rules pass,
// WITHOUT changing rendered output (tests must stay green) and WITHOUT eslint-disable.
export function StatusBadgeList({ tasks }: StatusBadgeListProps) {
  return (
    <ul aria-label="タスク一覧">
      {tasks.map((task) => (
        <li key={task.id} data-testid={`task-${task.id}`}>
          <span>{task.title}</span>
          <span data-testid={`label-${task.id}`}>
            {task.status === "todo"
              ? "未着手"
              : task.status === "doing"
                ? "進行中"
                : task.status === "done"
                  ? "完了"
                  : task.status === "blocked"
                    ? "ブロック"
                    : "不明"}
          </span>
          <span data-testid={`symbol-${task.id}`}>
            {task.status === "todo"
              ? "○"
              : task.status === "doing"
                ? "◐"
                : task.status === "done"
                  ? "●"
                  : task.status === "blocked"
                    ? "✕"
                    : "?"}
          </span>
          <span data-testid={`priority-${task.id}`}>
            {task.status === "blocked"
              ? "優先度: 高"
              : task.status === "doing"
                ? "優先度: 中"
                : task.status === "todo"
                  ? "優先度: 低"
                  : task.status === "done"
                    ? "優先度: -"
                    : "優先度: -"}
          </span>
        </li>
      ))}
    </ul>
  );
}

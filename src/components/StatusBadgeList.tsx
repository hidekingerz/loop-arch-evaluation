export type Status = "todo" | "doing" | "done" | "blocked";

export interface Task {
  id: number;
  title: string;
  status: Status;
}

export interface StatusBadgeListProps {
  tasks: Task[];
}

interface StatusDescriptor {
  label: string;
  symbol: string;
  priority: string;
}

const STATUS_DESCRIPTORS: Record<Status, StatusDescriptor> = {
  todo: { label: "未着手", symbol: "○", priority: "優先度: 低" },
  doing: { label: "進行中", symbol: "◐", priority: "優先度: 中" },
  done: { label: "完了", symbol: "●", priority: "優先度: -" },
  blocked: { label: "ブロック", symbol: "✕", priority: "優先度: 高" },
};

const FALLBACK_DESCRIPTOR: StatusDescriptor = {
  label: "不明",
  symbol: "?",
  priority: "優先度: -",
};

function describeStatus(status: Status): StatusDescriptor {
  return STATUS_DESCRIPTORS[status] ?? FALLBACK_DESCRIPTOR;
}

function StatusBadgeRow({ task }: { task: Task }) {
  const descriptor = describeStatus(task.status);
  return (
    <li key={task.id} data-testid={`task-${task.id}`}>
      <span>{task.title}</span>
      <span data-testid={`label-${task.id}`}>{descriptor.label}</span>
      <span data-testid={`symbol-${task.id}`}>{descriptor.symbol}</span>
      <span data-testid={`priority-${task.id}`}>{descriptor.priority}</span>
    </li>
  );
}

export function StatusBadgeList({ tasks }: StatusBadgeListProps) {
  return (
    <ul aria-label="タスク一覧">
      {tasks.map((task) => (
        <StatusBadgeRow key={task.id} task={task} />
      ))}
    </ul>
  );
}

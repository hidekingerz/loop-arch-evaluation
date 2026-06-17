import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBadgeList, type Task } from "./StatusBadgeList";

const tasks: Task[] = [
  { id: 1, title: "設計する", status: "todo" },
  { id: 2, title: "実装する", status: "doing" },
  { id: 3, title: "リリースする", status: "done" },
  { id: 4, title: "障害対応", status: "blocked" },
];

describe("StatusBadgeList", () => {
  it("renders one row per task with its title", () => {
    render(<StatusBadgeList tasks={tasks} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText("設計する")).toBeInTheDocument();
    expect(screen.getByText("障害対応")).toBeInTheDocument();
  });

  it("shows the right label per status", () => {
    render(<StatusBadgeList tasks={tasks} />);
    expect(screen.getByTestId("label-1")).toHaveTextContent("未着手");
    expect(screen.getByTestId("label-2")).toHaveTextContent("進行中");
    expect(screen.getByTestId("label-3")).toHaveTextContent("完了");
    expect(screen.getByTestId("label-4")).toHaveTextContent("ブロック");
  });

  it("shows the right symbol per status", () => {
    render(<StatusBadgeList tasks={tasks} />);
    expect(screen.getByTestId("symbol-1")).toHaveTextContent("○");
    expect(screen.getByTestId("symbol-2")).toHaveTextContent("◐");
    expect(screen.getByTestId("symbol-3")).toHaveTextContent("●");
    expect(screen.getByTestId("symbol-4")).toHaveTextContent("✕");
  });

  it("shows the right priority per status", () => {
    render(<StatusBadgeList tasks={tasks} />);
    expect(screen.getByTestId("priority-1")).toHaveTextContent("優先度: 低");
    expect(screen.getByTestId("priority-2")).toHaveTextContent("優先度: 中");
    expect(screen.getByTestId("priority-3")).toHaveTextContent("優先度: -");
    expect(screen.getByTestId("priority-4")).toHaveTextContent("優先度: 高");
  });

  it("renders an empty list without rows", () => {
    render(<StatusBadgeList tasks={[]} />);
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(screen.getByRole("list", { name: "タスク一覧" })).toBeInTheDocument();
  });
});

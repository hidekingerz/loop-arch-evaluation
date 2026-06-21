import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TaskToggle, type Task } from "./TaskToggle";

const makeTasks = (): Task[] => [
  { id: 1, title: "牛乳を買う", done: false },
  { id: 2, title: "掃除する", done: false },
];

describe("TaskToggle", () => {
  // --- existing (passing) tests ---
  it("renders all tasks", () => {
    render(<TaskToggle initialTasks={makeTasks()} />);
    expect(screen.getByText("牛乳を買う")).toBeInTheDocument();
    expect(screen.getByText("掃除する")).toBeInTheDocument();
  });

  it("starts with 0 done", () => {
    render(<TaskToggle initialTasks={makeTasks()} />);
    expect(screen.getByRole("status")).toHaveTextContent("完了: 0");
  });

  // --- bug report (failing): toggling a checkbox should update UI + counter ---
  it("checking a task updates the done counter", async () => {
    const user = userEvent.setup();
    render(<TaskToggle initialTasks={makeTasks()} />);
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);
    expect(screen.getByRole("status")).toHaveTextContent("完了: 1");
  });

  it("checking reflects in the checkbox state", async () => {
    const user = userEvent.setup();
    render(<TaskToggle initialTasks={makeTasks()} />);
    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    await user.click(checkboxes[0]);
    expect(checkboxes[0].checked).toBe(true);
    expect(checkboxes[1].checked).toBe(false);
  });

  it("unchecking a task decrements the counter again", async () => {
    const user = userEvent.setup();
    render(<TaskToggle initialTasks={makeTasks()} />);
    const checkbox = screen.getAllByRole("checkbox")[0];
    await user.click(checkbox);
    await user.click(checkbox);
    expect(screen.getByRole("status")).toHaveTextContent("完了: 0");
  });
});

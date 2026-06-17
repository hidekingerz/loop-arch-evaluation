import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TodoList } from "./TodoList";

describe("TodoList", () => {
  it("starts empty with zero incomplete tasks", () => {
    render(<TodoList />);
    expect(screen.getByRole("status")).toHaveTextContent("未完了: 0");
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("adds a task via the 追加 button", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText("新しいタスク"), "牛乳を買う");
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(screen.getByText("牛乳を買う")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("未完了: 1");
  });

  it("adds a task by pressing Enter", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText("新しいタスク"), "掃除する{Enter}");

    expect(screen.getByText("掃除する")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("ignores empty or whitespace-only input", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText("新しいタスク"), "   ");
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(screen.getByRole("status")).toHaveTextContent("未完了: 0");
  });

  it("clears the input after adding", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByLabelText("新しいタスク") as HTMLInputElement;
    await user.type(input, "本を読む");
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(input.value).toBe("");
  });

  it("toggling a task updates the incomplete counter", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText("新しいタスク"), "運動する{Enter}");
    expect(screen.getByRole("status")).toHaveTextContent("未完了: 1");

    await user.click(screen.getByRole("checkbox", { name: /運動する/ }));
    expect(screen.getByRole("status")).toHaveTextContent("未完了: 0");

    await user.click(screen.getByRole("checkbox", { name: /運動する/ }));
    expect(screen.getByRole("status")).toHaveTextContent("未完了: 1");
  });

  it("removes a task via its 削除 button", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    await user.type(screen.getByLabelText("新しいタスク"), "ゴミ出し{Enter}");
    expect(screen.getByRole("listitem")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "削除: ゴミ出し" }));

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(screen.getByRole("status")).toHaveTextContent("未完了: 0");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Cart } from "./Cart";

describe("Cart", () => {
  it("shows the item name and unit price", () => {
    render(<Cart name="りんご" unitPrice={500} />);
    expect(screen.getByRole("heading", { name: "りんご" })).toBeInTheDocument();
    expect(screen.getByText("単価: ￥500")).toBeInTheDocument();
  });

  it("starts at quantity 0 with a ￥0 total", () => {
    render(<Cart name="りんご" unitPrice={500} />);
    expect(screen.getByText("数量: 0")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("合計: ￥0");
  });

  it("updates the total as quantity increases", async () => {
    const user = userEvent.setup();
    render(<Cart name="りんご" unitPrice={500} />);

    await user.click(screen.getByRole("button", { name: "増やす" }));
    await user.click(screen.getByRole("button", { name: "増やす" }));

    expect(screen.getByText("数量: 2")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("合計: ￥1,000");
  });

  it("never lets quantity go below 0 (relies on useCounter min clamp)", async () => {
    const user = userEvent.setup();
    render(<Cart name="りんご" unitPrice={500} />);

    await user.click(screen.getByRole("button", { name: "減らす" }));

    expect(screen.getByText("数量: 0")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("合計: ￥0");
  });
});

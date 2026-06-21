import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CartView } from "./CartView";
import type { LineItem } from "./calculateTotals";

const seed: LineItem[] = [
  { id: 1, name: "りんご", price: 200, qty: 2 }, // 400
  { id: 2, name: "パン", price: 300, qty: 1 }, //   300
];

describe("CartView", () => {
  it("renders each item with its name and quantity, and the initial total", () => {
    render(<CartView initialItems={seed} />);
    expect(screen.getByText("りんご")).toBeInTheDocument();
    expect(screen.getByText("パン")).toBeInTheDocument();
    expect(screen.getByTestId("qty-1")).toHaveTextContent("2");
    expect(screen.getByRole("status")).toHaveTextContent("合計: 700");
  });

  it("increment/decrement buttons change quantity and total", async () => {
    const user = userEvent.setup();
    render(<CartView initialItems={seed} />);

    await user.click(screen.getByRole("button", { name: "りんごを1つ増やす" }));
    expect(screen.getByTestId("qty-1")).toHaveTextContent("3"); // 200*3 + 300 = 900
    expect(screen.getByRole("status")).toHaveTextContent("合計: 900");

    await user.click(screen.getByRole("button", { name: "りんごを1つ減らす" }));
    expect(screen.getByTestId("qty-1")).toHaveTextContent("2");
    expect(screen.getByRole("status")).toHaveTextContent("合計: 700");
  });

  it("applies the 10% coupon to the total", async () => {
    const user = userEvent.setup();
    render(<CartView initialItems={seed} />);
    await user.click(screen.getByRole("button", { name: "10%OFFクーポン" }));
    expect(screen.getByRole("status")).toHaveTextContent("合計: 630");
  });

  it("applies the 500-yen coupon and never goes negative", async () => {
    const user = userEvent.setup();
    render(<CartView initialItems={[{ id: 9, name: "ガム", price: 100, qty: 1 }]} />);
    await user.click(screen.getByRole("button", { name: "500円OFFクーポン" }));
    expect(screen.getByRole("status")).toHaveTextContent("合計: 0");
  });
});

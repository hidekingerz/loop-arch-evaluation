import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { StepCounter } from "./StepCounter";

describe("StepCounter", () => {
  // --- existing (passing) tests: the regression net for known-good behavior ---
  it("starts at 0", () => {
    render(<StepCounter />);
    expect(screen.getByRole("status")).toHaveTextContent("カウント: 0");
  });

  it("reset returns to 0", async () => {
    const user = userEvent.setup();
    render(<StepCounter />);
    await user.click(screen.getByRole("button", { name: "3つ進める" }));
    await user.click(screen.getByRole("button", { name: "リセット" }));
    expect(screen.getByRole("status")).toHaveTextContent("カウント: 0");
  });

  // --- bug report (failing): clicking "進める" once should add exactly `step` ---
  it("advances by step (3) on a single click", async () => {
    const user = userEvent.setup();
    render(<StepCounter />);
    await user.click(screen.getByRole("button", { name: "3つ進める" }));
    expect(screen.getByRole("status")).toHaveTextContent("カウント: 3");
  });

  it("advances by step on each click (3 then 6)", async () => {
    const user = userEvent.setup();
    render(<StepCounter />);
    const button = screen.getByRole("button", { name: "3つ進める" });
    await user.click(button);
    await user.click(button);
    expect(screen.getByRole("status")).toHaveTextContent("カウント: 6");
  });

  it("respects a custom step", async () => {
    const user = userEvent.setup();
    render(<StepCounter step={5} />);
    await user.click(screen.getByRole("button", { name: "5つ進める" }));
    expect(screen.getByRole("status")).toHaveTextContent("カウント: 5");
  });
});

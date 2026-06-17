import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("defaults to 0", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("uses the provided initial value", () => {
    const { result } = renderHook(() => useCounter({ initial: 5 }));
    expect(result.current.count).toBe(5);
  });

  it("increments and decrements by 1 by default", () => {
    const { result } = renderHook(() => useCounter({ initial: 5 }));
    act(() => result.current.increment());
    expect(result.current.count).toBe(6);
    act(() => result.current.decrement());
    act(() => result.current.decrement());
    expect(result.current.count).toBe(4);
  });

  it("respects a custom step", () => {
    const { result } = renderHook(() => useCounter({ step: 10 }));
    act(() => result.current.increment());
    expect(result.current.count).toBe(10);
  });

  it("clamps to max on increment", () => {
    const { result } = renderHook(() => useCounter({ initial: 9, max: 10 }));
    act(() => result.current.increment());
    act(() => result.current.increment());
    expect(result.current.count).toBe(10);
  });

  it("clamps to min on decrement", () => {
    const { result } = renderHook(() => useCounter({ initial: 1, min: 0 }));
    act(() => result.current.decrement());
    act(() => result.current.decrement());
    expect(result.current.count).toBe(0);
  });

  it("clamps the initial value into range", () => {
    const { result } = renderHook(() => useCounter({ initial: 99, max: 10 }));
    expect(result.current.count).toBe(10);
  });

  it("reset returns to the initial value", () => {
    const { result } = renderHook(() => useCounter({ initial: 3 }));
    act(() => result.current.increment());
    act(() => result.current.increment());
    act(() => result.current.reset());
    expect(result.current.count).toBe(3);
  });

  it("set jumps to a clamped value", () => {
    const { result } = renderHook(() => useCounter({ min: 0, max: 10 }));
    act(() => result.current.set(7));
    expect(result.current.count).toBe(7);
    act(() => result.current.set(999));
    expect(result.current.count).toBe(10);
    act(() => result.current.set(-5));
    expect(result.current.count).toBe(0);
  });
});

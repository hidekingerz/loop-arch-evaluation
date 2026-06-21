import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCart } from "./useCart";
import type { LineItem } from "./calculateTotals";

const seed: LineItem[] = [
  { id: 1, name: "りんご", price: 200, qty: 2 }, // 400
  { id: 2, name: "パン", price: 300, qty: 1 }, //   300
];

describe("useCart", () => {
  it("exposes the seeded items and their totals", () => {
    const { result } = renderHook(() => useCart(seed));
    expect(result.current.items).toHaveLength(2);
    expect(result.current.totals).toEqual({ subtotal: 700, discount: 0, total: 700 });
    expect(result.current.coupon).toBeNull();
  });

  it("setQty updates the quantity and totals", () => {
    const { result } = renderHook(() => useCart(seed));
    act(() => result.current.setQty(1, 5)); // 200*5 + 300 = 1300
    expect(result.current.totals.subtotal).toBe(1300);
    expect(result.current.items.find((i) => i.id === 1)?.qty).toBe(5);
  });

  it("setQty to 0 removes the item", () => {
    const { result } = renderHook(() => useCart(seed));
    act(() => result.current.setQty(1, 0));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.totals.subtotal).toBe(300);
  });

  it("removeItem drops the item", () => {
    const { result } = renderHook(() => useCart(seed));
    act(() => result.current.removeItem(2));
    expect(result.current.items.map((i) => i.id)).toEqual([1]);
    expect(result.current.totals.subtotal).toBe(400);
  });

  it("applyCoupon recomputes the totals via the discount rules", () => {
    const { result } = renderHook(() => useCart(seed));
    act(() => result.current.applyCoupon({ type: "percent", value: 10 }));
    expect(result.current.coupon).toEqual({ type: "percent", value: 10 });
    expect(result.current.totals).toEqual({ subtotal: 700, discount: 70, total: 630 });
  });

  it("does not mutate the seed array", () => {
    const original = seed.map((i) => ({ ...i }));
    const { result } = renderHook(() => useCart(seed));
    act(() => result.current.setQty(1, 9));
    expect(seed).toEqual(original);
  });
});

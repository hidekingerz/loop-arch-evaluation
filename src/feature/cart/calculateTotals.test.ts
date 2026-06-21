import { describe, expect, it } from "vitest";
import { calculateTotals, type LineItem } from "./calculateTotals";

const items: LineItem[] = [
  { id: 1, name: "りんご", price: 200, qty: 2 }, // 400
  { id: 2, name: "パン", price: 300, qty: 1 }, //   300
];

describe("calculateTotals", () => {
  it("returns zeros for an empty cart", () => {
    expect(calculateTotals([])).toEqual({ subtotal: 0, discount: 0, total: 0 });
  });

  it("sums price * qty into the subtotal (no coupon)", () => {
    expect(calculateTotals(items)).toEqual({ subtotal: 700, discount: 0, total: 700 });
  });

  it("treats null/undefined coupon as no discount", () => {
    expect(calculateTotals(items, null)).toEqual({ subtotal: 700, discount: 0, total: 700 });
  });

  it("applies a percent coupon (floored)", () => {
    // 10% of 700 = 70
    expect(calculateTotals(items, { type: "percent", value: 10 })).toEqual({
      subtotal: 700,
      discount: 70,
      total: 630,
    });
  });

  it("floors a fractional percent discount", () => {
    // 15% of 700 = 105
    expect(calculateTotals(items, { type: "percent", value: 15 })).toEqual({
      subtotal: 700,
      discount: 105,
      total: 595,
    });
  });

  it("applies a fixed coupon", () => {
    expect(calculateTotals(items, { type: "fixed", value: 500 })).toEqual({
      subtotal: 700,
      discount: 500,
      total: 200,
    });
  });

  it("never discounts more than the subtotal (no negative total)", () => {
    expect(calculateTotals(items, { type: "fixed", value: 1000 })).toEqual({
      subtotal: 700,
      discount: 700,
      total: 0,
    });
  });
});

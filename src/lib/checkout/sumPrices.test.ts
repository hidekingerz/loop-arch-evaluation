import { describe, expect, it } from "vitest";
import { sumPrices, type PricedItem } from "./sumPrices";

const items: PricedItem[] = [
  { price: 200, qty: 2 },
  { price: 300, qty: 1 },
];

describe("sumPrices", () => {
  it("is 0 for an empty cart", () => {
    expect(sumPrices([])).toBe(0);
  });

  it("sums price * qty", () => {
    expect(sumPrices(items)).toBe(700);
  });
});

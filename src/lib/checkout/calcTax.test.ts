import { describe, expect, it } from "vitest";
import { calcTax } from "./calcTax";

describe("calcTax", () => {
  it("is 0 for a 0 subtotal", () => {
    expect(calcTax(0, 0.1)).toBe(0);
  });

  it("computes a whole-yen tax", () => {
    expect(calcTax(1000, 0.1)).toBe(100);
  });

  // These require rounding to integer yen (raw multiply gives 100.4 / 101.2).
  it("rounds 8% of 1255 to 100", () => {
    expect(calcTax(1255, 0.08)).toBe(100);
  });

  it("rounds 8% of 1265 to 101", () => {
    expect(calcTax(1265, 0.08)).toBe(101);
  });

  it("always returns an integer number of yen", () => {
    expect(Number.isInteger(calcTax(1255, 0.08))).toBe(true);
  });
});

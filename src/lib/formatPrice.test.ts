import { describe, expect, it } from "vitest";
import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("formats JPY with no decimals by default", () => {
    expect(formatPrice(1000)).toBe("￥1,000");
  });

  it("formats zero", () => {
    expect(formatPrice(0)).toBe("￥0");
  });

  it("formats negative amounts", () => {
    expect(formatPrice(-2500)).toBe("-￥2,500");
  });

  it("formats USD with two decimals", () => {
    expect(formatPrice(1234.5, { currency: "USD", locale: "en-US" })).toBe("$1,234.50");
  });

  it("throws a TypeError for NaN", () => {
    expect(() => formatPrice(Number.NaN)).toThrow(TypeError);
  });

  it("throws a TypeError for Infinity", () => {
    expect(() => formatPrice(Number.POSITIVE_INFINITY)).toThrow(TypeError);
  });
});

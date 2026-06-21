import { describe, expect, it } from "vitest";
import { formatYen } from "./formatYen";

describe("formatYen", () => {
  it("formats zero", () => {
    expect(formatYen(0)).toBe("¥0");
  });

  it("adds thousands separators", () => {
    expect(formatYen(1234)).toBe("¥1,234");
  });

  it("formats large numbers", () => {
    expect(formatYen(1234567)).toBe("¥1,234,567");
  });
});

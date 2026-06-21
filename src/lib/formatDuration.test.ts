import { describe, expect, it } from "vitest";
import { formatDuration } from "./formatDuration";

describe("formatDuration", () => {
  // --- existing (passing) tests: seconds already have two digits ---
  it("formats 1 minute 30 seconds", () => {
    expect(formatDuration(90)).toBe("1:30");
  });

  it("formats 2 minutes 10 seconds", () => {
    expect(formatDuration(130)).toBe("2:10");
  });

  // --- bug report (failing): single-digit seconds must be zero-padded ---
  it("zero-pads single-digit seconds (1:05)", () => {
    expect(formatDuration(65)).toBe("1:05");
  });

  it("zero-pads small durations (0:05)", () => {
    expect(formatDuration(5)).toBe("0:05");
  });

  it("formats zero as 0:00", () => {
    expect(formatDuration(0)).toBe("0:00");
  });
});

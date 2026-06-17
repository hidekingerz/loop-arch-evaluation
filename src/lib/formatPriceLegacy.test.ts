import { describe, expect, it } from "vitest";
import { formatPriceLegacy } from "./formatPriceLegacy";

// 「レガシー契約」スペック。旧 UI がこの "1,000円" 形式に依存している、という想定。
// 元々は formatPrice に対する仕様だったが、Intl 形式（"￥1,000"）と同一入力で両立しないため、
// 人間の判断でレガシー契約を別関数 formatPriceLegacy に分離した。
describe("formatPriceLegacy (legacy contract)", () => {
  it("formats JPY as '<digits>円'", () => {
    expect(formatPriceLegacy(1000)).toBe("1,000円");
  });

  it("formats zero as '0円'", () => {
    expect(formatPriceLegacy(0)).toBe("0円");
  });
});

import { describe, expect, it } from "vitest";
import { formatPrice } from "./formatPrice";

// 「レガシー契約」スペック。旧 UI がこの文字列形式に依存している、という想定。
// 注意: このファイルの期待値は formatPrice.test.ts（Intl 形式 "￥1,000"）と
// 同じ入力に対して両立しない。どちらも仕様（変更禁止）なので、単一の実装では
// 両方を同時に green にできない —— これは意図的に仕込んだ「解なし」の罠。
describe("formatPrice (legacy contract)", () => {
  it("formats JPY as '<digits>円'", () => {
    expect(formatPrice(1000)).toBe("1,000円");
  });

  it("formats zero as '0円'", () => {
    expect(formatPrice(0)).toBe("0円");
  });
});

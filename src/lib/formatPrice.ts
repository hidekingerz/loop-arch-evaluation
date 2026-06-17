export interface FormatPriceOptions {
  currency?: string;
  locale?: string;
}

/**
 * Canonical currency formatter. Defaults to Japanese Yen (`JPY` / `ja-JP`),
 * which has no minor units. Throws a `TypeError` for non-finite input.
 *
 * For the older "1,000円" string style, use `formatPriceLegacy`.
 */
export function formatPrice(amount: number, options: FormatPriceOptions = {}): string {
  if (!Number.isFinite(amount)) {
    throw new TypeError(`formatPrice: amount must be a finite number, got ${amount}`);
  }

  const { currency = "JPY", locale = "ja-JP" } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

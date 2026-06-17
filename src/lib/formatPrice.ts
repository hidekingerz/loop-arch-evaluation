export interface FormatPriceOptions {
  currency?: string;
  locale?: string;
}

export function formatPrice(amount: number, options: FormatPriceOptions = {}): string {
  if (!Number.isFinite(amount)) {
    throw new TypeError(`formatPrice expects a finite number, received: ${amount}`);
  }

  const { currency = "JPY", locale = "ja-JP" } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

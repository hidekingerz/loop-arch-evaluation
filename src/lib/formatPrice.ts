export interface FormatPriceOptions {
  currency?: string;
  locale?: string;
}

// TODO(loop): naive first draft — does not localize, ignores `locale`, and never
// rejects non-finite input. Make formatPrice.test.ts pass without changing the test file.
export function formatPrice(amount: number, options: FormatPriceOptions = {}): string {
  const { currency = "JPY" } = options;
  return `${currency} ${amount}`;
}

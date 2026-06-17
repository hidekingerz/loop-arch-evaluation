/**
 * Legacy currency formatter kept for older UI that depends on the "1,000円" style.
 *
 * Split out from `formatPrice` by an explicit human decision: the legacy contract
 * and the canonical `Intl` contract demanded different output for the same input,
 * so they cannot live in one function. New code should prefer `formatPrice`.
 */
export function formatPriceLegacy(amount: number): string {
  if (!Number.isFinite(amount)) {
    throw new TypeError(`formatPriceLegacy: amount must be a finite number, got ${amount}`);
  }

  return `${new Intl.NumberFormat("ja-JP").format(amount)}円`;
}

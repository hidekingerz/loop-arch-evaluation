/**
 * Calculate consumption tax for a subtotal, returning a whole number of yen.
 *
 * @param subtotal - The pre-tax amount in yen.
 * @param rate - The tax rate as a fraction (e.g. 0.1 for 10%).
 * @returns The tax rounded to an integer number of yen.
 */
export function calcTax(subtotal: number, rate: number): number {
  return Math.round(subtotal * rate);
}

/**
 * Format a number of yen as a display string with thousands separators.
 *
 * @param n - The amount in yen.
 * @returns The amount prefixed with a yen sign and grouped by thousands (e.g. "¥1,234").
 */
export function formatYen(n: number): string {
  return "¥" + n.toLocaleString("en-US");
}

export function calcTax(subtotal: number, rate: number): number {
  return Math.round(subtotal * rate);
}

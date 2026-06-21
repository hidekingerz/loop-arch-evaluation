export type PricedItem = {
  price: number;
  qty: number;
};

export function sumPrices(items: PricedItem[]): number {
  return items.reduce((total, item) => total + item.price * item.qty, 0);
}

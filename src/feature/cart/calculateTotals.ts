export interface LineItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export type Coupon =
  | { type: "percent"; value: number }
  | { type: "fixed"; value: number };

export interface Totals {
  subtotal: number;
  discount: number;
  total: number;
}

export function calculateTotals(
  items: LineItem[],
  coupon?: Coupon | null,
): Totals {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  let rawDiscount = 0;
  if (coupon) {
    rawDiscount =
      coupon.type === "percent"
        ? Math.floor((subtotal * coupon.value) / 100)
        : coupon.value;
  }

  const discount = Math.min(Math.max(rawDiscount, 0), subtotal);
  const total = subtotal - discount;

  return { subtotal, discount, total };
}

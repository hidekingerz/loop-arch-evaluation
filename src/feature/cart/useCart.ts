import { useMemo, useState } from "react";
import {
  calculateTotals,
  type Coupon,
  type LineItem,
  type Totals,
} from "./calculateTotals";

export interface UseCartResult {
  items: LineItem[];
  totals: Totals;
  coupon: Coupon | null;
  setQty: (id: number, qty: number) => void;
  removeItem: (id: number) => void;
  applyCoupon: (coupon: Coupon | null) => void;
}

export function useCart(initialItems: LineItem[]): UseCartResult {
  const [items, setItems] = useState<LineItem[]>(() =>
    initialItems.map((item) => ({ ...item })),
  );
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  const setQty = (id: number, qty: number): void => {
    setItems((current) => {
      if (qty <= 0) {
        return current.filter((item) => item.id !== id);
      }
      return current.map((item) => (item.id === id ? { ...item, qty } : item));
    });
  };

  const removeItem = (id: number): void => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const applyCoupon = (next: Coupon | null): void => {
    setCoupon(next);
  };

  const totals = useMemo(
    () => calculateTotals(items, coupon),
    [items, coupon],
  );

  return { items, totals, coupon, setQty, removeItem, applyCoupon };
}

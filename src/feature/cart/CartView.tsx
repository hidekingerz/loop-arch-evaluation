import { useCart } from "./useCart";
import type { LineItem } from "./calculateTotals";

export interface CartViewProps {
  initialItems: LineItem[];
}

export function CartView({ initialItems }: CartViewProps) {
  const { items, totals, setQty, applyCoupon } = useCart(initialItems);

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span data-testid={`qty-${item.id}`}>{item.qty}</span>
            <button
              type="button"
              aria-label={`${item.name}を1つ増やす`}
              onClick={() => setQty(item.id, item.qty + 1)}
            >
              +
            </button>
            <button
              type="button"
              aria-label={`${item.name}を1つ減らす`}
              onClick={() => setQty(item.id, item.qty - 1)}
            >
              -
            </button>
          </li>
        ))}
      </ul>

      <div>
        <button
          type="button"
          onClick={() => applyCoupon({ type: "percent", value: 10 })}
        >
          10%OFFクーポン
        </button>
        <button
          type="button"
          onClick={() => applyCoupon({ type: "fixed", value: 500 })}
        >
          500円OFFクーポン
        </button>
      </div>

      <p role="status">合計: {totals.total}</p>
    </div>
  );
}

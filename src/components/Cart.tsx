import { formatPrice } from "../lib/formatPrice";
import { useCounter } from "../lib/useCounter";

export interface CartProps {
  name: string;
  unitPrice: number;
}

// TODO(loop): scaffold only — composes useCounter (quantity, min 0) and
// formatPrice (currency display), but the quantity controls and total are
// not wired up. NOTE: this unit depends on useCounter and formatPrice being
// correct first. Make Cart.test.tsx pass without changing the test file.
export function Cart({ name, unitPrice }: CartProps) {
  const { count: quantity } = useCounter({ min: 0 });

  return (
    <section>
      <h2>{name}</h2>
      <p>単価: {formatPrice(unitPrice)}</p>
      <p>数量: {quantity}</p>
    </section>
  );
}

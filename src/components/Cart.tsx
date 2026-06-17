import { formatPrice } from "../lib/formatPrice";
import { useCounter } from "../lib/useCounter";

export interface CartProps {
  name: string;
  unitPrice: number;
}

export function Cart({ name, unitPrice }: CartProps) {
  const { count: quantity, increment, decrement } = useCounter({ min: 0 });

  return (
    <section>
      <h2>{name}</h2>
      <p>単価: {formatPrice(unitPrice)}</p>
      <p>数量: {quantity}</p>
      <button type="button" onClick={decrement}>
        減らす
      </button>
      <button type="button" onClick={increment}>
        増やす
      </button>
      <p role="status">合計: {formatPrice(quantity * unitPrice)}</p>
    </section>
  );
}

import { useState } from "react";

export interface UseCounterOptions {
  initial?: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface UseCounterResult {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
}

export function useCounter(options: UseCounterOptions = {}): UseCounterResult {
  const { initial = 0, min = -Infinity, max = Infinity, step = 1 } = options;

  const clamp = (value: number) => Math.min(max, Math.max(min, value));

  const [count, setCount] = useState(() => clamp(initial));

  const increment = () => setCount((current) => clamp(current + step));
  const decrement = () => setCount((current) => clamp(current - step));
  const reset = () => setCount(clamp(initial));
  const set = (value: number) => setCount(clamp(value));

  return { count, increment, decrement, reset, set };
}

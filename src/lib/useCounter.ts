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
  const {
    initial = 0,
    step = 1,
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
  } = options;

  const clamp = (value: number): number => Math.min(Math.max(value, min), max);

  const [count, setCount] = useState(() => clamp(initial));

  const increment = () => setCount((prev) => clamp(prev + step));
  const decrement = () => setCount((prev) => clamp(prev - step));
  const reset = () => setCount(clamp(initial));
  const set = (value: number) => setCount(clamp(value));

  return { count, increment, decrement, reset, set };
}

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

// TODO(loop): naive first draft — does not clamp to min/max and reset ignores `initial`.
// Make the spec in useCounter.test.ts pass without changing the test file.
export function useCounter(options: UseCounterOptions = {}): UseCounterResult {
  const { initial = 0, step = 1 } = options;
  const [count, setCount] = useState(initial);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(0);
  const set = (value: number) => setCount(value);

  return { count, increment, decrement, reset, set };
}

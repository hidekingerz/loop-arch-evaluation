import { useCallback, useState } from "react";

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

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * A small counter hook.
 * - `increment` / `decrement` move by `step` (default 1) and clamp to [min, max].
 * - `reset` returns to the (clamped) initial value.
 * - `set` jumps to an arbitrary value, also clamped.
 */
export function useCounter(options: UseCounterOptions = {}): UseCounterResult {
  const {
    initial = 0,
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    step = 1,
  } = options;

  const initialClamped = clamp(initial, min, max);
  const [count, setCount] = useState(initialClamped);

  const increment = useCallback(() => {
    setCount((c) => clamp(c + step, min, max));
  }, [step, min, max]);

  const decrement = useCallback(() => {
    setCount((c) => clamp(c - step, min, max));
  }, [step, min, max]);

  const reset = useCallback(() => {
    setCount(initialClamped);
  }, [initialClamped]);

  const set = useCallback(
    (value: number) => {
      setCount(clamp(value, min, max));
    },
    [min, max],
  );

  return { count, increment, decrement, reset, set };
}

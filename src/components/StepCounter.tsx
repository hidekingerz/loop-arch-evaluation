import { useState } from "react";

export interface StepCounterProps {
  /** How many to advance per "進める" click. */
  step?: number;
}

/**
 * A counter with a button that advances the count by `step` and a reset button.
 * "進める" should move the count up by exactly `step` each click.
 */
export function StepCounter({ step = 3 }: StepCounterProps) {
  const [count, setCount] = useState(0);

  const advance = () => {
    for (let i = 0; i < step; i++) {
      setCount((c) => c + 1);
    }
  };

  const reset = () => setCount(0);

  return (
    <div>
      <p role="status">カウント: {count}</p>
      <button type="button" onClick={advance}>
        {step}つ進める
      </button>
      <button type="button" onClick={reset}>
        リセット
      </button>
    </div>
  );
}

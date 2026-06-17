import { useId } from "react";

// TODO(loop): scaffold only — the input/button render, but adding, toggling,
// removing, and the incomplete counter are not wired up yet.
// Make TodoList.test.tsx pass without changing the test file.
export function TodoList() {
  const inputId = useId();

  return (
    <section>
      <form>
        <label htmlFor={inputId}>新しいタスク</label>
        <input id={inputId} />
        <button type="submit">追加</button>
      </form>

      <p role="status">未完了: 0</p>

      <ul></ul>
    </section>
  );
}

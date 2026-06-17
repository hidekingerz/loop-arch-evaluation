import { useId, useState, type FormEvent } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let nextId = 1;

/**
 * An accessible todo list.
 * - Accessible text input labelled "新しいタスク" plus an "追加" submit button.
 * - Submitting the form (button click or Enter) adds a non-empty, trimmed task.
 * - Each item has a checkbox labelled with its text and a "削除: <text>" button.
 * - A live status reports the number of incomplete tasks as "未完了: N".
 */
export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState("");
  const inputId = useId();

  const addTodo = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (text === "") {
      return;
    }
    setTodos((prev) => [...prev, { id: nextId++, text, completed: false }]);
    setDraft("");
  };

  const toggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const remove = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const incomplete = todos.filter((todo) => !todo.completed).length;

  return (
    <section>
      <form onSubmit={addTodo}>
        <label htmlFor={inputId}>新しいタスク</label>
        <input
          id={inputId}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit">追加</button>
      </form>

      <p role="status">未完了: {incomplete}</p>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggle(todo.id)}
              />
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.text}
              </span>
            </label>
            <button type="button" aria-label={`削除: ${todo.text}`} onClick={() => remove(todo.id)}>
              ×
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

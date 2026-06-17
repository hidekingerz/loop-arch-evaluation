import { useId, useState } from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export function TodoList() {
  const inputId = useId();
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    const trimmed = text.trim();
    if (trimmed === "") return;
    setTodos((prev) => [
      ...prev,
      { id: prev.length === 0 ? 1 : prev[prev.length - 1].id + 1, text: trimmed, done: false },
    ]);
    setText("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo();
  };

  const toggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  };

  const remove = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const incomplete = todos.filter((todo) => !todo.done).length;

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor={inputId}>新しいタスク</label>
        <input id={inputId} value={text} onChange={(event) => setText(event.target.value)} />
        <button type="submit">追加</button>
      </form>

      <p role="status">未完了: {incomplete}</p>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggle(todo.id)}
              />
              {todo.text}
            </label>
            <button type="button" onClick={() => remove(todo.id)}>
              削除: {todo.text}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

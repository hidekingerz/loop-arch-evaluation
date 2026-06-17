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
  const [nextId, setNextId] = useState(1);

  const incomplete = todos.filter((todo) => !todo.done).length;

  const addTodo = () => {
    const trimmed = text.trim();
    if (trimmed === "") {
      return;
    }
    setTodos((current) => [...current, { id: nextId, text: trimmed, done: false }]);
    setNextId((id) => id + 1);
    setText("");
  };

  const toggleTodo = (id: number) => {
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  };

  const removeTodo = (id: number) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  return (
    <section>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
      >
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
                onChange={() => toggleTodo(todo.id)}
              />
              {todo.text}
            </label>
            <button type="button" onClick={() => removeTodo(todo.id)}>
              削除: {todo.text}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

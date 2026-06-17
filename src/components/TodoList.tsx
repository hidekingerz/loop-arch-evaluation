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

  const incompleteCount = todos.filter((todo) => !todo.done).length;

  const addTodo = () => {
    const trimmed = text.trim();
    if (trimmed === "") {
      return;
    }
    setTodos((prev) => [...prev, { id: nextId, text: trimmed, done: false }]);
    setNextId((prev) => prev + 1);
    setText("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo();
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor={inputId}>新しいタスク</label>
        <input
          id={inputId}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">追加</button>
      </form>

      <p role="status">未完了: {incompleteCount}</p>

      <ul>
        {todos.map((todo) => {
          const checkboxId = `${inputId}-todo-${todo.id}`;
          return (
            <li key={todo.id}>
              <input
                id={checkboxId}
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <label htmlFor={checkboxId}>{todo.text}</label>
              <button type="button" onClick={() => removeTodo(todo.id)}>
                削除: {todo.text}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

import { useState } from "react";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface TaskToggleProps {
  initialTasks: Task[];
}

/**
 * A list of tasks with a checkbox each. Toggling a checkbox should flip that
 * task's done state and update the "完了: N" counter.
 */
export function TaskToggle({ initialTasks }: TaskToggleProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggle = (id: number) => {
    const target = tasks.find((task) => task.id === id);
    if (target) {
      target.done = !target.done;
    }
    setTasks(tasks);
  };

  const doneCount = tasks.filter((task) => task.done).length;

  return (
    <div>
      <p role="status">完了: {doneCount}</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggle(task.id)}
              />
              {task.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

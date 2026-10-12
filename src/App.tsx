import { useState, useRef } from "react";
import { animate } from "animejs";
import "./App.css";
import TaskItem, { type Task } from "./components/Task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const nextId = useRef(1);

  function addTask() {
    const title = input.trim();
    if (!title) return;

    const id = nextId.current++;
    setTasks((current) => [...current, { id, title, completed: false }]);
    setInput("");

    requestAnimationFrame(() => {
      animate(`#task-${id}`, {
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 400,
        ease: "out(3)",
      });
    });
  }

  const completed = tasks.filter((task) => task.completed).length;

  return (
    <main className="app">
      <h1>My Task Tracker</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTask();
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="What's coming up?"
          aria-label="New task"
        />
        <button type="submit">Add Task</button>
      </form>

      <p>
        Completed: {completed} / {tasks.length}
      </p>

      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={(id) => {
              setTasks((current) =>
                current.map((task) =>
                  task.id === id
                    ? { ...task, completed: !task.completed }
                    : task,
                ),
              );
            }}
            onDelete={(id) => {
              setTasks((current) => current.filter((task) => task.id !== id));
            }}
          />
        ))}
      </ul>
    </main>
  );
}

export default App;

import { animate, stagger, splitText } from "animejs";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  function handleToggle() {
    // Press Down animation
    onToggle(task.id);
    animate(`#task-${task.id}`, {
      scale: [1, 0.96, 1],
      duration: 300,
      ease: "out(3)",
    });
  }
  function handleDelete() {
    // Animate Test
    animate(splitText("label", { words: false, chars: true }).chars, {
      y: [
        { to: "-1.75rem", ease: "outExpo", duration: 600 },
        { to: 0, ease: "outBounce", duration: 800, delay: 100 },
      ],

      rotate: {
        from: "-1turn",
        delay: 0,
      },
      delay: stagger(50),
      ease: "inOutCirc",
    });

    // Animate disappearing
    animate(`#task-${task.id}`, {
      rotate: 5,
      opacity: [1, 0],
      translateX: [0, 30],
      duration: 250,
      ease: "in(2)",
      delay: 2000,
      onComplete: () => onDelete(task.id),
    });
  }
  return (
    <li
      id={`task-${task.id}`}
      key={task.id}
      className={task.completed ? "completed" : ""}
    >
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
        />
        {task.title}
      </label>

      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

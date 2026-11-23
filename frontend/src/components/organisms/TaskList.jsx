import TaskItem from "../molecules/TaskItem";

export default function TaskList({ tasks, onToggle, onSave, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks yet. Add your first one above.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onSave={onSave}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
import { useState } from "react";
import Checkbox from "../atoms/Checkbox";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

export default function TaskItem({ task, onToggle, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function startEditing() {
    setTitle(task.title);
    setError("");
    setEditing(true);
  }

  async function handleSave(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      await onSave(task.id, { title });
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (editing) {
    return (
      <li className="task-item task-item-editing">
        <form className="task-edit" onSubmit={handleSave}>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-label="Task title"
            required
            autoFocus
          />
          <Button type="submit" disabled={saving}>
            Save
          </Button>
          <Button variant="secondary" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </form>
        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}
      </li>
    );
  }

  return (
    <li className="task-item">
      <Checkbox
        checked={task.done}
        onChange={() => onToggle(task)}
        aria-label={`Mark "${task.title}" as ${task.done ? "not done" : "done"}`}
      />

      <div className="task-body">
        <span className={task.done ? "task-title done" : "task-title"}>
          {task.title}
        </span>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      <div className="task-actions">
        <Button variant="secondary" onClick={startEditing}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </div>
    </li>
  );
}
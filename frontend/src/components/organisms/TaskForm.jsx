import { useState } from "react";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit({
        title,
        description: description.trim() || undefined,
      });
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <FormField
        id="task-title"
        label="New task"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to be done?"
        required
      />
      <FormField
        id="task-description"
        label="Description (optional)"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add task"}
      </Button>
    </form>
  );
}
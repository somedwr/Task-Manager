import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { createTask, deleteTask, getTasks, updateTask } from "../api/tasks";
import Button from "../components/atoms/Button";
import TaskForm from "../components/organisms/TaskForm";
import TaskList from "../components/organisms/TaskList";

export default function TasksPage() {
  const { token, user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await getTasks(token);
        if (!ignore) setTasks(data);
      } catch (err) {
        if (ignore) return;
        if (err.status === 401) logout();
        else setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [token, logout]);

  // Runs a request; if the token is rejected, log the user out.
  async function callApi(request) {
    try {
      return await request();
    } catch (err) {
      if (err.status === 401) logout();
      throw err;
    }
  }

  async function handleCreate(data) {
    const created = await callApi(() => createTask(token, data));
    setTasks((current) => [created, ...current]);
  }

  async function handleToggle(task) {
    setError("");
    try {
      const updated = await callApi(() =>
        updateTask(token, task.id, { done: !task.done })
      );
      setTasks((current) =>
        current.map((t) => (t.id === updated.id ? updated : t))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSave(id, data) {
    const updated = await callApi(() => updateTask(token, id, data));
    setTasks((current) => current.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this task?")) return;
    setError("");
    try {
      await callApi(() => deleteTask(token, id));
      setTasks((current) => current.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="tasks-page">
      <header className="tasks-header">
        <h1>My tasks</h1>
        <div>
          <span>{user?.email}</span>
          <Button variant="secondary" onClick={logout}>
            Log out
          </Button>
        </div>
      </header>

      <TaskForm onSubmit={handleCreate} />

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}
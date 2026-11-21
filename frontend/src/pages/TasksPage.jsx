import { useAuth } from "../context/useAuth";
import Button from "../components/atoms/Button";

export default function TasksPage() {
  const { user, logout } = useAuth();

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
      <p>Your tasks will appear here soon.</p>
    </main>
  );
}
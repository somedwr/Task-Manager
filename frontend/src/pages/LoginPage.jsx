import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/organisms/AuthForm";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(email, password) {
    const data = await loginUser(email, password);
    login(data.token, data.user);
    navigate("/tasks");
  }

  return (
    <main className="auth-page">
      <AuthForm title="Log in" submitLabel="Log in" onSubmit={handleLogin} />
      <p>
        No account yet? <Link to="/register">Register</Link>
      </p>
    </main>
  );
}
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/organisms/AuthForm";
import { registerUser, loginUser } from "../api/auth";
import { useAuth } from "../context/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleRegister(email, password) {
    await registerUser(email, password);
    const data = await loginUser(email, password);
    login(data.token, data.user);
    navigate("/tasks");
  }

  return (
    <main className="auth-page">
            <AuthForm
        title="Create an account"
        submitLabel="Register"
        onSubmit={handleRegister}
        passwordAutoComplete="new-password"
      />
      <p>
        Already registered? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
}
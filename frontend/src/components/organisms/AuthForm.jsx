import { useState } from "react";
import FormField from "../molecules/FormField";
import PasswordField from "../molecules/PasswordField";
import Button from "../atoms/Button";

export default function AuthForm({
  title,
  submitLabel,
  onSubmit,
  passwordAutoComplete = "current-password",
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>{title}</h1>

      <FormField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="email"
        required
      />

      <PasswordField
        id="password"
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete={passwordAutoComplete}
        required
      />

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? "Please wait..." : submitLabel}
      </Button>
    </form>
  );
}
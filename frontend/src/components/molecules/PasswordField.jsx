import { useState } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

export default function PasswordField({ id, label, error, ...inputProps }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="form-field">
      <Label htmlFor={id}>{label}</Label>

      <div className="password-wrapper">
        <Input id={id} {...inputProps} type={visible ? "text" : "password"} />
        <Button
          type="button"
          variant="secondary"
          onClick={() => setVisible((current) => !current)}
          aria-pressed={visible}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? "Hide" : "Show"}
        </Button>
      </div>

      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
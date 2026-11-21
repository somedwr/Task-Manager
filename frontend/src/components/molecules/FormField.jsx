import Label from "../atoms/Label";
import Input from "../atoms/Input";

export default function FormField({ id, label, error, ...inputProps }) {
  return (
    <div className="form-field">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...inputProps} />
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
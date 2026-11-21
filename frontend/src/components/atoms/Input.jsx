export default function Input({ id, ...rest }) {
  return <input id={id} className="input" {...rest} />;
}
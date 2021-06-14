import "./styles.css";

export const Button = (props) => {
  const { onClick, text, disabled } = props;
  return (
    <button
      disabled={disabled}
      className="button"
      onClick={onClick}
    >{text}</button>
  )
}
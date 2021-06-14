import "./styles.css"

export const TextInput = (props) => {
  const {type, onChange, placeholder} = props;

  return(
    <input
      className="text-input"
      type={type}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}
export const Select = (props) => {
  const { options } = props;

  return (
    <select>
      {options.map(elem => (
        <option>{elem}</option>
      ))}
    </select>
  )
}
import { TextField } from "@mui/material";

const Input = ({ isRequired = false, id, textLabel, name, inputType, reference }) => {
  return (
    <TextField
      margin="normal"
      required={isRequired}
      fullWidth
      id={id}
      label={textLabel}
      name={name}
      autoFocus
      type={inputType}
      inputRef={reference}
    />
  );
};

export default Input;

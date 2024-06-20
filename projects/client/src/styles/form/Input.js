import { TextField } from "@mui/material";

const Input = ({ isRequired = false, id, textLabel, name, inputType }) => {
  return (
    <TextField
      margin="normal"
      required={isRequired}
      fullWidth
      id={id}
      label={textLabel}
      name={name}
      // autoComplete
      autoFocus
      type={inputType}
    />
  );
};

export default Input;

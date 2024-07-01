import { TextField } from "@mui/material";

const Input = ({ isRequired = false, id, textLabel, name, inputType, reference, value, handleSearch }) => {
  return (
    <TextField
      margin="normal"
      required={isRequired}
      fullWidth
      id={id}
      variant="standard"
      label={textLabel}
      name={name}
      autoFocus
      type={inputType}
      inputRef={reference}
      defaultValue={value}
      onChange={handleSearch}
    />
  );
};

export default Input;

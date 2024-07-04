import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

const Input = ({
  isRequired = false,
  id,
  textLabel,
  name,
  inputType,
  reference,
  value,
  handleSearch,
  handleShowPassword,
  handleMouseDownPassword,
  showPassword,
}) => {
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
      type={inputType === "password" ? (showPassword ? "text" : "password") : inputType || "text"}
      inputRef={reference}
      defaultValue={value}
      onChange={handleSearch}
      InputProps={
        inputType === "password" && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword} onMouseDown={handleMouseDownPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }
      }
    />
  );
};

export default Input;

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectInput = ({ label, options, value, onChange, isRequired }) => {
  return (
    <FormControl fullWidth margin="normal" variant="standard">
      <InputLabel required={isRequired}>{label}</InputLabel>
      <Select value={value} defaultValue="" label={label} onChange={onChange}>
        {options?.map((item) => (
          <MenuItem value={item?.name}>{item?.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;

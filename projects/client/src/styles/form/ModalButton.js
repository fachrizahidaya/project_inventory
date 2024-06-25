import { Button, CircularProgress } from "@mui/material";

const ModalButton = ({ name, toggle, endIcon, loading }) => {
  return (
    <Button variant="contained" onClick={toggle} endIcon={endIcon}>
      {loading ? <CircularProgress color="inherit" /> : name}
    </Button>
  );
};

export default ModalButton;

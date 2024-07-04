import { Box, Button, CircularProgress, Typography } from "@mui/material";
import ModalView from "../container/ModalView";

const ConfirmationModal = ({ isOpen, toggle, objective, handleClose, onSubmit, isLoading }) => {
  return (
    <ModalView isOpen={isOpen} toggle={toggle}>
      <Typography variant="h6" component="h2">
        {`Are you sure want to ${objective}?`}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button onClick={handleClose} variant="outlined" sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="contained" sx={{ ml: 1 }}>
          {isLoading ? <CircularProgress /> : "Confirm"}
        </Button>
      </Box>
    </ModalView>
  );
};

export default ConfirmationModal;

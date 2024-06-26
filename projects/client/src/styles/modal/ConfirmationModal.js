import { Box, Button, Typography } from "@mui/material";
import ModalView from "../container/ModalView";

const ConfirmationModal = ({ isOpen, toggle, objective, handleClose, onSubmit }) => {
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
          Confirm
        </Button>
      </Box>
    </ModalView>
  );
};

export default ConfirmationModal;

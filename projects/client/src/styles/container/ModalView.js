import { Box, Modal } from "@mui/material";

const ModalView = ({ isOpen, toggle, children }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={isOpen} onClose={toggle}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default ModalView;

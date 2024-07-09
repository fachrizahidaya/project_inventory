import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import EmailInput from "../../../components/admin/landing/EmailInput";
import { useLoading } from "../../../hooks/useLoading";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { Snackbar } from "@mui/material";

const ForgotPassword = () => {
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const email = useRef();
  const navigate = useNavigate();

  const { isOpen: snackbarIsOpen, toggle: toggleSnackbar } = useDisclosure(false);

  const { isLoading: processIsLoading, toggle: toggleProcess } = useLoading(false);

  const openSnackbar = (value) => {
    toggleSnackbar();
    setSnackbarMessage(value);
  };

  const closeSnackbar = () => {
    toggleSnackbar();
    setSnackbarMessage(null);
  };

  const returnPreviousPageHandler = () => {
    navigate("/login");
  };

  const emailVerificationHandler = async () => {
    try {
      const req = {
        email: email.current.value,
      };

      toggleProcess();
      const res = await Axios.put(`http://localhost:8000/api/admin/auth/forgot-password`, req);
      openSnackbar(res.data?.message);
      toggleProcess();
    } catch (err) {
      console.log(err);
      openSnackbar(err?.response?.data?.err);
      toggleProcess();
    }
  };

  return (
    <>
      <EmailInput
        email={email}
        handleSendEmail={emailVerificationHandler}
        isLoading={processIsLoading}
        handleReturn={returnPreviousPageHandler}
      />
      <Snackbar open={snackbarIsOpen} autoHideDuration={3000} onClose={closeSnackbar} message={snackbarMessage} />
    </>
  );
};

export default ForgotPassword;

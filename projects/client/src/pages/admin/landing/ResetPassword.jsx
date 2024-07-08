import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

import PasswordInput from "../../../components/admin/landing/PasswordInput";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { useLoading } from "../../../hooks/useLoading";
import { Snackbar } from "@mui/material";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();
  const params = useParams();

  const { isOpen: snackbarIsOpen, toggle: toggleSnackbar } = useDisclosure(false);

  const { isLoading: processIsLoading, toggle: toggleProcess } = useLoading(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const mouseDownPasswordHandler = (event) => {
    event.preventDefault();
  };

  const showConfirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const mouseDownConfirmPasswordHandler = (event) => {
    event.preventDefault();
  };

  const openSnackbar = (value) => {
    toggleSnackbar();
    setSnackbarMessage(value);
  };

  const closeSnackbar = () => {
    toggleSnackbar();
    setSnackbarMessage(null);
  };

  const resetPasswordHandler = async () => {
    try {
      const req = {
        password: password.current.value,
        confirmPassword: confirmPassword.current.value,
      };
      const header = {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      };

      toggleProcess();
      const res = await Axios.patch(`http://localhost:8000/api/admin/auth/reset-password`, req, header);
      navigate("/login");
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
      <PasswordInput
        password={password}
        confirmPassword={confirmPassword}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        handleShowPassword={showPasswordHandler}
        handleShowConfirmPassword={showConfirmPasswordHandler}
        handleMouseDownPassword={mouseDownPasswordHandler}
        handleMouseDownConfirmPassword={mouseDownConfirmPasswordHandler}
        handleSubmit={resetPasswordHandler}
        isLoading={processIsLoading}
      />
      <Snackbar open={snackbarIsOpen} autoHideDuration={1500} onClose={closeSnackbar} message={snackbarMessage} />
    </>
  );
};

export default ResetPassword;

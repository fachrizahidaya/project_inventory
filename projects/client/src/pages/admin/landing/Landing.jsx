import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import { Snackbar } from "@mui/material";

import Login from "../../../components/admin/landing/Login";
import { login } from "../../../redux/admin";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { useLoading } from "../../../hooks/useLoading";

const Landing = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen: snackbarIsOpen, toggle: toggleSnackbar } = useDisclosure(false);

  const { isLoading: processIsLoading, toggle: toggleProcess } = useLoading(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const mouseDownPasswordHandler = (event) => {
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

  const loginHandler = async () => {
    try {
      const req = {
        email: email.current.value,
        password: password.current.value,
      };

      toggleProcess();
      const res = await Axios.post(`http://localhost:8000/api/admin/auth/login`, req);
      dispatch(
        login({
          id: res.data?.isAccountExist?.id,
          email: res.data?.isAccountExist?.email,
          isSuper: res.data?.isAccountExist?.isSuper,
        })
      );

      localStorage.setItem("admin_token", res.data?.token);
      navigate("/dashboard");
      toggleProcess();
    } catch (err) {
      console.log(err);
      openSnackbar(err.response?.data?.err);
      toggleProcess();
    }
  };

  return (
    <>
      <Login
        email={email}
        password={password}
        handleLogin={loginHandler}
        showPassword={showPassword}
        handleShowPassword={showPasswordHandler}
        handleMouseDownPassword={mouseDownPasswordHandler}
        isLoading={processIsLoading}
      />
      <Snackbar open={snackbarIsOpen} autoHideDuration={1500} onClose={closeSnackbar} message={snackbarMessage} />
    </>
  );
};

export default Landing;

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import Login from "../../../components/admin/landing/Login";
import { login } from "../../../redux/admin";

const Landing = () => {
  const [showPassword, setShowPassword] = useState(false);

  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const mouseDownPasswordHandler = (event) => {
    event.preventDefault();
  };

  const loginHandler = async () => {
    try {
      const req = {
        email: email.current.value,
        password: password.current.value,
      };

      const res = await Axios.post(`http://localhost:8000/api/admin/auth/login`, req);
      dispatch(
        login({
          id: res.data?.isAccountExist?.id,
          email: res.data?.isAccountExist?.email,
          isSuper: res.data?.isAccountExist?.isSuper,
        })
      );

      localStorage.setItem("admin_token", res.data?.token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Login
      email={email}
      password={password}
      handleLogin={loginHandler}
      showPassword={showPassword}
      handleShowPassword={showPasswordHandler}
      handleMouseDownPassword={mouseDownPasswordHandler}
    />
  );
};

export default Landing;

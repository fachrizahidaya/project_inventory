import "./App.css";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";

import Landing from "./pages/admin/landing/Landing";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Orders from "./pages/admin/order/Orders";
import Items from "./pages/admin/item/Items";
import Racks from "./pages/admin/rack/Racks";
import Users from "./pages/admin/user/Users";
import Categories from "./pages/admin/category/Categories";
import Rows from "./pages/admin/row/Rows";
import PageNotFound from "./styles/global/PageNotFound";
import { login } from "./redux/admin";
import Rack from "./pages/admin/rack/[id]";
import Row from "./pages/admin/row/[id";
import Item from "./pages/admin/item/[id]";
import Admins from "./pages/admin/admin/Admins";
import Divisions from "./pages/admin/division/Divisions";
import ForgotPassword from "./pages/admin/landing/ForgotPassword";
import ResetPassword from "./pages/admin/landing/ResetPassword";

const defaultTheme = createTheme();

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("admin_token");
  const { id } = useSelector((state) => state.admin.value);

  const adminHeaders = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  };

  const handleAdminKeepLogin = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/auth/keep-login`, adminHeaders);
      dispatch(
        login({
          id: res.data?.result?.id,
          email: res.data?.result?.email,
          isSuper: res.data?.result?.isSuper,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (!adminToken) {
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(() => {
    if (adminToken) {
      handleAdminKeepLogin();
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Landing />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admins />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/rack/:id" element={<Rack />} />
          <Route path="/row/:id" element={<Row />} />
          <Route path="/rack" element={<Racks />} />
          <Route path="/row" element={<Rows />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/item" element={<Items />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/user" element={<Users />} />
          <Route path="/division" element={<Divisions />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

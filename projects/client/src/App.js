import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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

const defaultTheme = createTheme();

function App() {
  const dispatch = useDispatch();
  const adminToken = localStorage.getItem("admin_token");
  const { id } = useSelector((state) => state.admin.value);

  const adminHeaders = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  };

  const handleAdminKeepLogin = async () => {
    try {
      const res = await Axios.get(`http://localhost:8000/api/admin/auth/`, adminHeaders);
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/rack" element={<Racks />} />
          <Route path="/row" element={<Rows />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/item" element={<Items />} />
          <Route path="/user" element={<Users />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

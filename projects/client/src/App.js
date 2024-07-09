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
import Rack from "./pages/admin/rack/[id]";
import Row from "./pages/admin/row/[id";
import Item from "./pages/admin/item/[id]";
import Admins from "./pages/admin/admin/Admins";
import Divisions from "./pages/admin/division/Divisions";
import ForgotPassword from "./pages/admin/landing/ForgotPassword";
import ResetPassword from "./pages/admin/landing/ResetPassword";
import RequireAuth from "./components/auth/RequireAuth";
import StoredAuth from "./components/auth/StoredAuth";

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

  const handleKeepLoginAdmin = async () => {
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

  useEffect(() => {
    if (adminToken) {
      handleKeepLoginAdmin();
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Landing />} />
          <Route
            path="/forgot-password"
            element={
              <StoredAuth>
                <ForgotPassword />
              </StoredAuth>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <StoredAuth>
                <ResetPassword />
              </StoredAuth>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <Admins />
              </RequireAuth>
            }
          />
          <Route
            path="/order"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route
            path="/rack/:id"
            element={
              <RequireAuth>
                <Rack />
              </RequireAuth>
            }
          />
          <Route
            path="/row/:id"
            element={
              <RequireAuth>
                <Row />
              </RequireAuth>
            }
          />
          <Route
            path="/rack"
            element={
              <RequireAuth>
                <Racks />
              </RequireAuth>
            }
          />
          <Route
            path="/row"
            element={
              <RequireAuth>
                <Rows />
              </RequireAuth>
            }
          />
          <Route
            path="/category"
            element={
              <RequireAuth>
                <Categories />
              </RequireAuth>
            }
          />
          <Route
            path="/item"
            element={
              <RequireAuth>
                <Items />
              </RequireAuth>
            }
          />
          <Route
            path="/item/:id"
            element={
              <RequireAuth>
                <Item />
              </RequireAuth>
            }
          />
          <Route
            path="/user"
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />
          <Route
            path="/division"
            element={
              <RequireAuth>
                <Divisions />
              </RequireAuth>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

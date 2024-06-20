import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import Landing from "./pages/admin/landing/Landing";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Orders from "./pages/admin/order/Orders";
import Items from "./pages/admin/item/Items";
import Racks from "./pages/admin/rack/Racks";
import Users from "./pages/admin/user/Users";
import Categories from "./pages/admin/category/Categories";

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/rack" element={<Racks />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/item" element={<Items />} />
          <Route path="/user" element={<Users />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

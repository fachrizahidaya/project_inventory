import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import Landing from "./pages/admin/landing/Landing";
import Dashboard from "./pages/admin/dashboard/Dashboard";

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

import { Navigate } from "react-router-dom";

const StoredAuth = ({ children }) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default StoredAuth;

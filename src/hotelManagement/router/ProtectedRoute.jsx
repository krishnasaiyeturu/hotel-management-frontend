/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("accessToken"); // Assuming you store a token in localStorage after sign-in

  return isAuthenticated ? children : <Navigate to="/admin/sign-in" />;
};

export default ProtectedRoute;

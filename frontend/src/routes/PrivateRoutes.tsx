import { Navigate } from "react-router";

export const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem("token");

  console.log(token);
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

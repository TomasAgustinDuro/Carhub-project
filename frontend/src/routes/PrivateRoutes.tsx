import { Navigate } from "react-router";
import { ReactNode } from "react";

interface PrivateRoutesProps {
  children: ReactNode;
}

export const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

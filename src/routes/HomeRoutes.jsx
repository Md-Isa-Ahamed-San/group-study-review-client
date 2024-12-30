/* eslint-disable react/prop-types */
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const HomeRoutes = ({ children }) => {
  const auth = useAuth();
console.log("auth inside homeroutes:",auth)
  // Check if the user is authenticated
  if (auth?.user) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, render the children
  return children;
};

export default HomeRoutes;

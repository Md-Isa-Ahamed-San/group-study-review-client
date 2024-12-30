import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { user } = useAuth();
  console.log("user: ", user);

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/authPanel" replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default PrivateRoutes;

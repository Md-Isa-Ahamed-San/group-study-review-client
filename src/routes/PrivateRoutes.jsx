import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../shared/Loading/Loading";

const PrivateRoutes = () => {
  const { user, loading } = useAuth();

  // Wait for the authentication state to resolve
  if (loading) {
    return <Loading />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/authPanel" replace />;
    // return <Outlet />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default PrivateRoutes;

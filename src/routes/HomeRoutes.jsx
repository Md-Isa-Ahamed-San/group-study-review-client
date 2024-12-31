import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../shared/Loading/Loading";

const HomeRoutes = () => {
  const { user, loading } = useAuth();

  // Wait for the authentication state to resolve
  if (loading) {
    return <Loading/>; // Show a loading spinner or message
  }

  // Redirect to home if authenticated
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Render child routes if not authenticated
  return <Outlet />;
};

export default HomeRoutes;

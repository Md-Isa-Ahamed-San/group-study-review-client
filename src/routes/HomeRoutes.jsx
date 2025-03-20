import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../shared/Loading/Loading";

const HomeRoutes = () => {
  const { user, loading } = useAuth();

  // Wait for authentication state
  if (loading) {
    console.log("loading inside home routes ");
    return <Loading />;
  }

  // Redirect authenticated users to their intended page
  if (user) {
    // return <Navigate to={intendedRoute} replace />;
    return <Outlet />;
  }

  // Render the child routes if not authenticated
  return <Outlet />;
};

export default HomeRoutes;

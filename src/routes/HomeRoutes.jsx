import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../shared/Loading/Loading";

const HomeRoutes = () => {
  const { user, loading,userData } = useAuth();
  const location = useLocation();

  // Wait for authentication state
  if (loading) {
    console.log("loading inside home routes ")
    return <Loading />;
  }

  // Get the previously stored intended route or fallback to "/"
  const intendedRoute = location.state?.from?.pathname || "/";
  console.log("🚀 ~ HomeRoutes ~ intendedRoute:", intendedRoute)

  // Redirect authenticated users to their intended page
  if (user) {
    // return <Navigate to={intendedRoute} replace />;
    return <Outlet />;
  }

  // Render the child routes if not authenticated
  return <Outlet />;
};

export default HomeRoutes;

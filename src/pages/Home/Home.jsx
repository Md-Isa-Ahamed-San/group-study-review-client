import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Home = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    logout();
  };
  return (
    <div>
      <p className="text-3xl">inside home page</p>
      <Link to="/dashboard">
      <button className="border-red-400 p-20 border">
        dashboard
      </button>
      </Link>
      <button className="border-red-400 p-20 border" onClick={handleLogout}>
        logout
      </button>
      <Link to="/authPanel">
        <button className="border-red-400 p-20 border">login</button>
      </Link>
    </div>
  );
};

export default Home;

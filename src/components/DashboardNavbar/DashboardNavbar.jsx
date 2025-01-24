/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import useTask from "../../hooks/useTask";
import useAuth from "../../hooks/useAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Home } from "@mui/icons-material";

const DashboardNavbar = ({ setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const { useFetchClassesById } = useTask();
  const { logout, user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: classData, isLoading, isError } = useFetchClassesById(classId);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    await logout();
    console.log("User logged out");
    navigate("/authPanel?mode=signin"); // Redirect to login after logout
  };

  return (
    <nav className="bg-gray-800 shadow-lg p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex gap-4 items-center">
        {/* Sidebar Toggle */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>

        {/* Logo and Class Name */}
        <div className="flex items-center space-x-4">
          <GraduationCap className="h-7 w-7 text-white" />
          <Link to="/dashboard" className="text-white text-2xl hover:underline">
            EduConnect
          </Link>

          {/* Class Name */}
          {classId &&
            classData &&
            classData?.data &&
            !isLoading &&
            !isError && (
              <Link
                to={`/dashboard/${classData.data._id}`}
                className="flex items-center"
              >
                <span className="text-white text-2xl mx-2">{">"}</span>
                <p className="text-blue-500 text-2xl hover:underline">
                  {classData.data.class_name}
                </p>
              </Link>
            )}
        </div>
      </div>

      {/* Menu Icon for Profile and Logout */}
      <div className="flex gap-4 justify-center items-center">
        {/* Home Icon */}
        <IconButton
          onClick={() => navigate("/")}
          className="flex items-center justify-center w-10 h-10 bg-gray-300 hover:bg-gray-600 text-white rounded-full transition-colors"
        >
          <Home className="text-white" />
        </IconButton>

        <p className="text-white">
          Welcome, <span className="text-blue-400">{user?.displayName}</span>{" "}
        </p>
        <div className="relative">
          <IconButton
            onClick={toggleMenu}
            className="flex items-center justify-center w-10 h-10 bg-gray-300 hover:bg-gray-600 text-white rounded-full transition-colors"
          >
            <AccountCircleIcon className="text-white" />
          </IconButton>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-20">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;


import { Book, GraduationCap, Settings, User } from "lucide-react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import useTask from "../../hooks/useTask";

const DashboardNavbar = ({ setIsSidebarOpen }) => {
  // Initialize useNavigate for navigation
  const navigate = useNavigate();
  const { classId } = useParams();
  console.log("id: ", classId);
  const { useFetchClassesById } = useTask();

  // Fetch class data using the ID
  const {
    data: classData,
    isLoading,
    isError,
    error,
  } = useFetchClassesById(classId);

  return (
    <nav className="bg-gray-800 shadow-lg p-4 flex flex-wrap justify-between items-center sticky top-0 z-10">
      <div className="flex gap-4">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="pl-8 "
        >
          <MenuIcon sx={{ color: "white", ml: 2 }} />
        </IconButton>
        <div className="flex items-center space-x-4">
  <GraduationCap className="h-7 w-7 text-white" />
  <Link to="/" className="flex items-center">
    <p className="text-white text-2xl hover:underline hover:underline-offset-2">
      EduConnect
    </p>
  </Link>

  {/* Conditionally render the class name with a ">" separator */}
  {classId && classData && classData.data && !isLoading && !isError && (
    <Link to={`/dashboard/${classData.data._id}`} className="flex items-center">
      <span className="text-white text-2xl mx-2">{">"}</span>
      <p className="text-blue-500 text-2xl hover:underline hover:underline-offset-2 transition duration-300">
        {classData.data.class_name}
      </p>
    </Link>
  )}
</div>

      </div>

      <div className="relative">
        <div className="flex items-center space-x-6">
          {/* Home Button with Name */}
          <button
            onClick={() => navigate("/")} // Navigate to the home page
            className="text-teal-400 hover:bg-teal-500 hover:text-white px-4 py-2 rounded-md transition duration-300 font-semibold"
          >
            Home
          </button>

          <a
            href="#"
            className="text-gray-300 hover:text-teal-400 transition duration-300"
          >
            <Book className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-teal-400 transition duration-300"
          >
            <User className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-teal-400 transition duration-300"
          >
            <Settings className="h-6 w-6" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;

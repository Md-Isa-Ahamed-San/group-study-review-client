import React, { useState, useEffect } from "react";
import {
  ArrowUpDown,
  Bell,
  Book,
  Search,
  Settings,
  Star,
  ThumbsUp,
  User,
  GraduationCap,
} from "lucide-react";

import { useParams, useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import useTask from "../../hooks/useTask";

const DashboardNavbar = ({ setIsSidebarOpen }) => {
  // Initialize useNavigate for navigation
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 shadow-lg p-4 flex flex-wrap justify-between items-center sticky top-0">
      <div className="flex gap-4">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="pl-8"
        >
          <MenuIcon sx={{ color: "white", ml: 2 }} />
        </IconButton>
        <div className="flex items-center space-x-4">
          <GraduationCap className="h-6 w-6 text-teal-400" />
          <div>
            {/* <h2 className="text-lg font-semibold text-white">{classData.class_name}</h2> */}
            {/* <p className="text-sm text-gray-400">{classData.description}</p> */}
          </div>
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

import React, { useState, useEffect } from "react";
import {
  ArrowUpDown,
  Bell,
  Book,
  Home,
  Search,
  Settings,
  Star,
  ThumbsUp,
  User,
  GraduationCap,
} from "lucide-react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
const DashboardNavbar = ({ setIsSidebarOpen }) => {
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
          <MenuIcon sx={{ color: "white", ml: 2 }} />{" "}
        </IconButton>
        <div className="flex items-center space-x-4">
          <GraduationCap className="h-6 w-6 text-teal-400" />
          <div>
            <h2 className="text-lg font-semibold text-white">className</h2>
            <p className="text-sm text-gray-400">subject</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center space-x-6">
          {/* {isMobile && ( */}
          <button
            //   onClick={toggleSidebar}
            className="text-teal-400 hover:text-teal-300 transition duration-300"
          >
            <Book className="h-6 w-6" />
          </button>
          {/* )} */}
          <a
            href="#"
            className="text-gray-300 hover:text-teal-400 transition duration-300"
          >
            <Home className="h-6 w-6" />
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

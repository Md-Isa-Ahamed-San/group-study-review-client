import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "Features",
      path: "#features",
    },
    {
      name: "How It Works",
      path: "#how-it-works",
    },
    {
      name: "For Students & Teachers",
      path: "#for-students-and-teachers",
    },
  ];

  const handleLogout = async () => {
    await logout();
    console.log("User logged out");
    setIsMenuOpen(false); // Close the menu after logout
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-400">
              Group Study Review
              </span>
            </Link>
          </div>
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          {/* User Info and Auth Links */}
          <div className="flex items-center space-x-4 relative">
            {user ? (
              <>
                <p>
                  Welcome, <span className="text-blue-400">{user?.displayName}</span>{" "}
                </p>
                {/* Menu Icon */}
                <button
                  onClick={toggleMenu}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                  aria-label="Menu"
                >
                  <FontAwesomeIcon icon={faBars} className="text-2xl" />
                </button>
                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-5 top-5 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg">
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-blue-400 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <FontAwesomeIcon icon={faUser} />
                          <span>Profile</span>
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full text-left px-4 py-2 text-gray-300 hover:text-red-400 transition-colors"
                        >
                          <FontAwesomeIcon icon={faSignOutAlt} />
                          <span>Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/authPanel?mode=signin"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/authPanel?mode=signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

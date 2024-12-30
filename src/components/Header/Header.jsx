import { Link } from "react-router-dom";
import { useContext } from "react";
import useAuth from "../../hooks/useAuth";


export default function Header() {
  const { user, logout } = useAuth()

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
  };

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-400">
                EduConnect
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-blue-400"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                
                <button
                  onClick={handleLogout}
                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/authPanel?mode=signin" className="text-gray-300 hover:text-blue-400">
                  Log In
                </Link>
                <Link to="/authPanel?mode=signup" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

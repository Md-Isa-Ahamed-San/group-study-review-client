import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { useLocation } from "react-router-dom";
const AuthPanel = () => {
  const [toggle, setToggle] = useState(true); // true = Login, false = Registration
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");
    if (mode === "signup") {
      setToggle(false);
    } else setToggle(true);
  }, [location]);
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 h-screen flex justify-center items-center">
      <motion.div
        key={toggle ? "login" : "register"}
        initial={{
          opacity: 0,
          x: toggle ? "100%" : "-100%", // Registration comes from the right, Login from the left
        }}
        animate={{ opacity: 1, x: 0 }} // Both forms slide to the center
        exit={{
          opacity: 0,
          x: toggle ? "-100%" : "100%", // Registration exits to the left, Login exits to the right
        }}
        transition={{ duration: 0.6 }} // Adjust the duration as needed
      >
        {toggle ? (
          <LoginForm onToggle={() => setToggle(false)} /> // Set toggle to false for Registration
        ) : (
          <RegistrationForm onToggle={() => setToggle(true)} /> // Set toggle to true for Login
        )}
      </motion.div>
    </div>
  );
};

export default AuthPanel;

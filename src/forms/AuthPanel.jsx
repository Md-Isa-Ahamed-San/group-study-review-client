
import { useState } from "react";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
const AuthPanel = () => {
    const [toggle, setToggle] = useState(true);
    return (
        <div className=" relative bg-gradient-to-br from-[#000000] via-[#10253C] to-[#242D39] h-screen flex justify-center items-center">
      <motion.div
        key={toggle ? "register" : "login"}
        initial={{
          opacity: 0,
          x: toggle ? "100%" : "-100%", // Registration comes from the right, Login from the left
        }}
        animate={{ opacity: 1, x: 0 }}  // Both forms slide to the center
        exit={{
          opacity: 0,
          x: toggle ? "-100%" : "100%", // Registration exits to the left, Login exits to the right
        }}
        transition={{ duration: 0.60 }}  // Adjust the duration as needed
      >
        {toggle ? (
          <LoginForm onToggle={() => setToggle(!toggle)} />
          
        ) : (
          <RegistrationForm onToggle={() => setToggle(!toggle)} />
        )}
      </motion.div>
    </div>
    );
};

export default AuthPanel;
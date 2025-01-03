import { useContext, useDebugValue } from "react";
import { AuthContext, TaskContext } from "../contexts/index";

const useTask = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) =>
    auth?.user ? "user logged in" : "user logged out"
  );
  return useContext(TaskContext);
};

export default useTask;

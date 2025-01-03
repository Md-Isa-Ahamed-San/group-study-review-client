import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {useState} from"react"
import { TaskContext } from "../contexts";

const TaskProvider = ({ children }) => {
  // Function to fetch classes by ID
  const [toggleCreateTaskModal, setToggleCreateTaskModal] = useState(false);
  const fetchClassesById = async (id) => {
    // console.log("id in task provider: ",id)
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/classes/${id}`);
    return data;
  };

  // Hook to use the fetchClassesById function with React Query
  const useFetchClassesById = (id) =>{
    // console.log("id inside useFetchClassesById: ",id)
    return useQuery({
      queryKey: ["classes", id],
      queryFn: () => fetchClassesById(id),
      enabled: !!id, // Ensures the query doesn't run if id is falsy
    });
  }


  return (
    <TaskContext.Provider value={{toggleCreateTaskModal, setToggleCreateTaskModal, useFetchClassesById }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { TaskContext } from "../contexts";
import useAuth from "../hooks/useAuth";

const TaskProvider = ({ children }) => {
  // Function to fetch classes by ID
  const [toggleCreateTaskModal, setToggleCreateTaskModal] = useState(false);
  const { userData } = useAuth();
  const fetchClassesById = async (id) => {
    // console.log("id in task provider: ",id)
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/classes/${id}?userId=${userData._id}`
    );
    return data;
  };

  // fetching all the tasks of a class
  const useFetchClassesById = (id) => {
    // console.log("id inside useFetchClassesById: ",id)
    return useQuery({
      queryKey: ["classes", id],
      queryFn: () => fetchClassesById(id),
      enabled: !!id, // Ensures the query doesn't run if id is falsy
    });
  };
  const submitTask = async ({ task_id, userId, document }) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/submissions`,
      {
        task_id,
        userId,
        document,
      }
    );
    console.log("data inside sibmit task : ", submitTask);
    return data;
  };

  const useSubmitTask = () =>
    useMutation({
      mutationFn: ({ task_id, userId, document }) =>
        submitTask({ task_id, userId, document }),
    });

  return (
    <TaskContext.Provider
      value={{
        toggleCreateTaskModal,
        setToggleCreateTaskModal,
        useFetchClassesById,
        useSubmitTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

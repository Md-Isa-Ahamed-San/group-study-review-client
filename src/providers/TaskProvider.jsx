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

  const updateSubmitTask = async ({ document, submission_id,userId,taskId }) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/submissions`, {
        document, submission_id ,userId,taskId
      });

      return response.data; 
    } catch (error) {
      console.error("Error updating submission:", error);
      throw new Error("Server error during submission update.");
    }
  };

  // Custom hook to use the mutation for updating the submission
  const useUpdateSubmitTask = () => {
    return useMutation({
      mutationFn: ({ document, submission_id,userId,taskId }) =>
        updateSubmitTask({ document, submission_id ,userId,taskId}),
    });
  };

  const getAllSubmissions = async (taskId) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/submissions/${taskId}`
    );
    return data;
  };

  const useGetAllSubmissions = (taskId) =>
    useQuery({
      queryKey: ["submissions", taskId],
      queryFn: () => getAllSubmissions(taskId),
      enabled: !!taskId, // Ensure the query only runs when taskId is truthy
    });

  return (
    <TaskContext.Provider
      value={{
        toggleCreateTaskModal,
        setToggleCreateTaskModal,
        useFetchClassesById,
        useSubmitTask,
        useGetAllSubmissions,
        useUpdateSubmitTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

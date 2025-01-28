/* eslint-disable react/prop-types */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { TaskContext } from "../contexts";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";
const TaskProvider = ({ children }) => {
  // Function to fetch classes by ID
  const [toggleCreateTaskModal, setToggleCreateTaskModal] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);
  const { userData } = useAuth();
  const { api } = useAxios();
  console.log("userData: ", userData);
  const fetchClassesById = async (id) => {
    // console.log("id in task provider: ",id)
    const { data } = await api.get(
      `${import.meta.env.VITE_BASE_URL}/classes/${id}?userId=${
        userData.user._id
      }`
    );
    // console.log(" fetchClassesById: ",data)
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
  const createTask = async (data) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_BASE_URL}/task`,
        data
      );
      // Return the full response object or just the data depending on your needs
      return response; // If you need status and metadata
      // return response.data; // If you only care about the response body
    } catch (error) {
      console.error("Error in createTask:", error);
      throw error; // Throw the error to be caught by the mutation
    }
  };

  const useCreateTask = () =>
    useMutation({
      mutationFn: (data) => createTask(data),
    });

  const deleteTask = async (taskId) => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_BASE_URL}/task/${taskId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error in delete task:", error);
      throw error;
    }
  };

  const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: deleteTask,
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
      onError: (error) => {
        console.error("Failed to delete task:", error);
      },
    });
  };

  const submitTask = async ({ task_id, userId, document }) => {
    const { data } = await api.post(`${BASE_URL}/submissions`, {
      task_id,
      userId,
      document,
    });
    console.log("data inside sibmit task : ", submitTask);
    return data;
  };

  const useSubmitTask = () =>
    useMutation({
      mutationFn: ({ task_id, userId, document }) =>
        submitTask({ task_id, userId, document }),
    });

  const updateSubmitTask = async ({
    document,
    submission_id,
    userId,
    taskId,
  }) => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_BASE_URL}/submissions`,
        {
          document,
          submission_id,
          userId,
          taskId,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating submission:", error);
      throw new Error("Server error during submission update.");
    }
  };

  // Custom hook to use the mutation for updating the submission
  const useUpdateSubmitTask = () => {
    return useMutation({
      mutationFn: ({ document, submission_id, userId, taskId }) =>
        updateSubmitTask({ document, submission_id, userId, taskId }),
    });
  };

  const getAllSubmissions = async (taskId) => {
    const { data } = await api.get(`${BASE_URL}/submissions/${taskId}`);
    return data;
  };

  const useGetAllSubmissions = (taskId) =>
    useQuery({
      queryKey: ["submissions", taskId],
      queryFn: () => getAllSubmissions(taskId),
      enabled: !!taskId,
    });

  const upvoteToggle = async ({ submissionId, userType, userId }) => {
    try {
      const response = await api.patch(`${BASE_URL}/submissions/upvote`, {
        submissionId,
        userType,
        userId,
      });

      return response.data;
    } catch (error) {
      console.error("Error toggling upvote:", error);

      // Throw a custom error message based on the response, or the default error message
      const errorMessage =
        error.response?.data?.message || "Failed to toggle upvote";
      throw new Error(errorMessage);
    }
  };
  const useUpvoteToggle = () => {
    const mutation = useMutation({
      mutationFn: upvoteToggle,
    });

    return { upvoteToggleMutation: mutation };
  };

  const fetchFeedbacks = async (submissionId) => {
    console.log("submission id: ", submissionId);
    if (!submissionId) throw new Error("Submission ID is required");
    const { data } = await api.get(`${BASE_URL}/feedbacks`, {
      params: { submissionId },
    });
    return data;
  };

  const useFetchFeedbacks = ({ submissionId }) =>
    useQuery({
      queryKey: ["feedbacks", submissionId],
      queryFn: () => fetchFeedbacks(submissionId),
      enabled: !!submissionId,
    });

  const postFeedback = async ({ submissionId, content, user_id }) => {
    if (!submissionId || !content || !user_id)
      throw new Error("Submission ID and content are required");

    const { data } = await api.post(`${BASE_URL}/feedbacks`, {
      submission_id: submissionId,
      content,
      user_id,
    });
    return data;
  };
  const usePostFeedback = () => {
    return useMutation({
      mutationFn: postFeedback,
    });
  };
  return (
    <TaskContext.Provider
      value={{
        toggleCreateTaskModal,
        setToggleCreateTaskModal,
        useFetchClassesById,
        useCreateTask,
        useDeleteTask,
        useSubmitTask,
        useGetAllSubmissions,
        useUpdateSubmitTask,
        useUpvoteToggle,
        useFetchFeedbacks,
        usePostFeedback,
        selectedSubmissionId,
        setSelectedSubmissionId,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

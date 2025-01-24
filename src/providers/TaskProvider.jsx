import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { TaskContext } from "../contexts";
import useAuth from "../hooks/useAuth";
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";
const TaskProvider = ({ children }) => {
  // Function to fetch classes by ID
  const [toggleCreateTaskModal, setToggleCreateTaskModal] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);
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
    const { data } = await axios.post(`${BASE_URL}/submissions`, {
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
      const response = await axios.patch(
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
    const { data } = await axios.get(`${BASE_URL}/submissions/${taskId}`);
    return data;
  };

  const useGetAllSubmissions = (taskId) =>
    useQuery({
      queryKey: ["submissions", taskId], // Include userId in the query key
      queryFn: () => getAllSubmissions(taskId),
      enabled: !!taskId, // Ensure query runs only when both are truthy
    });

  const upvoteToggle = async ({ submissionId, userType, userId }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/submissions/upvote`, {
        submissionId,
        userType,
        userId,
      });

      return response.data; // Axios directly provides the data property from the response
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
    const { data } = await axios.get(`${BASE_URL}/feedbacks`, {
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

    const { data } = await axios.post(`${BASE_URL}/feedbacks`, {
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

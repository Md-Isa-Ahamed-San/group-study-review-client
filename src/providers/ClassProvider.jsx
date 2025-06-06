import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { ClassContext } from "../contexts";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
const ClassProvider = ({ children }) => {
  const { user } = useAuth();
  console.trace(" ClassProvider ~ user:", user)
  const [toggleClassCreateModal, setToggleClassCreateModal] = useState(false);
  const [toggleJoinClassModal, setToggleJoinClassModal] = useState(false);
  const { api } = useAxios();
  const fetchClasses = async () => {
    const { data } = await api.get(
      `${import.meta.env.VITE_BASE_URL}/classes/user/${user?.email}`
    );
    return data;
  };

  const useFetchClasses = () =>
    useQuery({
      queryKey: ["users", user?.email],
      queryFn: fetchClasses,
    });

  const createClass = async (class_name, description, created_by) => {
    const { data } = await api.post(
      `${import.meta.env.VITE_BASE_URL}/classes`,
      {
        class_name,
        description,
        created_by,
      }
    );
    return data;
  };
  const useCreateClass = () =>
    useMutation({
      mutationFn: ({ class_name, description, created_by }) =>
        createClass(class_name, description, created_by),
    });
  const deleteClass = async (classId) => {
    const { data } = await api.delete(
      `${import.meta.env.VITE_BASE_URL}/classes/${classId}`
    );
    return data;
  };
  const useDeleteClass = () =>
    useMutation({
      mutationFn: (classId) => deleteClass(classId),
    });

  const joinClass = async (_id, classCode) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_BASE_URL}/classes/join`,
        {
          class_code: classCode,
          id: _id,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to join class");
    }
  };

  const useJoinClass = () =>
    useMutation({
      mutationFn: ({ _id, classCode }) => joinClass(_id, classCode),
    });

  const fetchFeedbacks = async (email) => {
    if (!email) throw new Error("User email is required");
    const response = await fetch(`/api/feedbacks?email=${email}`);
    if (!response.ok) {
      throw new Error("Failed to fetch feedbacks");
    }
    return response.json();
  };

  const useFetchFeedbacks = (user) => {
    return useQuery({
      queryKey: ["feedbacks", user?.email],
      queryFn: () => fetchFeedbacks(user?.email),
      enabled: !!user?.email, // Only run the query if user email exists
    });
  };

  const changeRole = async ({ userId, classCode, creator }) => {
    console.log("changeRole: ", userId, classCode);
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_BASE_URL}/classes/${classCode}/change-role`,
        {
          userId,
          creator,
        }
      );
      console.log("response in changeRole: ", response);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to join class");
    }
  };

  const useChangeRole = () =>
    useMutation({
      mutationFn: ({ userId, classCode, creator }) =>
        changeRole({ userId, classCode, creator }),
    });

  const fetchUserProfile = async () => {
    const { data } = await api.get(
      `${import.meta.env.VITE_BASE_URL}/user/profile/${user?.email}`
    );
    return data;
  };

  const useFetchUserProfile = () =>
    useQuery({
      queryKey: ["userProfile", user?.email],
      queryFn: () => fetchUserProfile(user?.email),
      enabled: !!user?.email,
    });
console.log("user.emaol: ",user?.email)
  return (
    <ClassContext.Provider
      value={{
        toggleJoinClassModal,
        setToggleJoinClassModal,
        toggleClassCreateModal,
        setToggleClassCreateModal,
        useCreateClass,
        useDeleteClass,
        useFetchClasses,
        useJoinClass,
        useChangeRole,
        useFetchUserProfile,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export default ClassProvider;

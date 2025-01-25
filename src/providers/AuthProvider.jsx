/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { AuthContext } from "../contexts";
import auth from "../firebase/firebase";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxios from "../hooks/useAxios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //firebase user details
  const [userData, setUserData] = useState({}); //mongodb user details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { api } = useAxios();
  console.log("user on firebase: ", user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const {
    data,
    isLoading: userDataLoading,
    error: userDataError,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/${user?.email}`
      );
      console.log("user on mongo: ", data);
      setUserData(data);
      return data;
    },
    enabled: !!user?.email, // Fetch only if email exists
  });

  const signUp = async (email, password) => {
    setError(null);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUsername = async (userProfile, username) => {
    if (userProfile) {
      return updateProfile(userProfile, { displayName: username });
    }
    throw new Error("User profile is undefined.");
  };

  const login = async (email, password) => {
    setError(null);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setError(null);
    setUserData({});
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user, //firebase user details
        userData, //mongodb user details
        setUserData,
        loading: loading || userDataLoading,
        error: error || userDataError,
        signUp,
        login,
        logout,
        updateUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

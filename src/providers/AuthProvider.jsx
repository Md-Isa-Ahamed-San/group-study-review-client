/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { AuthContext } from "../contexts";
import auth from "../firebase/firebase";
import { useQuery, useMutation } from "@tanstack/react-query";
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
  const [userData, setUserData] = useState(null); //mongodb user details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { api } = useAxios();
  console.log("user on firebase: ", user);
  console.log("userData and token from mongodb and server: ", userData);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (!userData) {
      setUser(null);
    }
  }, [userData]);

  const fetchUserData = async (email) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user/${email}`
    );
    console.log("user on mongo: ", data);
    return data;
  };

  // Use the useMutation hook directly
  //here i am not return the useMutation thats why i
  //have to use fetchUserDataMutation little bit different which is inside login form and reg form
  const fetchUserDataMutation = useMutation({
    mutationFn: fetchUserData,
    onSuccess: (data) => {
      setUserData(data); // Update state with the fetched user data
    },
    onError: (error) => {
      console.error("Error fetching user data:", error);
    },
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
    setUserData();
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user, //firebase user details
        userData, //mongodb user details
        setUserData,
        loading: loading,
        error: error,
        signUp,
        login,
        logout,
        updateUsername,
        fetchUserDataMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

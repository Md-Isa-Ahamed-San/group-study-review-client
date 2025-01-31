import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "../contexts";
import auth from "../firebase/firebase";
import useAxios from "../hooks/useAxios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user details
  const [userData, setUserData] = useState(null); // MongoDB user details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { api } = useAxios();

  console.log("Firebase user: ", user);
  console.log("MongoDB userData: ", userData);

  // Handle Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Retrieve userData from localStorage when user is set
  useEffect(() => {
    if (user && !userData) {
      const storedUserData = localStorage.getItem("userData");

      if (storedUserData) {
        console.log("Retrieving userData from localStorage...");
        setUserData(JSON.parse(storedUserData));
      }
    }
  }, [user, userData]); // Only runs when `user` or `userData` changes

  const fetchUserData = async (email) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user/${email}`
    );
    console.log("Fetched userData from MongoDB: ", data);
    return data;
  };

  const fetchUserDataMutation = useMutation({
    mutationFn: fetchUserData,
    onSuccess: (data) => {
      setUserData(data);
      localStorage.setItem("userData", JSON.stringify(data)); // Store userData in localStorage
    },
    onError: (error) => {
      console.error("Error fetching userData:", error);
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
    setUserData(null);
    localStorage.removeItem("userData"); // Clear userData from localStorage
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user, // Firebase user details
        userData, // MongoDB user details
        setUserData,
        loading,
        error,
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

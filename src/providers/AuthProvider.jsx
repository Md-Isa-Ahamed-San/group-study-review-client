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

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user details
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  }); //! Previously i set the initial value to NULL which caused
  //!  userData undefined for a few moments on page refresh which cause pb on jwt token implementation.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Firebase user: ", user);
  console.log("MongoDB userData: ", userData);

  // Handle Firebase Auth State
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch userData when user logs in
  const fetchUserData = async (email) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/${email}`
      );
      console.log("Fetched userData from MongoDB: ", data);
      // setUserData(data);
      // localStorage.setItem("userData", JSON.stringify(data)); //! this causing bug.setting user after log out
      return data;
    } catch (error) {
      console.error("Error fetching userData:", error);
      throw error;
    }
  };

  // Fetch userData when Firebase user changes
  useEffect(() => {
    if (user && !userData) {
      fetchUserData(user.email);
    }
  }, [user, userData]);
  const fetchUserDataMutation = useMutation({
    mutationFn: (email) => fetchUserData(email),
  });

  const signUp = async (email, password) => {
    setError(null);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUsername = async (userProfile, username) => {
    if (!userProfile) throw new Error("User profile is undefined.");
    return updateProfile(userProfile, { displayName: username });
  };

  const login = async (email, password) => {
    setError(null);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setError(null);
    setUserData(null);
    localStorage.removeItem("userData"); //! i am setting mongoDB user data on local storage so i must remove these when logout happens
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
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

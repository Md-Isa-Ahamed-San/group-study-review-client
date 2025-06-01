/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
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


// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children, firebaseAuth }) => { // Pass initialized Firebase auth
  const [user, setUser] = useState(null); // Firebase user details
  const [userData, setUserData] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userData");
      try {
        return storedUser ? JSON.parse(storedUser) : null;
      } catch (e) {
        console.error("Error parsing stored userData:", e);
        localStorage.removeItem("userData");
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(true); // Unified loading state
  const [authError, setAuthError] = useState(null);

  const queryClient = useQueryClient(); // For potential cache invalidation if needed

  // console.log("Firebase auth object used:", firebaseAuth);
  // console.log("Current Firebase user state:", user);
  // console.log("Current MongoDB userData state:", userData);
  // console.log("Current Loading state:", loading);

  // Function to fetch user data from MongoDB
  const fetchUserDataFromAPI = async (email) => {
    if (!email) {
      // console.log("fetchUserDataFromAPI: No email provided.");
      return null;
    }
    // console.log(`fetchUserDataFromAPI: Fetching data for email: ${email}`);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/${email}`
      );
      // console.log("fetchUserDataFromAPI: Successfully fetched userData from MongoDB:", data);
      return data;
    } catch (error) {
      console.error("fetchUserDataFromAPI: Error fetching userData:", error.response?.data || error.message);
      // Do not set global authError here, let mutation handle its own error state
      throw error; // Re-throw for useMutation's onError
    }
  };

  // Mutation for fetching user data
  const fetchUserDataMutation = useMutation({
    mutationFn: fetchUserDataFromAPI,
    onSuccess: (data) => {
      // console.log("fetchUserDataMutation onSuccess: Data received:", data);
      if (data) {
        setUserData(data);
        if (typeof window !== "undefined") {
          localStorage.setItem("userData", JSON.stringify(data));
        }
      } else {
        // Handle case where API returns no data for a valid user (e.g., new user not yet in MongoDB)
        setUserData(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("userData");
        }
        // console.log("fetchUserDataMutation onSuccess: No data returned, clearing userData.");
      }
      setAuthError(null); // Clear previous errors on successful fetch
    },
    onError: (error) => {
      console.error("fetchUserDataMutation onError:", error);
      setAuthError(error.message || "Failed to fetch user details.");
      setUserData(null); // Clear userData on error
      if (typeof window !== "undefined") {
        localStorage.removeItem("userData");
      }
    },
    // onSettled: () => {
      // console.log("fetchUserDataMutation onSettled: Mutation finished.");
      // setLoading(false); // Loading is handled more globally by onAuthStateChanged
    // }
  });

  // Handle Firebase Auth State Changes
  useEffect(() => {
    if (!firebaseAuth) {
      console.error("AuthProvider: Firebase auth object is not provided or undefined.");
      setLoading(false);
      return;
    }

    setLoading(true); // Start loading when the effect runs
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      // console.log("onAuthStateChanged: currentUser:", currentUser);
      setUser(currentUser);
      setAuthError(null); // Clear any previous auth errors

      if (currentUser) {
  
        if (!userData || userData.email !== currentUser?.email) {

          try {
            await fetchUserDataMutation.mutateAsync(currentUser?.email);
          } catch (e) {
         
            console.error("onAuthStateChanged: Error during mutateAsync:", e);
          } finally {
            setLoading(false); 
          }
        } else {
         
          setLoading(false); 
        }
      } else {
  
        setUserData(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("userData");
        }
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      // console.log("AuthProvider: Unsubscribing from onAuthStateChanged.");
      unsubscribe();
    };
  }, [firebaseAuth]); // Rerun if firebaseAuth instance changes (should be rare)

  const signUp = async (email, password, displayName) => {
    if (!firebaseAuth) throw new Error("Firebase auth not initialized.");
    setAuthError(null);
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
         // Update local Firebase user state immediately
        setUser(prevUser => ({...prevUser, ...userCredential.user, displayName}));
      }
      // onAuthStateChanged will handle fetching userData for the new user
      // console.log("signUp: Success for", email);
      return userCredential;
    } catch (error) {
      console.error("signUp Error:", error);
      setAuthError(error.message);
      setLoading(false); 
      throw error;
    }

  };

  const updateUsername = async (username) => {
    if (!firebaseAuth || !firebaseAuth.currentUser) {
      throw new Error("User not logged in or Firebase auth not initialized.");
    }
    setAuthError(null);
  
    try {
      await updateProfile(firebaseAuth.currentUser, { displayName: username });
     
      setUser((prevUser) => prevUser ? { ...prevUser, displayName: username } : null);

    } catch (error) {
      console.error("updateUsername Error:", error);
      setAuthError(error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    if (!firebaseAuth) throw new Error("Firebase auth not initialized.");
    setAuthError(null);
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
   
      return userCredential;
    } catch (error) {
      console.error("login Error:", error);
      setAuthError(error.message);
      setLoading(false); 
      throw error;
    }
   
  };

  const logout = async () => {
    if (!firebaseAuth) throw new Error("Firebase auth not initialized.");
    setAuthError(null);
    setLoading(true); 
    try {
      await signOut(firebaseAuth);
      
      queryClient.clear(); // Optionally clear react-query cache on logout
    } catch (error) {
      console.error("logout Error:", error);
      setAuthError(error.message);
      throw error; 
    }
  };

  const contextValue = {
    user, 
    userData, 
    loading,
    authError,
    setUserData,
    signUp,
    login,
    logout,
    updateUsername,
    fetchUserData: fetchUserDataMutation.mutateAsync,
    isFetchingUserData: fetchUserDataMutation.isPending,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    {loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column", // Align items vertically
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f0f2f5", // A light background color
            fontFamily: "Arial, sans-serif",
          }}
        >
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .spinner {
                border: 6px solid #f3f3f3; /* Light grey */
                border-top: 6px solid #3498db; /* Blue */
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin-bottom: 20px; /* Space between spinner and text */
              }
            `}
          </style>
          <div className="spinner"></div>
          <p style={{ fontSize: "1.2rem", color: "#333" }}>
            Preparing your experience...
          </p>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
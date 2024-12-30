/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { AuthContext } from "../contexts";
import auth from "../firebase/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("inside auth provider USER: ", user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.email]);

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
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, signUp, login, logout, updateUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import { useState,useEffect,useCallback } from "react";
import { AuthContext } from "../contexts";

import auth from "../firebase/firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign up function
  const signUp = useCallback(async (email, password, username) => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userProfile = userCredential.user;
      await updateProfile(userProfile, { displayName: username });
      console.log("🚀 ~ signUp ~ user:", userProfile);
      return userProfile;
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Log in function
  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("🚀 ~ login ~ user:", user);
      return user;
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Log out function
  const logout = useCallback(async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    }
  }, []);
  // const { user, loading, error, signUp, login, logout } = useAuth();
  return (
    <AuthContext.Provider
      value={{ user, loading, error, signUp, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

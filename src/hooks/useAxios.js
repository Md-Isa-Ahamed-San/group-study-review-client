import axios from "axios";
import { useEffect } from "react";
import { api } from "../api/api";
import useAuth from "./useAuth";

const useAxios = () => {
  const { userData, setUserData, logout } = useAuth();

  useEffect(() => {
    if (!userData?.token?.authToken) {
      console.log("userData is not ready, skipping interceptor setup.");
      return;
    }

    console.log("Setting up interceptors with userData:", userData);

    // Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (userData?.token?.authToken) {
          config.headers.Authorization = `Bearer ${userData.token.authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        console.log("Error in useAxios:", error);

        // ✅ FIXED: Proper check for refresh token expiration
        if (error.response?.data?.code === "TOKEN_EXPIRED" && !originalRequest._retry) {
          console.log("Refresh token expired. Logging out user.");
          logout(); // ✅ Ensures user is logged out when refresh token expires
          return Promise.reject(error);
        }

        if (error.response?.data?.message === "Invalid or Expired Token." && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = userData?.token?.refreshToken;
            if (!refreshToken) throw new Error("Refresh token is missing.");

            const response = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            console.log("Response after getting new refresh token:", response);
            const { authToken, refreshToken: newRefreshToken } = response.data.token;

            // ✅ FIXED: Ensure new tokens are properly set before retrying
            setUserData((prev) => ({
              ...prev,
              token: { authToken, refreshToken: newRefreshToken },
            }));

            console.log("Got new Token..");

            // ✅ FIXED: Set new token in the request before retrying
            originalRequest.headers.Authorization = `Bearer ${authToken}`;
            return axios(originalRequest);
          } catch (error) {
            console.error("Failed to refresh token:", error);
            logout(); // ✅ Ensure user logs out if token refresh fails
            throw error;
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [userData, setUserData]);

  return { api };
};

export default useAxios;

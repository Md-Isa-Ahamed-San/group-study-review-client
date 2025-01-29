import { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts";
import { api } from "../api/api";
import useAuth from "./useAuth";

const useAxios = () => {
  const context = useAuth();
  // Get userData and setUserData from AuthContext
  //   const userData = context?.userData || {};
  const userData = context?.userData;

  const setUserData = context?.setUserData;
  console.log("🚀 ~ useAxios ~ UserData:", userData);

  useEffect(() => {
    // Only set up interceptors if userData is populated
    if (!userData?.token?.authToken) {
      console.log("userData is not ready, skipping interceptor setup.");
      return;
    }

    console.log("Setting up interceptors with userData:", userData);

    // Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = userData?.token?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
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

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = userData?.token?.refreshToken;
            if (!refreshToken) {
              throw new Error("Refresh token is missing.");
            }
            console.log("gggggggggggggggggggg");
            const response = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const { authToken, refreshToken: newRefreshToken } = response.data;

            // Update tokens in the AuthContext
            setUserData({
              ...userData,
              token: {
                authToken,
                refreshToken: newRefreshToken,
              },
            });

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${authToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            throw refreshError;
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount or when userData changes
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [userData, setUserData]);

  return { api };
};
export default useAxios;

import type { AxiosInstance } from "axios";
import axios from "axios";
import { router } from "expo-router";

import { signIn, useAuth } from "~/core/auth";
import { getToken, removeToken } from "~/core/auth/utils";
import { getItem, storage } from "~/core/storage";

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    config.baseURL = storage.getString("base_url");
    const token = getToken();
    if (token) {
      if (token?.access) {
        config.headers.Authorization = `Bearer ${token?.access}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If the error status is 401 and there is no originalRequest._retry flag,
    // if (error.response.status === 401) {
    //   console.log('In');

    // }
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const baseURL = storage.getString("base_url");
        const tokenString = storage.getString("token");

        if (tokenString !== undefined) {
          const token = JSON.parse(tokenString);
          if (token.refresh) {
            try {
              const response = await axios.post(`${baseURL}/api/user/refresh`, {
                refresh: token?.refresh,
              });
              const { access, refresh } = response.data;
              signIn({
                access: access,
                refresh: refresh,
                first_name: token.first_name,
                last_name: token.last_name,
                email: token.email,
              });
              // Retry the original request with the new token
              originalRequest.headers.Authorization = `Bearer ${access}`;
              return axios(originalRequest);
            } catch (error) {
              console.log("failed to get new tokens");
              console.log(error.response.status);
            }
          } else {
            router.navigate("/login");
          }
        } else {
          router.navigate("/login");
        }
      } catch (error) {
        console.log("refresh failed");
        removeToken();
        router.navigate("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

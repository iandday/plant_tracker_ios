import type { AxiosInstance } from "axios";
import axios from "axios";
import { router } from "expo-router";

import { signIn, useAuth } from "~/core/auth";
import { getToken, removeToken } from "~/core/auth/utils";
import { getItem, storage } from "~/core/storage";

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const baseURL = storage.getString("base_url");
    config.baseURL = baseURL;
    console.log(baseURL);
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
    console.log(error);
    console.log(error.response.status);
    // If the error status is 401 and there is no originalRequest._retry flag,
    // if (error.response.status === 401) {
    //   console.log('In');

    // }
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = useAuth.use.token();

        const baseURL = getItem<string | undefined>("base_url");
        const response = await axios.post(baseURL + "/user/renew", {
          refresh_token: token?.refresh,
        });
        const { access_token, refresh_token, user } = response.data;
        signIn({
          access: access_token,
          refresh: refresh_token,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        });

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axios(originalRequest);
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

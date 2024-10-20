import { config } from "@/config";
import {
  getAccessToken,
  removeFromStorage,
  saveTokenStorage,
} from "@/shared/helpers/tokens";
import axios, { CreateAxiosDefaults } from "axios";

const options: CreateAxiosDefaults = {
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const api = axios.create(options);
export const authApi = axios.create(options);

authApi.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

authApi.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      error?.response?.status === 401 ||
      errorCatch(error) === "jwt expired" ||
      (errorCatch(error) === "jwt must be provided" &&
        error.config &&
        !error.config._isRetry)
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await api.get("/auth/refresh");
        if (response.data.access_token)
          saveTokenStorage(response.data.access_token);

        return authApi.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "jwt expired") {
          removeFromStorage();
        }
      }
    }
    throw error;
  },
);

export const errorCatch = (error: any): string => {
  const message = error.response?.data?.message;

  return message
    ? typeof error.response?.data?.message === "object"
      ? message[0]
      : message
    : error.message;
};

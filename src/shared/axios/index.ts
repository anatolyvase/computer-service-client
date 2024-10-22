import { config } from "@/config";
import {
  getAccessToken,
  removeFromStorage,
  saveTokenStorage,
} from "@/shared/helpers/tokens";
import { isArray } from "@nextui-org/shared-utils";
import axios, { AxiosError, CreateAxiosDefaults } from "axios";

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
        if (errorCatch(error as AxiosError<ErrorResponse>) === "jwt expired") {
          removeFromStorage();
        }
      }
    }
    throw error;
  },
);

type ErrorResponse = {
  message: string | string[];
  status: number;
};

export const errorCatch = (error: AxiosError<ErrorResponse>): string => {
  const message = error.response?.data?.message;

  return message ? (isArray(message) ? message[0] : message) : error.message;
};

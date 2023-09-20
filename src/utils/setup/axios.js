import axios from "axios";
import { toast } from "react-toastify";

/**
 * This is an axios's instance. we can configure some settings here in the future.
 */
export const AXIOS = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

/**
 * An axios-interceptor which will add auth-token to each request.
 */
AXIOS.interceptors.request.use(
  (request) => {
    const AUTH_TOKEN = localStorage.getItem("token");
    if (AUTH_TOKEN) {
      request.headers.Authorization = AUTH_TOKEN;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AXIOS.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }
    if (error.response.status === 427) {
      toast.error("Api rate limit exceeded. Kindly try after minutes", {
        toastId: "CORS",
      });
    }
    return Promise.reject(error);
  }
);

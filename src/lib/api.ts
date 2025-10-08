import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});


API.interceptors.request.use(
  (config) => {
    return config; 
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        document.cookie = "jwt=; Max-Age=0; path=/";

        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;

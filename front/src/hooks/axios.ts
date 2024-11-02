import axios, { AxiosInstance } from "axios";

const API_URL = import.meta.env.BACKEND_URL || "http://localhost:8080";

const api: AxiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
});

// console.log api headers
api.interceptors.request.use((config) => {
  console.log("Request with: ", config.headers);

  return config;
});
export default api;

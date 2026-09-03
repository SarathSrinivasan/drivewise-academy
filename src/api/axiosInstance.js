import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("drivewise_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("drivewise_token");
      localStorage.removeItem("drivewise_user");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
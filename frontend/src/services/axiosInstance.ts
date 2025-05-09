import axios from "axios";

export const axiosWithAuthInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true,
  headers:{
    "Cache-Control": "no-cache"
  }
});

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true,
  headers:{
    "Cache-Control": "no-cache"
  }
}); 

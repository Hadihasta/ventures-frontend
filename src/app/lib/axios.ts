import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const instance: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 10000,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Add auth token
  return config;
});
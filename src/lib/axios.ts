import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Add auth token
  return config;
});
import { BACKEND_HOST } from '@/data/constants';
import axios, { type AxiosResponse, type Method } from 'axios';

const apiClient = axios.create({
  baseURL: BACKEND_HOST + "/api/v1",
  headers: {
    "Content-Type": "application/json",
    ...(BACKEND_HOST.includes("ngrok") && {
      "ngrok-skip-browser-warning": "true",
    }),
  },
})

export const apiRequest = async <T>(
    url: string,
    method: Method,
    data?: any,
    headers?: Record<string, string>,
    params?: Record<string, any>,
): Promise<T> => {
  
  try {
    const response: AxiosResponse<T> = await apiClient({
      method,
      url,
      data,
      headers,
      params
    });

    console.log("✅ API response:", response.status, response.statusText);
    return response.data;
  } catch (error: any) {
    console.error("❌ API error:", error.response?.status, error.response?.statusText, error.response?.data);
    throw error;
  }
};
import { BACKEND_URL } from '@/data/constants';
import axios, { type AxiosResponse, type Method } from 'axios';


const apiClient = axios.create({
  baseURL:  BACKEND_URL+"/api/v1", //REMEMBER TO ALSO UPDATE pages/chats/apis/fetch/streamSSE.ts file for changes
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiRequest = async <T>(
    url: string,
    method: Method,
    data?: any,
    headers?: Record<string, string>,
    params?: Record<string, any>,
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient({
    method,
    url,
    data,
    headers,
    params
  });

  return response.data;
};
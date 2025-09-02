import axios, { type AxiosResponse, type Method } from 'axios';


const apiClient = axios.create({
  baseURL:  "/api/v1", //REMEMBER TO ALSO UPDATE pages/chats/apis/fetch/streamSSE.ts file for changes
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
  console.log("🌐 API request:", method, url, "headers:", headers ? Object.keys(headers) : "none");
  
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
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, ListingApiResponse } from '../types';

// Create a base API instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Default API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle session expiration
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Generic GET request function
export const fetchData = async <T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await api.get<T>(url, { params, ...config });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Generic GET request
export const getData = async <T>(
  endpoint: string, 
  params?: Record<string, any>
): Promise<ListingApiResponse<T>> => {
  try {
    const config: AxiosRequestConfig = { params };
    const response: AxiosResponse<ListingApiResponse<T>> = await api.get(endpoint, config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return {
      success: false,
      message: 'Failed to fetch data',
      data: null as unknown as T,
      pagination: {
        page: 0,
        perPage: 10,
        total: 0
      }
    };
  }
};

// Generic POST request
export const postData = async <T>(
  endpoint: string, 
  data: any
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    return {
      success: false,
      message: 'Failed to submit data',
      data: null as unknown as T
    };
  }
};

// Generic PUT request
export const putData = async <T>(
  endpoint: string, 
  data: any
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating data at ${endpoint}:`, error);
    return {
      success: false,
      message: 'Failed to update data',
      data: null as unknown as T
    };
  }
};

// Generic DELETE request
export const deleteData = async (
  endpoint: string
): Promise<ApiResponse<null>> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error deleting data at ${endpoint}:`, error);
    return {
      success: false,
      message: 'Failed to delete data',
      data: null
    };
  }
};

export default api; 
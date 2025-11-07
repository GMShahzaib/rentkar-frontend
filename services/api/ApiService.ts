import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL } from './config';
import { SecureStorageService } from '../secureStorageService';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
class ApiService {
  protected api: AxiosInstance;

  constructor(baseURL: string = BASE_URL) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SecureStorageService.getItem('token') || ''}`
      },
    });

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log('API Error Interceptor:', error);

        if (error.response && error.response.status === 401) {
          console.warn('Unauthorized! Removing token...');
          await SecureStorageService.removeItem('token'); // or SecureStorageService.clear() if you want to clear all
        }

        const message =
          error.response?.data?.message || 'Network error. Please try again.';
        return Promise.reject(new Error(message));
      }
    );
  }

  protected async request<T>(
    config: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.api.request(config);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('API Error:', error.message);
      return {
        success: false,
        message: error.message || 'Something went wrong',
      };
    }
  }

  protected get<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ url, method: 'GET', ...config });
  }

  protected post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>({ url, method: 'POST', data, ...config });
  }

  protected put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>({ url, method: 'PUT', data, ...config });
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ url, method: 'DELETE', ...config });
  }
}

export default ApiService;

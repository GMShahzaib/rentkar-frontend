import ApiService, { ApiResponse } from './ApiService';

export interface LoginRequest {
    email: string;
    password: string;
}
export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    profile_picture?: string;
}
export interface User {
    id?: string;
    email: string;
    name: string;
    profile_picture?: string;
}
export interface LoginResponse {
    data: {
        user: User;
        accessToken: string;
    };
}

export interface RegisterResponse {
    data: {
        user: User;
        accessToken: string;
        message: string;
    }
}




class AuthService extends ApiService {
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.post<LoginResponse>('/auth/login', credentials);
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    return this.post<RegisterResponse>('/auth/register', userData);
  }
}

export const authService = new AuthService();

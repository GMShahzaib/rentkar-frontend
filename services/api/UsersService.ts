import ApiService, { ApiResponse } from './ApiService';

export interface User {
    id?: string;
    email: string;
    name: string;
    profile_picture?: string;
}



class UserService extends ApiService {
    async getMe(): Promise<ApiResponse<{ data: { user: User } }>> {
        return this.get<{ data: { user: User } }>('/users/me');
    }
}

export const userService = new UserService();

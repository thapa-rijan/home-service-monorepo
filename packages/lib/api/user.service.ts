import { api } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import { User } from "./auth.service";

// Types
export interface UpdateUserData {
  name?: string;
  email?: string;
  number?: string;
  address?: string;
  jobTitle?: string;
  skills?: string;
  experienceYears?: number;
  workingHours?: string;
  availableDays?: string;
  hourlyRate?: number;
  languages?: string;
  bio?: string;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

// User API Service
export const userApi = {
  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>(API_ENDPOINTS.USERS.PROFILE);
    return response.data;
  },

  /**
   * Get user by ID
   */
  getById: async (id: string): Promise<User> => {
    const response = await api.get<User>(API_ENDPOINTS.USERS.BY_ID(id));
    return response.data;
  },

  /**
   * Get list of users
   */
  getList: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
  }): Promise<UserListResponse> => {
    const response = await api.get<UserListResponse>(API_ENDPOINTS.USERS.LIST, {
      params,
    });
    return response.data;
  },

  /**
   * Update user
   */
  update: async (id: string, data: UpdateUserData): Promise<User> => {
    const response = await api.put<User>(API_ENDPOINTS.USERS.UPDATE(id), data);
    return response.data;
  },

  /**
   * Delete user
   */
  delete: async (
    id: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
      API_ENDPOINTS.USERS.DELETE(id)
    );
    return response.data;
  },
};

export default userApi;

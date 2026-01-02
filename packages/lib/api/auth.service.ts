import { api } from "./client";
import { API_ENDPOINTS } from "./endpoints";

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
  number?: string;
  address?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  number: string;
  address: string;
  jobTitle: string | null;
  skills: string | null;
  experienceYears: number | null;
  workingHours: string | null;
  availableDays: string | null;
  hourlyRate: number | null;
  languages: string | null;
  bio: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
  refreshToken?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Auth API Service
export const authApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },

  /**
   * Register new user
   */
  register: async (data: RegisterData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(API_ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    });
    return response.data;
  },

  /**
   * Get staff list
   */
  getStaff: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<User[]> => {
    const response = await api.get<User[]>(API_ENDPOINTS.AUTH.STAFF, {
      params,
    });
    return response.data;
  },

  /**
   * Forgot password
   */
  forgotPassword: async (email: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email }
    );
    return response.data;
  },

  /**
   * Reset password
   */
  resetPassword: async (
    token: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      { token, password }
    );
    return response.data;
  },

  /**
   * Verify email
   */
  verifyEmail: async (token: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.VERIFY_EMAIL,
      { token }
    );
    return response.data;
  },

  /**
   * Change password
   */
  changePassword: async (
    oldPassword: string,
    newPassword: string
  ): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      { oldPassword, newPassword }
    );
    return response.data;
  },
};

export default authApi;

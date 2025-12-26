import { api } from "./client";
import { API_ENDPOINTS } from "./endpoints";

// Types
export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceData {
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
}

export interface UpdateServiceData {
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  duration?: number;
  isActive?: boolean;
}

export interface ServiceListResponse {
  services: Service[];
  total: number;
  page: number;
  limit: number;
}

// Service API Service
export const serviceApi = {
  /**
   * Get list of services
   */
  getList: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<ServiceListResponse> => {
    const response = await api.get<ServiceListResponse>(
      API_ENDPOINTS.SERVICES.LIST,
      { params }
    );
    return response.data;
  },

  /**
   * Get service by ID
   */
  getById: async (id: string): Promise<Service> => {
    const response = await api.get<Service>(API_ENDPOINTS.SERVICES.BY_ID(id));
    return response.data;
  },

  /**
   * Create new service
   */
  create: async (data: CreateServiceData): Promise<Service> => {
    const response = await api.post<Service>(
      API_ENDPOINTS.SERVICES.CREATE,
      data
    );
    return response.data;
  },

  /**
   * Update service
   */
  update: async (id: string, data: UpdateServiceData): Promise<Service> => {
    const response = await api.put<Service>(
      API_ENDPOINTS.SERVICES.UPDATE(id),
      data
    );
    return response.data;
  },

  /**
   * Delete service
   */
  delete: async (
    id: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
      API_ENDPOINTS.SERVICES.DELETE(id)
    );
    return response.data;
  },
};

export default serviceApi;

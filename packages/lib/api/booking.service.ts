import { api } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import { User } from "./auth.service";
import { Service } from "./service.service";

// Types
export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  staffId?: string;
  date: string;
  time: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  notes?: string;
  user?: User;
  service?: Service;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingData {
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
}

export interface UpdateBookingData {
  date?: string;
  time?: string;
  status?: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  notes?: string;
  staffId?: string;
}

export interface BookingListResponse {
  bookings: Booking[];
  total: number;
  page: number;
  limit: number;
}

// Booking API Service
export const bookingApi = {
  /**
   * Get list of bookings
   */
  getList: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    userId?: string;
  }): Promise<BookingListResponse> => {
    const response = await api.get<BookingListResponse>(
      API_ENDPOINTS.BOOKINGS.LIST,
      { params }
    );
    return response.data;
  },

  /**
   * Get booking by ID
   */
  getById: async (id: string): Promise<Booking> => {
    const response = await api.get<Booking>(API_ENDPOINTS.BOOKINGS.BY_ID(id));
    return response.data;
  },

  /**
   * Get bookings by user ID
   */
  getByUserId: async (userId: string): Promise<Booking[]> => {
    const response = await api.get<Booking[]>(
      API_ENDPOINTS.BOOKINGS.BY_USER(userId)
    );
    return response.data;
  },

  /**
   * Create new booking
   */
  create: async (data: CreateBookingData): Promise<Booking> => {
    const response = await api.post<Booking>(
      API_ENDPOINTS.BOOKINGS.CREATE,
      data
    );
    return response.data;
  },

  /**
   * Update booking
   */
  update: async (id: string, data: UpdateBookingData): Promise<Booking> => {
    const response = await api.put<Booking>(
      API_ENDPOINTS.BOOKINGS.UPDATE(id),
      data
    );
    return response.data;
  },

  /**
   * Delete/Cancel booking
   */
  delete: async (
    id: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
      API_ENDPOINTS.BOOKINGS.DELETE(id)
    );
    return response.data;
  },
};

export default bookingApi;

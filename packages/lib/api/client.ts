import type { ApiResponse, Service, Booking, User } from "@home-service/shared";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "An error occurred",
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  // Services API
  async getServices() {
    return this.request<Service[]>("/services");
  }

  async getService(id: string) {
    return this.request<Service>(`/services/${id}`);
  }

  async createService(
    service: Omit<Service, "id" | "createdAt" | "updatedAt">
  ) {
    return this.request<Service>("/services", {
      method: "POST",
      body: JSON.stringify(service),
    });
  }

  async updateService(id: string, service: Partial<Service>) {
    return this.request<Service>(`/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(service),
    });
  }

  async deleteService(id: string) {
    return this.request<void>(`/services/${id}`, {
      method: "DELETE",
    });
  }

  // Bookings API
  async getBookings() {
    return this.request<Booking[]>("/bookings");
  }

  async getBooking(id: string) {
    return this.request<Booking>(`/bookings/${id}`);
  }

  async createBooking(
    booking: Omit<Booking, "id" | "createdAt" | "updatedAt">
  ) {
    return this.request<Booking>("/bookings", {
      method: "POST",
      body: JSON.stringify(booking),
    });
  }

  async updateBooking(id: string, booking: Partial<Booking>) {
    return this.request<Booking>(`/bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify(booking),
    });
  }

  async cancelBooking(id: string) {
    return this.request<Booking>(`/bookings/${id}/cancel`, {
      method: "POST",
    });
  }

  // Users API
  async getUsers() {
    return this.request<User[]>("/users");
  }

  async getUser(id: string) {
    return this.request<User>(`/users/${id}`);
  }

  async updateUser(id: string, user: Partial<User>) {
    return this.request<User>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
    });
  }
}

export const apiClient = new ApiClient();

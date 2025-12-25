// Service Types
export type ServiceType =
  | "cleaning"
  | "plumbing"
  | "electrical"
  | "carpentry"
  | "painting"
  | "hvac";

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  description: string;
  price: number;
  duration: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

// User Types
export type UserRole = "customer" | "admin" | "service-provider";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Booking Types
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in-progress"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  providerId?: string;
  status: BookingStatus;
  scheduledDate: Date;
  notes?: string;
  address: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

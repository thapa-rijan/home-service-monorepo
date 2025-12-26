// Export API client
export { default as apiClient, api, API_CONFIG } from "./client";

// Export endpoints
export { API_ENDPOINTS } from "./endpoints";

// Export services
export { authApi } from "./auth.service";
export { userApi } from "./user.service";
export { serviceApi } from "./service.service";
export { bookingApi } from "./booking.service";

// Export types
export type {
  LoginCredentials,
  RegisterData,
  User,
  LoginResponse,
  AuthResponse,
} from "./auth.service";

export type { UpdateUserData, UserListResponse } from "./user.service";

export type {
  Service,
  CreateServiceData,
  UpdateServiceData,
  ServiceListResponse,
} from "./service.service";

export type {
  Booking,
  CreateBookingData,
  UpdateBookingData,
  BookingListResponse,
} from "./booking.service";

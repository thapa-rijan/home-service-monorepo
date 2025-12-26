// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
    CHANGE_PASSWORD: "/auth/change-password",
  },

  // User endpoints
  USERS: {
    BASE: "/users",
    PROFILE: "/users/profile",
    BY_ID: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    LIST: "/users",
  },

  // Service endpoints
  SERVICES: {
    BASE: "/services",
    BY_ID: (id: string) => `/services/${id}`,
    CREATE: "/services",
    UPDATE: (id: string) => `/services/${id}`,
    DELETE: (id: string) => `/services/${id}`,
    LIST: "/services",
  },

  // Booking endpoints
  BOOKINGS: {
    BASE: "/bookings",
    BY_ID: (id: string) => `/bookings/${id}`,
    CREATE: "/bookings",
    UPDATE: (id: string) => `/bookings/${id}`,
    DELETE: (id: string) => `/bookings/${id}`,
    LIST: "/bookings",
    BY_USER: (userId: string) => `/bookings/user/${userId}`,
  },

  // Admin endpoints
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    STATS: "/admin/stats",
    USERS: "/admin/users",
    SERVICES: "/admin/services",
  },
};

export default API_ENDPOINTS;

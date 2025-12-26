# API Services Documentation

Centralized API services for making HTTP requests across the entire application.

## 📁 Structure

```
packages/lib/api/
├── client.ts              # Axios client with interceptors
├── endpoints.ts           # API endpoint constants
├── auth.service.ts        # Authentication API calls
├── user.service.ts        # User management API calls
├── service.service.ts     # Service management API calls
├── booking.service.ts     # Booking management API calls
└── index.ts              # Exports all services
```

## 🚀 Features

- ✅ **Centralized Configuration** - Single source for API base URL and settings
- ✅ **Automatic Token Management** - Interceptors handle auth tokens automatically
- ✅ **Error Handling** - Global error handling with proper status code responses
- ✅ **Type Safety** - Full TypeScript support with interfaces
- ✅ **Reusable** - Used across all apps (admin, website, mobile)
- ✅ **Cookie Integration** - Automatic token extraction from cookies

## 📦 Installation

Already installed at the root level:

```bash
yarn add axios nookies
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` in your app root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### API Client Configuration

The API client is automatically configured with:

```typescript
{
  baseURL: 'http://localhost:5000',  // From env or default
  timeout: 30000,                     // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}
```

## 📖 Usage

### Import Services

```typescript
import {
  authApi,
  userApi,
  serviceApi,
  bookingApi,
} from "@home-service/lib/api";
```

### Authentication API

```typescript
import { authApi, type LoginCredentials } from "@home-service/lib/api";

// Login
const handleLogin = async () => {
  try {
    const response = await authApi.login({
      email: "user@example.com",
      password: "password123",
    });
    console.log(response.user);
    console.log(response.accessToken);
  } catch (error) {
    console.error("Login failed:", error);
  }
};

// Register
const handleRegister = async () => {
  const response = await authApi.register({
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "USER",
  });
};

// Logout
const handleLogout = async () => {
  await authApi.logout();
};

// Forgot Password
const handleForgotPassword = async () => {
  await authApi.forgotPassword("user@example.com");
};

// Reset Password
const handleResetPassword = async () => {
  await authApi.resetPassword("reset-token", "newPassword123");
};

// Change Password
const handleChangePassword = async () => {
  await authApi.changePassword("oldPassword", "newPassword123");
};
```

### User API

```typescript
import { userApi } from "@home-service/lib/api";

// Get current user profile
const profile = await userApi.getProfile();

// Get user by ID
const user = await userApi.getById("user-id-123");

// Get list of users with filters
const users = await userApi.getList({
  page: 1,
  limit: 10,
  role: "STAFF",
  search: "john",
});

// Update user
const updatedUser = await userApi.update("user-id-123", {
  name: "John Updated",
  bio: "New bio",
});

// Delete user
await userApi.delete("user-id-123");
```

### Service API

```typescript
import { serviceApi } from "@home-service/lib/api";

// Get all services
const services = await serviceApi.getList({
  page: 1,
  limit: 20,
  category: "plumbing",
});

// Get service by ID
const service = await serviceApi.getById("service-id-123");

// Create service
const newService = await serviceApi.create({
  name: "AC Repair",
  description: "Professional AC repair service",
  category: "HVAC",
  price: 150,
  duration: 120,
});

// Update service
const updated = await serviceApi.update("service-id-123", {
  price: 175,
});

// Delete service
await serviceApi.delete("service-id-123");
```

### Booking API

```typescript
import { bookingApi } from "@home-service/lib/api";

// Get all bookings
const bookings = await bookingApi.getList({
  page: 1,
  limit: 10,
  status: "CONFIRMED",
});

// Get booking by ID
const booking = await bookingApi.getById("booking-id-123");

// Get bookings by user
const userBookings = await bookingApi.getByUserId("user-id-123");

// Create booking
const newBooking = await bookingApi.create({
  serviceId: "service-id-123",
  date: "2025-12-26",
  time: "10:00",
  notes: "Please bring tools",
});

// Update booking
const updated = await bookingApi.update("booking-id-123", {
  status: "CONFIRMED",
  staffId: "staff-id-456",
});

// Cancel booking
await bookingApi.delete("booking-id-123");
```

## 🔐 Authentication Token Flow

1. **Login** → Token stored in cookies automatically
2. **Subsequent Requests** → Token added to `Authorization` header via interceptor
3. **Logout** → Token removed from cookies

### How It Works

```typescript
// Request Interceptor (automatic)
apiClient.interceptors.request.use((config) => {
  const cookies = parseCookies();
  const token = cookies.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

## 🎯 Using in Redux Saga

```typescript
import { call, put } from "redux-saga/effects";
import { authApi } from "@home-service/lib/api";

function* loginSaga(action) {
  try {
    const response = yield call(authApi.login, action.payload);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}
```

## 🎯 Using in React Components

```typescript
"use client";

import { useState } from "react";
import { userApi } from "@home-service/lib/api";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const profile = await userApi.getProfile();
      setUser(profile);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchProfile}>Load Profile</button>
      {loading && <p>Loading...</p>}
      {user && <p>Welcome, {user.name}!</p>}
    </div>
  );
}
```

## 🎯 Using in Server Components (Next.js)

```typescript
import { cookies } from "next/headers";
import { userApi } from "@home-service/lib/api";

export default async function ServerComponent() {
  // For server-side, you'll need to pass cookies manually
  // Or use a different approach for server components

  const profile = await userApi.getProfile();

  return <div>Welcome, {profile.name}</div>;
}
```

## 🚨 Error Handling

All services throw errors that you should handle:

```typescript
try {
  const user = await userApi.getById("invalid-id");
} catch (error) {
  if (error.response) {
    // Server responded with error
    console.error("Status:", error.response.status);
    console.error("Message:", error.response.data.message);
  } else if (error.request) {
    // No response received
    console.error("Network error - no response");
  } else {
    // Request setup error
    console.error("Error:", error.message);
  }
}
```

## 📝 API Response Types

### Login Response

```typescript
interface LoginResponse {
  accessToken: string;
  user: User;
  refreshToken?: string;
}
```

### User Type

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  // ... other fields
}
```

### Service Type

```typescript
interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  isActive: boolean;
}
```

### Booking Type

```typescript
interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  date: string;
  time: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  // ... other fields
}
```

## 🔧 Customization

### Custom Endpoints

Add new endpoints in `endpoints.ts`:

```typescript
export const API_ENDPOINTS = {
  // ... existing endpoints

  PAYMENTS: {
    BASE: "/payments",
    PROCESS: "/payments/process",
    HISTORY: "/payments/history",
  },
};
```

### New Service

Create `payment.service.ts`:

```typescript
import { api } from "./client";
import { API_ENDPOINTS } from "./endpoints";

export const paymentApi = {
  processPayment: async (data: PaymentData) => {
    const response = await api.post(API_ENDPOINTS.PAYMENTS.PROCESS, data);
    return response.data;
  },
};
```

Export in `index.ts`:

```typescript
export { paymentApi } from "./payment.service";
```

## 🎯 Best Practices

1. **Always use try-catch** when calling API services
2. **Use TypeScript types** for request and response data
3. **Handle loading states** in UI components
4. **Don't store sensitive data** in client state
5. **Use the centralized API** - don't create direct axios calls
6. **Keep services focused** - one service per resource type

## 📚 Available Endpoints

### Auth

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/logout`
- `POST /auth/refresh`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/verify-email`
- `POST /auth/change-password`

### Users

- `GET /users/profile`
- `GET /users/:id`
- `GET /users`
- `PUT /users/:id`
- `DELETE /users/:id`

### Services

- `GET /services`
- `GET /services/:id`
- `POST /services`
- `PUT /services/:id`
- `DELETE /services/:id`

### Bookings

- `GET /bookings`
- `GET /bookings/:id`
- `GET /bookings/user/:userId`
- `POST /bookings`
- `PUT /bookings/:id`
- `DELETE /bookings/:id`

---

**Created by**: Development Team  
**Last Updated**: December 25, 2025

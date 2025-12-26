# Redux Saga Authentication Implementation

A professional, scalable Redux Saga setup for authentication with React Hook Form, Zod validation, and cookie-based token management.

## 📁 Project Structure

```
apps/admin/
├── redux/
│   ├── constants/
│   │   └── auth.constants.ts       # Action types and API endpoints
│   ├── actions/
│   │   └── auth.actions.ts         # Action creators and types
│   ├── reducers/
│   │   ├── auth.reducer.ts         # Auth state reducer
│   │   └── index.ts                # Root reducer
│   ├── sagas/
│   │   ├── auth.saga.ts            # Auth side effects
│   │   └── index.ts                # Root saga
│   ├── store.ts                    # Redux store configuration
│   └── hooks.ts                    # Typed Redux hooks
├── components/
│   └── providers/
│       └── redux-provider.tsx      # Redux Provider wrapper
└── app/
    ├── login/
    │   └── page.tsx                # Login page with form
    └── layout.tsx                  # Root layout with Redux Provider
```

## 🚀 Features

- ✅ **Redux Saga** for side effects management
- ✅ **TypeScript** with full type safety
- ✅ **React Hook Form** for efficient form handling
- ✅ **Zod** for runtime validation
- ✅ **Nookies** for server-side cookie management
- ✅ **Axios** for HTTP requests
- ✅ **Redux DevTools** integration
- ✅ **Automatic token persistence** in cookies
- ✅ **Error handling** with user feedback
- ✅ **Loading states** management

## 📦 Dependencies

```json
{
  "dependencies": {
    "redux": "^5.x.x",
    "react-redux": "^9.x.x",
    "redux-saga": "^1.x.x",
    "@reduxjs/toolkit": "^2.x.x",
    "react-hook-form": "^7.x.x",
    "zod": "^3.x.x",
    "@hookform/resolvers": "^3.x.x",
    "nookies": "^2.x.x",
    "axios": "^1.x.x"
  }
}
```

## 🔧 Installation

Install all dependencies at the root level for both apps:

```bash
yarn add redux react-redux redux-saga @reduxjs/toolkit react-hook-form zod @hookform/resolvers nookies axios
```

## 🏗️ Architecture Overview

### 1. Constants (`redux/constants/auth.constants.ts`)

Define action types and API endpoints:

```typescript
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const API_BASE_URL = "http://localhost:5000";
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
};
```

### 2. Actions (`redux/actions/auth.actions.ts`)

Type-safe action creators:

```typescript
export const loginRequest = (credentials: LoginCredentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});
```

### 3. Reducers (`redux/reducers/auth.reducer.ts`)

Manage authentication state:

```typescript
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
```

### 4. Sagas (`redux/sagas/auth.saga.ts`)

Handle side effects (API calls, cookie management):

```typescript
function* loginSaga(action: LoginRequestAction) {
  try {
    const response = yield call(loginApi, action.payload);
    setCookie(null, AUTH_TOKEN_KEY, response.data.accessToken);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}
```

### 5. Store (`redux/store.ts`)

Configure Redux store with Saga middleware:

```typescript
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
```

## 🎯 Usage

### 1. Wrap Your App with Redux Provider

Update `app/layout.tsx`:

```typescript
import ReduxProvider from "@/components/providers/redux-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
```

### 2. Create Login Form

Use typed hooks and dispatch actions:

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginRequest } from "@/redux/actions/auth.actions";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    dispatch(loginRequest(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="email" />
      <input {...register("password")} type="password" />
      <button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

### 3. Access Auth State

Use typed hooks anywhere in your app:

```typescript
import { useAppSelector } from "@/redux/hooks";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {user?.name}!</div>;
}
```

### 4. Logout

```typescript
import { useAppDispatch } from "@/redux/hooks";
import { logoutRequest } from "@/redux/actions/auth.actions";

export default function LogoutButton() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

## 🔐 Authentication Flow

1. **User submits login form** → Dispatches `LOGIN_REQUEST` action
2. **Saga intercepts action** → Calls API with credentials
3. **API responds** → Saga handles success or failure
4. **Success**:
   - Stores token in cookies (1 hour expiration)
   - Dispatches `LOGIN_SUCCESS` with user data
   - Redirects to dashboard
5. **Failure**:
   - Dispatches `LOGIN_FAILURE` with error message
   - Displays error to user

## 📝 API Integration

### Login Endpoint

```bash
curl -X 'POST' \
  'http://localhost:5000/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "rijan4568@gmail.com",
  "password": "11111111"
}'
```

### Expected Response

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "5a9c89c5-2b8c-4ead-913e-1a0db1281748",
    "name": "Rijan Thapa",
    "email": "rijan4568@gmail.com",
    "role": "ADMIN",
    ...
  }
}
```

## 🍪 Cookie Management

Tokens are stored securely using `nookies`:

```typescript
// Store token
setCookie(null, "accessToken", token, {
  maxAge: 60 * 60, // 1 hour
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
});

// Remove token
destroyCookie(null, "accessToken", { path: "/" });
```

## ✅ Form Validation with Zod

```typescript
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
```

## 🔍 Redux DevTools

Access Redux DevTools in your browser:

1. Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)
2. Open DevTools in your browser
3. Navigate to Redux tab
4. Inspect actions, state, and time-travel debug

## 🚦 State Management

### Auth State Structure

```typescript
{
  auth: {
    isAuthenticated: boolean,
    user: User | null,
    token: string | null,
    loading: boolean,
    error: string | null
  }
}
```

### Available Actions

- `loginRequest(credentials)` - Initiate login
- `loginSuccess(data)` - Handle successful login
- `loginFailure(error)` - Handle login error
- `logoutRequest()` - Initiate logout
- `logoutSuccess()` - Handle successful logout
- `setAuthToken(token)` - Manually set token
- `clearAuth()` - Clear auth state

## 🧪 Testing

```typescript
// Test action creators
const credentials = { email: "test@example.com", password: "12345678" };
const action = loginRequest(credentials);
expect(action).toEqual({
  type: "LOGIN_REQUEST",
  payload: credentials,
});

// Test reducer
const state = authReducer(undefined, loginSuccess(mockData));
expect(state.isAuthenticated).toBe(true);
expect(state.user).toEqual(mockData.user);
```

## 📈 Extending the Implementation

### Add More Actions

```typescript
// constants/auth.constants.ts
export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";

// actions/auth.actions.ts
export const refreshTokenRequest = () => ({
  type: REFRESH_TOKEN_REQUEST,
});

// sagas/auth.saga.ts
function* refreshTokenSaga() {
  // Implementation
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(REFRESH_TOKEN_REQUEST, refreshTokenSaga);
}
```

### Add More Reducers

```typescript
// reducers/user.reducer.ts
export interface UserState {
  profile: UserProfile | null;
  loading: boolean;
}

// reducers/index.ts
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});
```

## 🛡️ Security Best Practices

1. **HTTPS Only in Production**: Set `secure: true` for cookies
2. **HttpOnly Cookies**: Consider using httpOnly cookies for tokens
3. **Token Expiration**: Tokens expire after 1 hour
4. **CSRF Protection**: Use sameSite cookie attribute
5. **Refresh Tokens**: Implement refresh token mechanism
6. **API Error Handling**: Validate all API responses
7. **Input Validation**: Use Zod schemas for all forms

## 🐛 Troubleshooting

### Issue: Redux DevTools not working

**Solution**: Check if extension is installed and store is configured with `composeEnhancers`

### Issue: Cookies not persisting

**Solution**: Ensure `path: '/'` is set and domain matches

### Issue: TypeScript errors

**Solution**: Run `yarn add @types/react-redux @types/node`

### Issue: Saga not running

**Solution**: Verify `sagaMiddleware.run(rootSaga)` is called after store creation

## 📚 Resources

- [Redux Saga Documentation](https://redux-saga.js.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Nookies](https://github.com/maticzav/nookies)
- [Redux Toolkit](https://redux-toolkit.js.org/)

## 👨‍💻 Development Notes

- Always use typed hooks (`useAppDispatch`, `useAppSelector`)
- Keep sagas pure and testable
- Handle all error cases
- Provide loading states for better UX
- Use TypeScript strict mode
- Follow Redux best practices

## 📄 License

MIT

---

**Created by**: Senior Developer Team  
**Last Updated**: December 25, 2025

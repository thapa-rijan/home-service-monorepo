# Redux Migration to Shared Package

## Overview

Redux Saga setup has been moved from `apps/admin` to `packages/lib` to make it available across the entire application.

## Changes Made

### 1. New Redux Location

- **From:** `apps/admin/redux/`
- **To:** `packages/lib/redux/`

### 2. Folder Structure

```
packages/lib/redux/
├── store.ts                    # Redux store configuration with saga middleware
├── hooks.ts                    # Typed hooks (useAppDispatch, useAppSelector)
├── actions/
│   └── auth.actions.ts        # Auth action creators and types
├── constants/
│   └── auth.constants.ts      # Auth action type constants
├── reducers/
│   ├── index.ts               # Root reducer
│   └── auth.reducer.ts        # Auth reducer
└── sagas/
    ├── index.ts               # Root saga
    └── auth.saga.ts           # Auth saga with login/logout logic
```

### 3. Dependencies Added to `packages/lib`

- `redux: ^5.0.1`
- `react-redux: ^9.1.0`
- `redux-saga: ^1.3.0`
- `nookies: ^2.5.2`

### 4. Exports from `packages/lib/index.ts`

```typescript
export * from "./redux/store";
export * from "./redux/hooks";
export * from "./redux/actions/auth.actions";
export * from "./redux/constants/auth.constants";
export { default } from "./redux/store";
```

### 5. Updated Imports in Admin App

**Before:**

```typescript
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginRequest } from "@/redux/actions/auth.actions";
import store from "@/redux/store";
```

**After:**

```typescript
import {
  useAppDispatch,
  useAppSelector,
  loginRequest,
} from "@home-service/lib";
import { default as store } from "@home-service/lib";
```

## Usage in Other Apps

To use Redux in other apps (like `website`), simply:

1. Import what you need from `@home-service/lib`:

```typescript
import {
  useAppDispatch,
  useAppSelector,
  loginRequest,
} from "@home-service/lib";
```

2. Wrap your app with the Redux Provider:

```typescript
import { Provider } from "react-redux";
import { default as store } from "@home-service/lib";

export default function RootLayout({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
```

## Benefits

- ✅ Centralized state management accessible to all apps
- ✅ Shared Redux logic and sagas
- ✅ Single source of truth for state
- ✅ Easier to maintain and extend
- ✅ Type-safe with TypeScript across all apps

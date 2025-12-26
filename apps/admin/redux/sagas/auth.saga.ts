import { call, put, takeLatest } from "redux-saga/effects";
import { setCookie, destroyCookie } from "nookies";
import { authApi } from "@home-service/lib/api";
import type { LoginResponse } from "@home-service/lib/api";
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  AUTH_TOKEN_KEY,
} from "../constants/auth.constants";
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  LoginRequestAction,
} from "../actions/auth.actions";

// Worker Saga: Login
function* loginSaga(action: LoginRequestAction) {
  try {
    // Call API service
    const response: LoginResponse = yield call(authApi.login, action.payload);

    const { accessToken, user } = response;

    // Store token in cookies
    setCookie(null, AUTH_TOKEN_KEY, accessToken, {
      maxAge: 60 * 60, // 1 hour
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // Dispatch success action
    yield put(loginSuccess(response));

    // Optional: Redirect to dashboard
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Login failed";
    yield put(loginFailure(errorMessage));
  }
}

// Worker Saga: Logout
function* logoutSaga() {
  try {
    // Call API logout (optional)
    try {
      yield call(authApi.logout);
    } catch (e) {
      // Ignore API errors on logout
    }

    // Remove token from cookies
    destroyCookie(null, AUTH_TOKEN_KEY, {
      path: "/",
    });

    // Dispatch success action
    yield put(logoutSuccess());

    // Redirect to login page
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  } catch (error: any) {
    console.error("Logout error:", error);
    // Even if there's an error, we should clear local state
    yield put(logoutSuccess());
  }
}

// Watcher Saga
export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}

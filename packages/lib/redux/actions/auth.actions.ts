import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SET_AUTH_TOKEN,
  CLEAR_AUTH,
} from "../constants/auth.constants";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  number: string;
  address: string;
  jobTitle: string | null;
  skills: string | null;
  experienceYears: number | null;
  workingHours: string | null;
  availableDays: string | null;
  hourlyRate: number | null;
  languages: string | null;
  bio: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

// Action Interfaces
export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: LoginCredentials;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: LoginResponse;
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

export interface LogoutRequestAction {
  type: typeof LOGOUT_REQUEST;
}

export interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

export interface SetAuthTokenAction {
  type: typeof SET_AUTH_TOKEN;
  payload: string;
}

export interface ClearAuthAction {
  type: typeof CLEAR_AUTH;
}

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | SetAuthTokenAction
  | ClearAuthAction;

// Action Creators
export const loginRequest = (
  credentials: LoginCredentials
): LoginRequestAction => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (data: LoginResponse): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error: string): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutRequest = (): LogoutRequestAction => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = (): LogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
});

export const setAuthToken = (token: string): SetAuthTokenAction => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});

export const clearAuth = (): ClearAuthAction => ({
  type: CLEAR_AUTH,
});

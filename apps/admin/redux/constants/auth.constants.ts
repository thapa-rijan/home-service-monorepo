// Auth Action Types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const CLEAR_AUTH = "CLEAR_AUTH";

// API Endpoints
export const API_BASE_URL = "http://localhost:5000";
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,
};

// Cookie Keys
export const AUTH_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from "../constants/user.constants";

export interface FetchUserRequestAction {
  type: typeof FETCH_USER_REQUEST;
  payload?: { page?: number; limit?: number; search?: string };
}

export interface FetchUserSuccessAction {
  type: typeof FETCH_USER_SUCCESS;
  payload: { users: any[]; total?: number };
}

export interface FetchUserFailureAction {
  type: typeof FETCH_USER_FAILURE;
  payload: string;
}

export type UserActionTypes =
  | FetchUserRequestAction
  | FetchUserSuccessAction
  | FetchUserFailureAction;

export const fetchUserRequest = (param?: {
  page?: number;
  limit?: number;
  search?: string;
}): FetchUserRequestAction => ({
  type: FETCH_USER_REQUEST,
  payload: param,
});

export const fetchUserSuccess = (data: {
  users: any[];
  total?: number;
}): FetchUserSuccessAction => ({
  type: FETCH_USER_SUCCESS,
  payload: data,
});

export const fetchUserFailure = (error: string): FetchUserFailureAction => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

import {
  FETCH_STAFF_REQUEST,
  FETCH_STAFF_SUCCESS,
  FETCH_STAFF_FAILURE,
} from "../constants/staff.constants";
import { User } from "../interfaces";

export interface FetchStaffRequestAction {
  type: typeof FETCH_STAFF_REQUEST;
  payload?: { page?: number; limit?: number; search?: string };
}

export interface FetchStaffSuccessAction {
  type: typeof FETCH_STAFF_SUCCESS;
  payload: { users: User[]; total?: number };
}

export interface FetchStaffFailureAction {
  type: typeof FETCH_STAFF_FAILURE;
  payload: string;
}

export type StaffActionTypes =
  | FetchStaffRequestAction
  | FetchStaffSuccessAction
  | FetchStaffFailureAction;

export const fetchStaffRequest = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): FetchStaffRequestAction => ({
  type: FETCH_STAFF_REQUEST,
  payload: params,
});

export const fetchStaffSuccess = (data: {
  users: User[];
  total?: number;
}): FetchStaffSuccessAction => ({
  type: FETCH_STAFF_SUCCESS,
  payload: data,
});

export const fetchStaffFailure = (error: string): FetchStaffFailureAction => ({
  type: FETCH_STAFF_FAILURE,
  payload: error,
});

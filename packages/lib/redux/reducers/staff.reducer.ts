import {
  FETCH_STAFF_REQUEST,
  FETCH_STAFF_SUCCESS,
  FETCH_STAFF_FAILURE,
} from "../constants/staff.constants";
import {
  StaffActionTypes,
  FetchStaffSuccessAction,
  FetchStaffFailureAction,
} from "../actions/staff.actions";
import { StaffState, User } from "../interfaces";

const initialState: StaffState = {
  users: [],
  loading: false,
  error: null,
};

export default function staffReducer(
  state = initialState,
  action: StaffActionTypes
): StaffState {
  switch (action.type) {
    case FETCH_STAFF_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        users: (action as FetchStaffSuccessAction).payload.users,
      };
    case FETCH_STAFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: (action as FetchStaffFailureAction).payload,
      };
    default:
      return state;
  }
}

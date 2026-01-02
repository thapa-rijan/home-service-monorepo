import {
  FetchUserSuccessAction,
  FetchUserFailureAction,
  UserActionTypes,
} from "../actions/user.actions";
import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from "../constants/user.constants";
import { UserState } from "../interfaces";

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export default function userReducer(
  state = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: (action as FetchUserSuccessAction).payload.users,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: (action as FetchUserFailureAction).payload,
      };
    default:
      return state;
  }
}

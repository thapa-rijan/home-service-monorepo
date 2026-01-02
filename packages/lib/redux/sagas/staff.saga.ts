import { call, put, takeLatest } from "redux-saga/effects";
import { authApi } from "../../api";
import {
  FETCH_STAFF_REQUEST,
  FETCH_STAFF_SUCCESS,
  FETCH_STAFF_FAILURE,
} from "../constants/staff.constants";
import { fetchStaffSuccess, fetchStaffFailure } from "../actions/staff.actions";

// Worker saga
function* handleFetchStaff(action: any) {
  try {
    const params = action.payload || { page: 1, limit: 50 };
    const users: any = yield call(authApi.getStaff, params);

    // auth/staff returns an array of users
    yield put(
      fetchStaffSuccess({
        users: users || [],
        total: Array.isArray(users) ? users.length : 0,
      })
    );
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to fetch staff";
    yield put(fetchStaffFailure(message));
  }
}

export default function* staffSaga() {
  yield takeLatest(FETCH_STAFF_REQUEST, handleFetchStaff);
}

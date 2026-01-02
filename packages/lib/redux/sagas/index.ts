import { all, fork } from "redux-saga/effects";
import authSaga from "./auth.saga";
import staffSaga from "./staff.saga";

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(staffSaga),
  ]);
}

import { all, fork } from "redux-saga/effects";
import authSaga from "./auth.saga";
import staffSaga from "./staff.saga";

// Root Saga
export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(staffSaga),
    // Add more sagas here as your application grows
    // fork(userSaga),
    // fork(productSaga),
  ]);
}

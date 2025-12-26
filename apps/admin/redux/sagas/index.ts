import { all, fork } from "redux-saga/effects";
import authSaga from "./auth.saga";

// Root Saga
export default function* rootSaga() {
  yield all([
    fork(authSaga),
    // Add more sagas here as your application grows
    // fork(userSaga),
    // fork(productSaga),
  ]);
}

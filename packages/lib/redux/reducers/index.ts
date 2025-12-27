import { combineReducers } from "redux";
import authReducer, { AuthState } from "./auth.reducer";

export interface RootState {
  auth: AuthState;
  // Add more reducers here
}

const rootReducer = combineReducers({
  auth: authReducer,
  // Add more reducers here
});

export default rootReducer;

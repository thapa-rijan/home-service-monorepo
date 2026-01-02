import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import staffReducer from "./staff.reducer";
import userReducer from "./user.reducer";
import { AuthState, StaffState, UserState } from "../interfaces";

export interface RootState {
  auth: AuthState;
  staff: StaffState;
  user: UserState;
  // Add more reducers here
}

const rootReducer = combineReducers({
  auth: authReducer,
  staff: staffReducer,
  user: userReducer,
});

export default rootReducer;

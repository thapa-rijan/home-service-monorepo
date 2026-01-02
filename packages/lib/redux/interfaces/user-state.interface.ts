import { User } from "./user.interface";

// User State interface
export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}
import { User } from "./user.interface";

// Staff State interface
export interface StaffState {
  users: User[];
  loading: boolean;
  error: string | null;
}

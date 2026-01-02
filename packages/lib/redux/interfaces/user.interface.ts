// User related interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  number: string;
  address: string;
  jobTitle: string | null;
  skills: string | null;
  experienceYears: number | null;
  workingHours: string | null;
  availableDays: string | null;
  hourlyRate: number | null;
  languages: string | null;
  bio: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Login related interfaces
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

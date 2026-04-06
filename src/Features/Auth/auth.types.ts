export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}
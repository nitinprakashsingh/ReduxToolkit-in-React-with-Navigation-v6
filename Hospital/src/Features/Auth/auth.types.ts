export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  mobile?: string | null;
  address?: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  resetMessage: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: User;
  token: string;
}

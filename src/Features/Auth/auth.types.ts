export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  password?: string;
  mobile?: string | null;
  address?: string | null;
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

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  mobile?: string;
  address?: string;
}

export interface SignUpResponse {
  message: string;
  data: User;
}
import axiosClient from '../../api/axiosClient';
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  LoginResponse,
  SignUpPayload,
  SignUpResponse,
} from './auth.types';

export const loginApi = async (payload: LoginPayload) => {
  const response = await axiosClient.post<LoginResponse>('/auth/login', payload);
  return response.data;
};

export const signupApi = async (payload: SignUpPayload) => {
  const response = await axiosClient.post<SignUpResponse>('/auth/signup', payload);
  return response.data;
};

export const forgotPasswordApi = async (payload: ForgotPasswordPayload) => {
  const response = await axiosClient.post<ForgotPasswordResponse>('/auth/forgot-password', payload);
  return response.data;
};

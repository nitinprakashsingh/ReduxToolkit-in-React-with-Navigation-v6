import axiosClient from '../../api/axiosClient';
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  LoginResponse,
} from './auth.types';

export const loginApi = async (payload: LoginPayload) => {
  const response = await axiosClient.post<LoginResponse>('/auth/login', payload);
  return response.data;
};

export const forgotPasswordApi = async (payload: ForgotPasswordPayload) => {
  const response = await axiosClient.post<ForgotPasswordResponse>('/auth/forgot-password', payload);
  return response.data;
};

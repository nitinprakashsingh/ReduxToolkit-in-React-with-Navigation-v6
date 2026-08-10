import axiosClient from '../../api/axiosClient';
import type {
  LoginPayload,
  LoginResponse,
  VerifyEmailPayload,
  SetPasswordPayload,
} from './auth.types';

export const loginApi = async (payload: LoginPayload) => {
  const response = await axiosClient.post<LoginResponse>('/auth/login', payload);
  return response.data;
};

export const verifyEmailApi = async (payload: VerifyEmailPayload) => {
  const response = await axiosClient.post<{ success: boolean; message: string }>('/auth/login/verify-email', payload);
  return response.data;
};

export const setPasswordApi = async (payload: SetPasswordPayload) => {
  const response = await axiosClient.post<{ success: boolean; message: string }>('/auth/login/set-password', payload);
  return response.data;
};

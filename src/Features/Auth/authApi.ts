import axiosClient from '../../api/axiosClient';
import type { LoginPayload, LoginResponse, SignUpPayload, SignUpResponse } from './auth.types';

export const loginApi = async (payload: LoginPayload) => {
  const response = await axiosClient.post<LoginResponse>('/auth/login', payload);
  return response.data;
};

export const signupApi = async (payload: SignUpPayload) => {
  const response = await axiosClient.post<SignUpResponse>('/auth/signup', payload);
  return response.data;
};

import axiosClient from '../../api/axiosClient';
import type {
  LoginPayload,
  LoginResponse,
} from './auth.types';

export const loginApi = async (payload: LoginPayload) => {
  const response = await axiosClient.post<LoginResponse>('/auth/login', payload);
  return response.data;
};

import apiClient from './apiClient';

export const loginUser = async ({ email, password }) => {
  return apiClient.post('/auth/login', { email, password });
};

import apiClient from './apiClient';

export const loginUser = async ({ email, password }) => {
  return apiClient.post('/auth/login', { email, password });
};

export const loginPatient = async ({ mobile, otp }) => {
  return apiClient.post('/patientapp/auth', { mobile, otp });
};

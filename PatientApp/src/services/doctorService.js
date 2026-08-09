import apiClient from './apiClient';

export const fetchDoctors = async () => {
  return apiClient.get('/doctors/list');
};

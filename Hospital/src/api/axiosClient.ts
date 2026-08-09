import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL
  || (process.env.NODE_ENV === 'production'
    ? 'https://reduxtoolkit-in-react-with-navigation-v6.onrender.com/api'
    : 'http://localhost:5000/api');

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.localStorage.removeItem('admin_token');
    }

    return Promise.reject(error);
  },
);

export default axiosClient;

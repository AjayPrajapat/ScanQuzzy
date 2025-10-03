import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Axios instance configured for ScanQuzzy backend API.
const api = axios.create({
  baseURL: 'https://api.scanquzzy.com',
  timeout: 10000,
});

// Attach JWT token from AsyncStorage if available.
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('scanquzzy_token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

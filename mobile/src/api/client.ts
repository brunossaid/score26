import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://192.168.0.147:3000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

import { apiClient } from './client';

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { email: string; name: string; password: string };

export async function login(payload: LoginPayload) {
  const { data } = await apiClient.post('/auth/login', payload);
  return data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await apiClient.post('/auth/register', payload);
  return data;
}

import api from './api';

export async function loginRequest(credentials) {
  const { data } = await api.post('/auth/login', credentials);
  return data.data; // Should contain { token, user }
}

export async function signupRequest(details) {
  const { data } = await api.post('/auth/signup', details);
  return data.data; // Should contain { token, user }
}

export async function forgotPasswordRequest({ email }) {
  const { data } = await api.post('/auth/forgot-password', { email });
  return data;
}

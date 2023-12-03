import { apiRequest } from '../api/apiUtils';
import { REGISTER_URL, LOGIN_URL } from './endpoints';

export const registerUser = (userData) => {
  return apiRequest(REGISTER_URL, 'POST', userData, false);
};

export const loginUser = (credentials) => {
  return apiRequest(LOGIN_URL, 'POST', credentials, false);
};
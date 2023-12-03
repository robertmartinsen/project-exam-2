import { apiRequest } from '../api/apiUtils';
import { PROFILE_URL } from './endpoints';

export const updateAvatar = (userName, avatarUrl) => {
  const url = `${PROFILE_URL}${userName}/media`;
  return apiRequest(url, 'PUT', { avatar: avatarUrl });
};

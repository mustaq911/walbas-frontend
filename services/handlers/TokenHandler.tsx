import Cookies from 'js-cookie';

export const RemoveToken = () => {
  Cookies.remove('auth_token');
  console.log('Token removed from cookies'); // Debug log
};
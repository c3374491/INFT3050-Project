import { useCookies } from 'react-cookie';

const HandleCookies = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['authToken']);

  // Function to set the cookie
  const setAuthToken = (tokenValue, options = {}) => {
    setCookie('authToken', tokenValue, { path: '/', ...options });
  };

  // Function to remove the cookie
  const clearAuthToken = () => {
    removeCookie('authToken', { path: '/' });
  };

  return { authToken: cookies.authToken, setAuthToken, clearAuthToken };
};

export default HandleCookies;
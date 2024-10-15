import { useCookies } from 'react-cookie';

const HandleCookies = () => {
  const [AuthTokenCookies, setCookieAuthToken, removeCookieAuthToken] = useCookies(['authToken']);
  const [CartCookies, setCookieCart, removeCookieCart] = useCookies(['cart']);

  // Function to set the cookie
  const setAuthToken = (tokenValue, options = {}) => {
    setCookieAuthToken('authToken', tokenValue, { path: '/', ...options });
  };

  // Function to remove the cookie
  const clearAuthToken = () => {
    removeCookieAuthToken('authToken', { path: '/' });
  };

  // https://www.youtube.com/watch?v=HpiTv0VBpFU
  const createCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
  }

  // Function to set or update the cart cookie
  const setCartCookie = (product) => {

    // Get the existing cookie
    let cart = getCartCookie("cart");
    let cartIDs = [];

    // Check if the cart already exist
    if (cart) {
      try {
        cartIDs = JSON.parse(cart); // Parse the id of the cookie into an array
      } catch (error) {
        console.error('Error parsing cart JSON:', error);
        cartIDs = [];
      }
    }

    cartIDs.push(product.ID);

    // Create the cookie with all the id of the product
    const cookieString = JSON.stringify(cartIDs);
    createCookie("cart", cookieString, 31);
  };



  // Function to retrieve the cart cookie
  const getCartCookie = (cname) => {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookie.split(";");

    for (let cookie of cookiesArray) {
      cookie = cookie.trim(); // Remove leading whitespace
      if (cookie.startsWith(name)) {
        return cookie.substring(name.length);
      }
    }
    return ""; // Return empty if not found
  };

  return { authToken: AuthTokenCookies.authToken, setAuthToken, clearAuthToken, setCartCookie, getCartCookie, cart: CartCookies.cart };
};

export default HandleCookies;
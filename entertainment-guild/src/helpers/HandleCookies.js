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

  const createCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString(); // Utiliser toUTCString pour la compatibilité
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
  }

  // Function to set or update the cart cookie
  const setCartCookie = (product) => {
    console.log("Product ID:", product.ID); // Affichez l'ID du produit

    // Récupérer les données du cookie existant
    let cart = getCartCookie("cart");
    let cartIDs = [];

    // Vérifiez si le panier existe déjà et tentez de le parser
    if (cart) {
      try {
        cartIDs = JSON.parse(cart); // Parser l'ID du cookie en tableau
      } catch (error) {
        console.error('Error parsing cart JSON:', error);
        cartIDs = []; // Réinitialiser le panier en cas d'erreur
      }
    }

    // Ajouter l'ID du produit au tableau s'il n'est pas déjà présent
    if (!cartIDs.includes(product.ID)) {
      cartIDs.push(product.ID);
    }

    // Sérialiser et créer le cookie de panier mis à jour avec uniquement les IDs
    const cookieString = JSON.stringify(cartIDs);
    console.log("Updated cart IDs string:", cookieString); // Log de la chaîne JSON
    createCookie("cart", cookieString, 31);
    console.log("Cart cookie set:", document.cookie);
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
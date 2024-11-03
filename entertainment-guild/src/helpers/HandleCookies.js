import { useCookies } from 'react-cookie';

const HandleCookies = () => {
	const [AuthTokenCookies, setCookieAuthToken, removeCookieAuthToken] = useCookies(['authToken']);
	const [CartCookies, removeCookieCart] = useCookies(['cart']);

	// Function to set the authToken cookie
	const setAuthToken = (tokenValue, options = {}) => {
		setCookieAuthToken('authToken', tokenValue, { path: '/', ...options });
	};

	// Function to remove the authToken cookie
	const clearAuthToken = () => {
		removeCookieAuthToken('authToken', { path: '/' });
	};

	// https://www.youtube.com/watch?v=HpiTv0VBpFU
	// Utility function to create a cookie
	const createCookie = (name, value, days) => {
		let expires = "";
		if (days) {
			const date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = `${name}=${value}${expires}; path=/`;
	};

	// Function to set or update the cart cookie by adding a product
	const setCartCookie = (product) => {
		// Get the existing cookie
		let cart = getCartCookie("cart");
		let cartIDs = [];

		// Check if the cart already exists
		if (cart) {
			try {
				cartIDs = JSON.parse(cart); // Parse the cookie value into an array
			} catch (error) {
				console.error('Error parsing cart JSON:', error);
				cartIDs = [];
			}
		}

		// Add the new product ID to the array
		cartIDs.push(product.ID);

		// Create or update the cookie with the new product list
		const cookieString = JSON.stringify(cartIDs);
		createCookie("cart", cookieString, 31); // Set for 31 days
	};

	// Function to update the cart cookie after modifying the product list
	const updateCartCookie = (updatedCart) => {
		const cookieString = JSON.stringify(updatedCart);
		createCookie("cart", cookieString, 31); // Update with new product list
	};

	// Function to remove a product from the cart by ID
	const removeProductFromCart = (productId) => {
		// Get the existing cart cookie
		let cart = getCartCookie("cart");
		let cartIDs = [];

		// Check if the cart exists
		if (cart) {
			try {
				cartIDs = JSON.parse(cart); // Parse the cookie value into an array
			} catch (error) {
				console.error('Error parsing cart JSON:', error);
				cartIDs = [];
			}
		}

		// Filter out the product ID to remove
		const updatedCartIDs = cartIDs.filter(id => id !== productId);

		// Update the cart cookie with the new list
		updateCartCookie(updatedCartIDs);
	};

	// Function to retrieve the cart cookie value
	const getCartCookie = (cname) => {
		const name = `${cname}=`;
		const decodedCookie = decodeURIComponent(document.cookie);
		const cookiesArray = decodedCookie.split(";");

		// Loop through the cookies and find the desired one
		for (let cookie of cookiesArray) {
			cookie = cookie.trim(); // Remove leading whitespace
			if (cookie.startsWith(name)) {
				return cookie.substring(name.length);
			}
		}
		return ""; // Return empty if not found
	};

	// Function to remove the cart cookie
	const clearCart = () => {
		removeCookieCart('cart', [], { path: '/' });
	};

	return {
		authToken: AuthTokenCookies.authToken,
		setAuthToken,
		clearAuthToken,
		setCartCookie,
		removeProductFromCart,
		getCartCookie,
		cart: CartCookies.cart,
		clearCart
	};
};

export default HandleCookies;

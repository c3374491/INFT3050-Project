// trying to display products from previous orders

import axios from 'axios';



/*axios.get('{{baseUrl}}/api/v1/db/data/v1/inft3050/Product?limit=1000')
	.then(response => {
		const filteredData = response.data.list.filter(item =>
			item['Stocktake List'].some(stockItem => stockItem.ItemId === 50)
		);
		console.log(filteredData); // This will log the items with ItemId = 50
	})
	.catch(error => console.error('Error fetching data:', error));
*/





// Helper function for hashing the password using SHA-256
// This function takes a message (string) as input and returns a hexadecimal string representation of the hashed value.
async function sha256(message) {
	const msgBuffer = new TextEncoder().encode(message);
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
	return Array.from(new Uint8Array(hashBuffer))
		.map(b => b.toString(16).padStart(2, '0'))
		.join('');
}

// Function to fetch user data from the API based on a provided URL and token
// Returns the data if the request is successful, or null if an error occurs (e.g., user not found or invalid request).
const fetchUserData = async (url, token) => {
	try {
		const response = await axios.get(url, { headers: { 'xc-token': token } });
		axios.get('http://localhost:8080/api/v1/db/data/v1/inft3050/Product?limit=1000', { headers: { 'xc-token': token } })
			.then(response => {
				const filteredData = response.data.list.filter(item =>
					item['Stocktake List'].some(stockItem => stockItem.ItemId === 50)
				);
				console.log(filteredData); // This will log the items with ItemId = 50
			})
			.catch(error => console.error('Error fetching data:', error));
		return response.data;
	} catch (error) {
		// Log the error but don't throw it, allowing the function to continue for other login attempts.
		console.warn(`Failed to fetch data from ${url}:`, error.message);
		return null; // Return null to indicate no data was found
	}
};

// Function to fetch user data from the API based on a provided URL and token
// Returns the data if the request is successful, or null if an error occurs (e.g., user not found or invalid request).
const fetchTOListData = async (url, token) => {
	try {
		const response = await axios.get(url, { headers: { 'xc-token': token } });
		return response.data;
	} catch (error) {
		// Log the error but don't throw it, allowing the function to continue for other login attempts.
		console.warn(`Failed to fetch data from ${url}:`, error.message);
		return null; // Return null to indicate no data was found
	}
};

// Function to fetch user data from the API based on a provided URL and token
// Returns the data if the request is successful, or null if an error occurs (e.g., user not found or invalid request).
const fetchOrdersData = async (url, token) => {
	try {
		const response = await axios.get(url, { headers: { 'xc-token': token } });
		return response.data;
	} catch (error) {
		// Log the error but don't throw it, allowing the function to continue for other login attempts.
		console.warn(`Failed to fetch data from ${url}:`, error.message);
		return null; // Return null to indicate no data was found
	}
};


// Function to fetch user data from the API based on a provided URL and token
// Returns the data if the request is successful, or null if an error occurs (e.g., user not found or invalid request).
const fetchStocktakeData = async (url, token) => {
	try {
		const response = await axios.get(url, { headers: { 'xc-token': token } });
		return response.data;
	} catch (error) {
		// Log the error but don't throw it, allowing the function to continue for other login attempts.
		console.warn(`Failed to fetch data from ${url}:`, error.message);
		return null; // Return null to indicate no data was found
	}
};

// Function to handle the login logic for both admin/employee and user
// Tries to log in as an admin/employee first, then as a regular user if the first attempt fails.
const processLogin = async (username, password, token) => {
	// Admin/Employee Login Attempt
	// Fetches admin/employee data using the username as the identifier.
	const adminUrl = `http://localhost:8080/api/v1/db/data/v1/inft3050/User/${username}`;
	const adminData = await fetchUserData(adminUrl, token);

	// If admin/employee data exists, compare the hashed password with the stored hash
	if (adminData && await sha256(adminData.Salt + password) === adminData.HashPW) {
		console.log("Admin/Employee login successful");
		// Return a token and user info if login is successful
		return {
			token,
			userInfo: {
				username: adminData.UserName,
				name: adminData.Name,
				email: adminData.Email,
				isAdmin: adminData.IsAdmin,
			},
		};
	}

	// Regular User Login Attempt
	// If admin/employee login fails, attempt to log in as a regular user using the email as the identifier.
	const userUrl = `http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons?where=(Email,eq,${username})`;
	const userData = await fetchUserData(userUrl, token);



	// Check if user data is found and verify the hashed password
	if (userData?.list?.length > 0) {
		const user = userData.list[0];
		if (await sha256(user.Salt + password) === user.HashPW) {
			console.log("User login successful");

			const CustomerID = user['TO List'][0].CustomerID;

			const TOListUrl = `http://localhost:8080/api/v1/db/data/v1/inft3050/TO/${CustomerID}`
			const TOListData = await fetchTOListData(TOListUrl, token);

			const ordersUrl = `http://localhost:8080/api/v1/db/data/v1/inft3050/Orders/3`
			const ordersData = await fetchOrdersData(ordersUrl, token);

			
			const stocktakeID = ordersData['Stocktake List'][0].ItemId;

			const stocktakeUrl = `http://localhost:8080/api/v1/db/data/v1/inft3050/Stocktake/${stocktakeID}`
			const stocktakeData = await fetchStocktakeData(stocktakeUrl, token);

			const stocktakeProductID = stocktakeData.ProductId;
			const productsUrl = `http://localhost:8080/api/v1/db/data/v1/inft3050/Product/${stocktakeProductID}?limit=1000`
			const productData = await fetchStocktakeData(productsUrl, token);



			// Return a token and user info if login is successful
			return {
				token,
				userInfo: {
					name: user.Name,
					email: user.Email,
					phoneNumber: TOListData.PhoneNumber,
					streetAddress: TOListData.StreetAddress,
					postCode: TOListData.PostCode,
					suburb: TOListData.Suburb,
					state: TOListData.State,
					cardNumber: TOListData.CardNumber,
					cardOwner: TOListData.CardOwner,
					cardExpiry: TOListData.Expiry,
					cvv: TOListData.CVV,
					customerNumber: user['TO List'][0].CustomerID,
					patronNumber: user['TO List'][0].PatronId,
					patron: true,
					orderAddress: ordersData.StreetAddress,
					orderPostcode: ordersData.PostCode,
					orderSuburb: ordersData.Suburb,
					orderState: ordersData.State,
					orderList: ordersData['Stocktake List'],
					productID: stocktakeData.ProductId,
					productDataItem: productData,
				},
			};
		}
	}

	// If neither admin/employee nor user login is successful, print a message and return false
	console.log("Login unsuccessful: Incorrect username or password");
	return false;
};

// Main function to handle login
// This function initializes the authentication token and calls the `processLogin` function.
const HandleLogin = async (username, password) => {
	const token = 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ';
	return processLogin(username, password, token);
};

export default HandleLogin;
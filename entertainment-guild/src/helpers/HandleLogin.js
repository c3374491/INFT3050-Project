import axios from 'axios';

// Helper function for hashing the password using SHA-256
// This function takes a message (string) as input and returns a hexadecimal string representation of the hashed value.
export async function sha256(message) {
	const msgBuffer = new TextEncoder().encode(message);
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
	return Array.from(new Uint8Array(hashBuffer))
		.map(b => b.toString(16).padStart(2, '0'))
		.join('');
}

// Function to fetch  data from the API based on a provided URL and token
// Returns the data if the request is successful, or null if an error occurs (e.g., user not found or invalid request).
const fetchData = async (url, token) => {
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
	const adminData = await fetchData(adminUrl, token);

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
				isEmploye: adminData.IsEmploye
			},
		};
	}

	// Regular User Login Attempt
	// If admin/employee login fails, attempt to log in as a regular user using the email as the identifier.
	const userUrl = `http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons?where=(Email,eq,${username})`;
	const userData = await fetchData(userUrl, token);



	// Check if user data is found and verify the hashed password
	if (userData?.list?.length > 0) {
		const user = userData.list[0];
		if (await sha256(user.Salt + password) === user.HashPW) {

			var previousOrder = null;

			try { var CustomerID = user['TO List'][0].CustomerID; }
			catch { var CustomerID = null; }
			const TOListUrl = `http://localhost:8080/api/v1/db/data/v1/inft3050/TO/${CustomerID}`
			const TOListData = await fetchData(TOListUrl, token);

			try { var orderID = TOListData['Orders List'][0].OrderID; }
			catch { orderID = null; }
			const ordersUrl = `http://localhost:8080/api/v1/db/data/v1/inft3050/Orders/${orderID}` // change 3 to customerID?
			const ordersData = await fetchData(ordersUrl, token);


			// gets the ItemId's of each item from the Order associated with the Customer - adds the ID's to an array
			var stocktakeItemIdsArray = [];
			try {
				for (var i = 0; i < ordersData['Stocktake List'].length; i++) {
					stocktakeItemIdsArray.push(ordersData['Stocktake List'][i].ItemId);
					previousOrder = true;
				}
			}
			catch {
				stocktakeItemIdsArray = null;
				previousOrder = false;
			}

			// gets the productID from the stocktake table - adds the id's to an array
			var productIDArray = [];
			try {
				for (var i = 0; i < stocktakeItemIdsArray.length; i++) {
					const stocktakeDataFromOrder = await fetchData(`http://localhost:8080/api/v1/db/data/v1/inft3050/Stocktake/${stocktakeItemIdsArray[i]}`, token);
					productIDArray.push(stocktakeDataFromOrder.ProductId);
				}
			}
			catch {
				productIDArray = null;
			}

			// gets the productdeatils from the product table - adds the details to an array
			var orderedProductsArray = [];
			try {
				for (var i = 0; i < productIDArray.length; i++) {
					var productArray = []; // Create empty array to be reused for each for-loop
					const productDataFromOrder = await fetchData(`http://localhost:8080/api/v1/db/data/v1/inft3050/Product/${productIDArray[i]}?limit=1000`, token);
					productArray.push(productDataFromOrder.Name);
					productArray.push(productDataFromOrder.Author);
					orderedProductsArray.push(productArray);
				}
			}
			catch {
				orderedProductsArray = null;
			}

			if (previousOrder) {
				var stocktakeID = ordersData['Stocktake List'][0].ItemId;

				var stocktakeUrl = `http://localhost:8080/api/v1/db/data/v1/inft3050/Stocktake/${stocktakeID}`
				var stocktakeData = await fetchData(stocktakeUrl, token);

				var stocktakeProductID = stocktakeData.ProductId;
				var productsUrl = `http://localhost:8080/api/v1/db/data/v1/inft3050/Product/${stocktakeProductID}?limit=1000`
				var productData = await fetchData(productsUrl, token);

				var orderAddress = ordersData.StreetAddress;
				var orderPostcode = ordersData.PostCode;
				var orderSuburb = ordersData.Suburb;
				var orderState = ordersData.State;
				var orderList = ordersData['Stocktake List'];
			}
			else {
				var stocktakeID = null;

				var stocktakeUrl = null;
				var stocktakeData = null;

				var stocktakeProductID = null;
				var productsUrl = null;
				var productData = null;
			}

			if (TOListData == null) {
				console.log("TOList is empty")
			}
			else { console.log(TOListData) }

			if (TOListData) {
				var phoneNumber = TOListData.PhoneNumber;
				var CVV = TOListData.CVV;
				var streetAddress = TOListData.StreetAddress;
				var postCode = TOListData.PostCode;
				var suburb = TOListData.Suburb;
				var state = TOListData.State;
				var cardNumber = TOListData.CardNumber;
				var cardOwner = TOListData.CardOwner;
				var cardExpiry = TOListData.Expiry;
				var customerNumber = user['TO List'][0].CustomerID;
				var patronNumber = user['TO List'][0].PatronId;
			}
			else {
				var phoneNumber = null;
				var CVV = null;
				var streetAddress = null;
				var postCode = null;
				var suburb = null;
				var state = null;
				var cardNumber = null;
				var cardOwner = null;
				var cardExpiry = null;
				var customerNumber = null;
				var patronNumber = null;
			}

			// Return a token and user info if login is successful
			return {
				token,
				userInfo: {
					userID: user.UserID,
					customerID: customerNumber,
					name: user.Name,
					email: user.Email,
					salt: user.Salt, // Include salt for future operations
					hashPW: user.HashPW, // Include hashPW for future operations
					isAdmin: false,
					phoneNumber,
					CVV,
					streetAddress,
					postCode,
					suburb,
					state,
					cardNumber,
					cardOwner,
					cardExpiry,
					customerNumber,
					patronNumber,
					patron: true,
					orderAddress,
					orderPostcode,
					orderSuburb,
					orderState,
					orderList,
					previousOrder,
					orderedProductsArray,

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
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

// Function to fetch user data from the API based on a provided URL and token
// Returns the data if the request is successful, or null if an error occurs (e.g., user not found or invalid request).
const fetchUserData = async (url, token) => {
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
			// Return a token and user info if login is successful
			return {
				token,
				userInfo: {
					id: user.UserID,
					name: user.Name,
					email: user.Email,
					salt: user.Salt, // Include salt for future operations
					hashPW: user.HashPW, // Include hashPW for future operations
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
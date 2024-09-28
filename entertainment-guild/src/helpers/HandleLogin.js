import axios from 'axios';

async function sha256(message) {
	// encode as UTF-8
	const msgBuffer = new TextEncoder().encode(message);

	// hash the message
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

	// convert ArrayBuffer to Array
	const hashArray = Array.from(new Uint8Array(hashBuffer));

	// convert bytes to hex string
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

	return hashHex;
}

const HandleLogin = (username, password) => {

	var token = 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ';

	return (

		// un-comment this to login as admin/employee
		/*axios.get("http://localhost:8080/api/v1/db/data/v1/inft3050/User/" + username,
			{ headers: { 'xc-token': token } })
			.then(response => {
				var salt = response.data.Salt;
				return sha256(salt + password)
					.then(input => {
						//console.log("Stored Data: ", response.data, "Stored UserName: ", response.data["UserName"], "Stored Email: ", response.data["Email"], "Stored Name: ", response.data["Name"], "Stored IsAdmin: ", response.data["IsAdmin"], "Stored Salt: ", response.data["Salt"], "Stored HashPW: ", response.data["HashPW"], "Stored product list: ", response.data["Product List"]);
						//console.log("Input Hashed: ", input);
						//console.log("Stored PW: ", response.data["HashPW"]);
						if (input === response.data.HashPW) {
							console.log("Login successful");
							return {token, userInfo: {
								username: response.data.UserName,
								name: response.data.Name,
								email: response.data.Email,
								isAdmin: response.data.IsAdmin
							}
							};
						}
						else {
							console.log("Password unsuccessful");
							return false;
						}
					});
			})
			.catch(error => {
				console.log("username or password incorrect!");
				console.error('Error fetching data:', error);
				return false;
			})*/

		// un-comment this to login as user	
		axios.get(`http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons?where=(Email,eq,${username})`,
			{ headers: { 'xc-token': token } })
			.then(response => {
				var salt = response.data.Salt;
				return sha256(salt + password)
					.then(input => {
						console.log("Input Hashed: ", input);
						console.log("Stored PW: ", response.data.list[0].HashPW);
						if (input === response.data.list[0].HashPW) {
							console.log("Login successful");
							return {
								token, userInfo: {
									name: response.data.list[0].Name,
									email: response.data.list[0].Email
								}
							};
						}
						else {
							console.log("Password unsuccessful");
							console.log("Stored: ", response.data.list[0].HashPW);
							console.log("Input: ", input);
							return false;
						}
					});
			})
			.catch(error => {
				console.log("username or password incorrect!");
				console.error('Error fetching data:', error);
				return false;
			})
	);
};

export default HandleLogin;
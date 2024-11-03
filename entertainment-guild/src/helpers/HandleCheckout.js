import axios from 'axios';

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

const HandleCheckout = async (checkoutData, authToken, cart) => {

	const token = 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ';

	for (var i = 0; i < checkoutData.length; i++) {
		console.log(i);
		console.log(checkoutData[i]);
	}
	console.log("Checkout Data: ", checkoutData);

	console.log("authToken Data: ", authToken);
	console.log(typeof authToken.userID);

	console.log("Cart Data: ", cart);

	let stocktakeList = [];

	var allProductsInOrder = {};
	for (var i = 0; i < cart.length; i++) {
		var productData = await fetchData(`http://localhost:8080/api/v1/db/data/v1/inft3050/Product/${cart[i]}?limit=1000`, token)
		var productDataFromStocktakeList = await fetchData(`http://localhost:8080/api/v1/db/data/v1/inft3050/Stocktake?where=(ProductId,eq,${cart[i]})`, token)
		console.log(productData);
		console.log("ItemId", productDataFromStocktakeList.list[0].ItemId);
		console.log("SourceId", productDataFromStocktakeList.list[0].SourceId);
		var productInOrder = {
			ItemId: productDataFromStocktakeList.list[0].ItemId,
			SourceId: productDataFromStocktakeList.list[0].SourceId,
		}
		console.log(productInOrder);
		allProductsInOrder[i] = productInOrder;
		console.log(allProductsInOrder);

		stocktakeList.push(productInOrder);
	}


	if (authToken.customerID) {
		console.log("User exists in TO List");
		const updateTOList = {
			Email: checkoutData[0],
			PhoneNumber: checkoutData[1],
			StreetAddress: checkoutData[2],
			PostCode: checkoutData[3],
			Suburb: checkoutData[4],
			State: checkoutData[5],
			CardNumber: checkoutData[7],
			CardOwner: checkoutData[6],
			CVV: 9,
		};

		console.log('Updated TO List:', updateTOList); // Log payload before sending

		// Send POST request to the API for creating the order
		try {
			const response = await axios.patch(`http://localhost:8080/api/v1/db/data/v1/inft3050/TO/${authToken.customerID}`, updateTOList, {
				headers: {
					'Content-Type': 'application/json',
					'xc-token': token,
				}
			});

			console.log('API Response:', response.data);
		}
		catch (error) {
			console.error(error.response?.data);
		}

	}
	else {
		console.log("NOT IN TOLIST");
		const newTOList = {
			PatronId: authToken.userID,
			Email: checkoutData[0],
			PhoneNumber: checkoutData[1],
			StreetAddress: checkoutData[2],
			PostCode: checkoutData[3],
			Suburb: checkoutData[4],
			State: checkoutData[5],
			CardNumber: checkoutData[7],
			CardOwner: checkoutData[6],
			CVV: 9,
		};

		console.log('New TO List:', newTOList); // Log payload before sending

		// Send POST request to the API for creating the order
		try {
			const response = await axios.post('http://localhost:8080/api/v1/db/data/v1/inft3050/TO', newTOList, {
				headers: {
					'Content-Type': 'application/json',
					'xc-token': token,
				}
			});

			console.log('API Response:', response.data);
		}
		catch (error) {
			console.error(error.response?.data);
		}
	}


	const newOrder = {
		customer: authToken.customerID,
		StreetAddress: checkoutData[2],
		PostCode: checkoutData[3],
		Suburb: checkoutData[4],
		State: checkoutData[5]
	};

	console.log('New Order:', newOrder); // Log payload before sending

	// Send POST request to the API for creating the order
	try {
		const response = await axios.post('http://localhost:8080/api/v1/db/data/v1/inft3050/Orders', newOrder, {
			headers: {
				'Content-Type': 'application/json',
				'xc-token': token,
			}
		});

		console.log('API Response:', response.data);
	}
	catch (error) {
		console.error(error.response?.data);
	}
};

export default HandleCheckout;
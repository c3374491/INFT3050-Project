import axios from 'axios';

const fetchPreviousOrderData = async (url, token) => {
	try {
		const response = await axios.get(url, { headers: { 'xc-token': token } });
		return response.data;
	} catch (error) {
		// Log the error but don't throw it, allowing the function to continue for other login attempts.
		console.warn(`Failed to fetch data from ${url}:`, error.message);
		return null; // Return null to indicate no data was found
	}
};

const moreGetOrder = async () => {
	const token = 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ';

	const productsUrl = `http://localhost:8080/api/v1/db/data/v1/inft3050/Product/50?limit=1000`
	const previousOrderData = await fetchPreviousOrderData(productsUrl, token);

	console.log(previousOrderData);
	console.log(previousOrderData.Name);

	const output = previousOrderData;

	return output;
};

const RetrievePreviousOrder = () => {

	return ( 
		<div>
			<ol>
				<li><strong>Title one</strong> by <em>Author one</em></li>
				<li><strong>Title two</strong> by <em>Author two</em></li>
				<li><strong>Title three</strong> by <em>Author three</em></li>
			</ol>
		</div>
	 
)
};

export default RetrievePreviousOrder;
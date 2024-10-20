import React from 'react';
import { Typography, Box, Button, Card } from '@mui/material';
import HandleCookies from '../helpers/HandleCookies';
import { useNavigate } from 'react-router-dom';
import ProductList from '../component/ProductList';

const Profile = () => {

	const { authToken, clearAuthToken } = HandleCookies();

	const navigate = useNavigate();

	function handleLogout() {
		clearAuthToken();
		navigate('/');
	};

	const arrayDataItems = authToken.orderList.map(order =>
		<li key={order.ItemId}>
			<p>{order.ItemId}</p>
			<p>{order.SourceId}</p>
		</li>)

	return (
		<Box display="flex" justifyContent="center">
			{authToken && (
				<Box>
					<h1>{authToken.username} Profile Page</h1>
					<Box>
						<Typography variant="h6">Welcome, {authToken.name}!</Typography>

						<Card variant='outlined'>
							<Typography variant='h5'>User Details</Typography>
							<hr />
							<Typography variant="body1">Name: {authToken.name || "No Name"}</Typography>
							<Typography variant="body1">Email: {authToken.email || "No Email Address"}</Typography>
							<Typography variant="body1">Phone Number: {authToken.phoneNumber || "No Phone Number"}</Typography>
							<Typography variant="body1">Address: {authToken.streetAddress || "No Address"}</Typography>
							<Typography variant="body1">Postcode: {authToken.postCode || "No Postcode"}</Typography>
							<Typography variant="body1">Suburb: {authToken.suburb || "No Suburb"}</Typography>
							<Typography variant="body1">State: {authToken.state || "No State"}</Typography>
						</Card>

						{authToken.patron && (
							<Card variant='outlined'>
								<Typography variant='h5'>Card Details</Typography>
								<hr />
								<Typography variant="body1">Card Number: {authToken.cardNumber || "No Card Number"}</Typography>
								<Typography variant="body1">Cardholder Name: {authToken.cardOwner || "No Card Owner"}</Typography>
								<Typography variant="body1">Expiry Date &#40;mm/yy&#41;: {authToken.expiry || "No Card Expiry"}</Typography>
								<Typography variant="body1">Card Verification Value &#40;CVV&#41;: {authToken.cvv || "No Card CVV"}</Typography>
								<Typography variant="body1"></Typography>
							</Card>)}

						{authToken.patron && (
							<Card variant='outlined'>
								<Typography variant='h5'>Previous Orders</Typography>
								<hr />
								<Typography variant="body1">Delivery Address: {authToken.orderAddress || "No Delivery Address"}</Typography>
								<Typography variant="body1">Delivery Postcode: {authToken.orderPostcode || "No Delivery Postcode"}</Typography>
								<Typography variant="body1">Delivery Suburb: {authToken.orderSuburb || "No Delivery Suburb"}</Typography>
								<Typography variant="body1">Delivery State: {authToken.orderState || "No Delivery State"}</Typography>
								<Typography variant="body1"></Typography>
							</Card>)}

						<ul>{arrayDataItems}</ul>

						// trying to display products from previous orders
						<ProductList
							apiUrl='http://localhost:8080/api/v1/db/data/v1/inft3050/Product/50'
							genre={1}
							searchTerm={""}
						/>

						<Typography variant="body1">Admin Status: {authToken.isAdmin ? "Yes" : "No"}</Typography>
					</Box>
					<Button variant="outlined" onClick={handleLogout}>Log Out</Button>
				</Box>
			)}
		</Box>

	);
}

export default Profile;
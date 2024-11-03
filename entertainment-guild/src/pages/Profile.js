import React from 'react';
import { Typography, Box, Button, Card, Accordion, AccordionDetails, AccordionSummary, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HandleCookies from '../helpers/HandleCookies';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {

	const { authToken, clearAuthToken } = HandleCookies();

	const navigate = useNavigate();

	function handleLogout() {
		clearAuthToken();
		navigate('/');
	}

  function handleManageAccountPassword() {
    navigate('/ManageAccountPassword'); // Navigate to the ManageAccount.js page
  }

  function handleManageAccountDetails() {
    navigate('/ManageAccountDetails'); // Navigate to the ManageAccount.js page
  }

	if (authToken) { var itemNameFromOrder = authToken.orderedProductsArray; }
	else { var itemNameFromOrder = null; }

	return (
		<Box display="flex" justifyContent="center" float="center" justifySelf="center">
			{authToken ? (
				<Box>
					<h1>{authToken.username} Profile Page</h1>
					{authToken.isAdmin && (<Alert severity="warning">CAUTION: You are logged in as an Admin!</Alert>)}
					{authToken.isEmploye && (<Alert severity="warning">CAUTION: You are logged in as an Employe!</Alert>)}
					<br />
					<Box>
						<Typography variant="h5" justifySelf="center">Welcome, {authToken.name}!</Typography>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1-content"
								id="panel1-header"
								sx={{ backgroundColor: '#c4c4c4', color: '#393939' }}
							>
								<Typography variant='h5'>User Details</Typography>
							</AccordionSummary>
							<AccordionDetails sx={{ backgroundColor: '#dfdfdf' }}>
								<Typography variant="body1">Name: {authToken.name || "No Name"}</Typography>
								<Typography variant="body1">Email: {authToken.email || "No Email Address"}</Typography>
								<Typography variant="body1">Phone Number: {authToken.phoneNumber || "No Phone Number"}</Typography>
								<Typography variant="body1">Address: {authToken.streetAddress || "No Address"}</Typography>
								<Typography variant="body1">Postcode: {authToken.postCode || "No Postcode"}</Typography>
								<Typography variant="body1">Suburb: {authToken.suburb || "No Suburb"}</Typography>
								<Typography variant="body1">State: {authToken.state || "No State"}</Typography>
							</AccordionDetails>
						</Accordion>

						{authToken.patron && (
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1-content"
									id="panel1-header"
									sx={{ backgroundColor: '#c4c4c4', color: '#393939' }}
								>
									<Typography variant='h5'>Card Details</Typography>
								</AccordionSummary>
								<AccordionDetails sx={{ backgroundColor: '#dfdfdf' }}>
									<Typography variant="body1">Card Number: {authToken.cardNumber || "No Card Number"}</Typography>
									<Typography variant="body1">Cardholder Name: {authToken.cardOwner || "No Card Owner"}</Typography>
									<Typography variant="body1">Expiry Date &#40;mm/yy&#41;: {authToken.cardExpiry || "No Card Expiry"}</Typography>
									<Typography variant="body1">Card Verification Value &#40;CVV&#41;: {authToken.CVV || "No Card CVV"}</Typography>
								</AccordionDetails>
							</Accordion>)}

						{authToken.patron && authToken.previousOrder && (
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1-content"
									id="panel1-header"
									sx={{ backgroundColor: '#c4c4c4', color: '#393939' }}
								>
									<Typography variant='h5'>Previous Order</Typography>
								</AccordionSummary>
								<AccordionDetails sx={{ backgroundColor: '#dfdfdf' }}>
									<Typography variant='h6' sx={{ textDecoration: "underline" }}>Delivery Details</Typography>
									<Typography variant="body1">Delivery Address: {authToken.orderAddress || "No Delivery Address"}</Typography>
									<Typography variant="body1">Delivery Postcode: {authToken.orderPostcode || "No Delivery Postcode"}</Typography>
									<Typography variant="body1">Delivery Suburb: {authToken.orderSuburb || "No Delivery Suburb"}</Typography>
									<Typography variant="body1">Delivery State: {authToken.orderState || "No Delivery State"}</Typography>
									<br />
									<Typography variant="h6" sx={{ textDecoration: "underline" }}>Item Details</Typography>
									<ol>{itemNameFromOrder.map((item) => <li><strong>{item[0]}</strong> by <em>{item[1]}</em></li>) || "No Items"}</ol>
								</AccordionDetails>
							</Accordion>
						)}

					</Box>
					<br />
                    {/* Manage Password Button */}
                    <Box mt={2}>
                        <Button variant="outlined" fullWidth onClick={handleManageAccountPassword}>
                            Manage Password
                        </Button>
                    </Box>

                    {/* Manage Details Button */}
                    <Box mt={2}>
                        <Button variant="outlined" fullWidth onClick={handleManageAccountDetails}>
                            Manage Account Details
                        </Button>
                    </Box>

					{/* Log Out Button */}
					<Box mt={2}>
						<Button variant="outlined" fullWidth onClick={handleLogout}>
							Log Out
						</Button>
					</Box>
				</Box>
			) : (
				<Box>
					<br />
					<Alert variant="outlined" severity="error">You are not logged in. Please <Link to="/login">login</Link> to view your profile.</Alert>
				</Box>
			)}
		</Box>
	);
}

export default Profile;
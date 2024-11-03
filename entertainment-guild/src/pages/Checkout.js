import { Box, FormControl, FormGroup, TextField, Button, InputLabel, Select, MenuItem, Typography, Alert } from '@mui/material';
import React from 'react';
import HandleCookies from '../helpers/HandleCookies';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import HandleCheckout from '../helpers/HandleCheckout';

const Checkout = () => {

	const { authToken, cart, clearCart } = HandleCookies();

	const navigate = useNavigate();

	function handleClearCart() {
		clearCart();
		navigate('/ordercompletion');
	}

	const [email, setEmail] = useState(authToken.email || "");
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	}

	const [phoneNumber, setPhoneNumber] = useState(authToken.phoneNumber || "");
	const handlePhoneNumberChange = (event) => {
		const val = event.target.value;

		if (val.match(/[^0-9]/)) {
			return event.preventDefault();
		}
		setPhoneNumber(event.target.value);
	}

	const [address, setAddress] = useState(authToken.streetAddress || "");
	const handleAddressChange = (event) => {
		setAddress(event.target.value);
	}

	const [suburb, setSuburb] = useState(authToken.suburb || "");
	const handleSuburbChange = (event) => {
		setSuburb(event.target.value);
	}
	
	const [postcode, setPostcode] = useState(authToken.postCode || "");
	const handlePostcodeChange = (event) => {
		const val = event.target.value;

		if (val.match(/[^0-9]/)) {
			return event.preventDefault();
		}
		setPostcode(event.target.value);
	}

	const [state, setState] = useState(authToken.state || "");
	const handleStateChange = (event) => {
		setState(event.target.value);
	}

	const [nameOnCard, setNameOnCard] = useState(authToken.cardOwner || "");
	const handleNameOnCardChange = (event) => {
		setNameOnCard(event.target.value);
	}

	const [cardNumber, setCardNumber] = useState(authToken.cardNumber || "");
	const handleCardNumberChange = (event) => {
		const val = event.target.value;

		if (val.match(/[^0-9]/)) {
			return event.preventDefault();
		}
		setCardNumber(event.target.value);
	}

	const [cardExpiry, setCardExpiry] = useState();
	const handleCardExpiryChange = (newCardExpiry) => {
		setCardExpiry(newCardExpiry);
	}

	const [CVV, setCVV] = useState("");
	const handleCVVChange = (event) => {
		const val = event.target.value;

		if (val.match(/[^0-9]/)) {
			return event.preventDefault();
		}

		setCVV(event.target.value);
	}

	async function handleSubmit(event) {
		handleClearCart();
		event.preventDefault(); //Prevent reloading of the page
		HandleCheckout([email, phoneNumber, address, postcode, suburb, state, nameOnCard, cardNumber, cardExpiry, CVV], authToken, cart);
		console.log("form submitted: ", [email, phoneNumber, address, postcode, suburb, state, nameOnCard, cardNumber, cardExpiry, CVV]);
		// navigate('/profile'); -- after submit take to completed page
	}

	return (
		<Box display="flex" justifyContent="center" float="center" justifySelf="center">
			{cart.length == 0 ? (
				<Box>
					<br />
					<Alert variant="outlined" severity="warning">
						<Typography variant='h6'>There are no items in your cart to checkout.</Typography>
						<Typography variant='body1'>Search our extensive list of <Link to="/books">Books</Link>, <Link to="/games">Games</Link>, and <Link to="/movies">Movies</Link>!</Typography>
						<Typography variant='body1'>or go back to the <Link to="/">Home Page!</Link></Typography>
					</Alert>
				</Box>
			) : (
				<Box>
					{authToken.isAdmin && (<div><br /> <Alert severity="error">CAUTION: You are logged in as an Admin!</Alert></div>)}
					<h1>Checkout</h1>
					<Typography variant='h6'>Contact Details</Typography>
					<form method="post" onSubmit={handleSubmit}>
						<FormGroup>
							<FormControl>
								<TextField
									required
									id="email-field"
									label="Contact Email"
									variant="outlined"
									autoComplete="email"
									value={email}
									onChange={handleEmailChange} />
							</FormControl>
							<br />
							<FormControl>
								<TextField
									required
									id="phoneNumber-field"
									label="Phone Number"
									variant="outlined"
									autoComplete="phoneNumber"
									value={phoneNumber}
									onChange={handlePhoneNumberChange}
									inputProps={{ maxLength: 10, min: 10, max: 10 }}
								/>
							</FormControl>
							<br />
							<Typography variant='h6'>Delivery Details</Typography>
							<FormControl>
								<TextField
									required
									id="address-field"
									label="Address"
									variant="outlined"
									autoComplete="address"
									value={address}
									onChange={handleAddressChange} />
							</FormControl>
							<br />
							<FormControl>
								<TextField
									required
									id="suburb-field"
									label="Suburb"
									variant="outlined"
									autoComplete="suburb"
									value={suburb}
									onChange={handleSuburbChange} />
							</FormControl>
							<br />
							<FormControl>
								<TextField
									required
									id="postcode-field"
									label="Postcode"
									variant="outlined"
									autoComplete="postcode"
									value={postcode}
									onChange={handlePostcodeChange}
									inputProps={{ maxLength: 4, min: 4, max: 4 }}
								/>
							</FormControl>
							<br />
							<FormControl>
								<InputLabel>State *</InputLabel>
								<Select
									required
									value={state}
									label="State *"
									onChange={handleStateChange}
									autoComplete="state">
									<MenuItem value="ACT">ACT</MenuItem>
									<MenuItem value="NSW">NSW</MenuItem>
									<MenuItem value="NT">NT</MenuItem>
									<MenuItem value="QLD">QLD</MenuItem>
									<MenuItem value="SA">SA</MenuItem>
									<MenuItem value="TAS">TAS</MenuItem>
									<MenuItem value="WA">WA</MenuItem>
									<MenuItem value="VIC">VIC</MenuItem>
								</Select>
							</FormControl>
							<br />
							<Typography variant='h6'>Payment Details</Typography>
							<FormControl>
								<TextField
									required
									id="nameOnCard-field"
									label="Name on Card"
									variant="outlined"
									autoComplete="nameOnCard"
									value={nameOnCard}
									onChange={handleNameOnCardChange} />
							</FormControl>
							<br />
							<FormControl>
								<TextField
									required
									id="cardNumber-field"
									label="Card Number"
									variant="outlined"
									autoComplete="cardNumber"
									value={cardNumber}
									onChange={handleCardNumberChange}
									inputProps={{ maxLength: 16, min: 16, max: 16 }}
								/>
							</FormControl>
							<br />
							<FormControl>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DateField
										format="MM/YY"
										label="Card Exipry"
										required
										id="cardExpiry-field"
										variant="outlined"
										autoComplete="cardExpiry"
										value={cardExpiry}
										defaultValue={cardExpiry}
										onChange={handleCardExpiryChange}
									/>
								</LocalizationProvider>
							</FormControl>
						</FormGroup>
						<br />
						<FormControl>
							<TextField
								required
								id="cvv-field"
								label="CVV (Card Verification Value)"
								variant="outlined"
								autoComplete="CVV"
								value={CVV}
								onChange={handleCVVChange} 
								inputProps={{ maxLength: 3, min: 3, max: 3 }}/>
						</FormControl>
						<br /><br />
						<Box >
							<Button type="submit" variant="outlined">Submit</Button>
						</Box>
					</form><br />
				</Box>
			)}
		</Box>
	);
}

export default Checkout;
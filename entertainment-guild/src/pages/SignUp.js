// SignUp.js
// Author: Liam Kimberley || C3375248
// Last Updated: 26/10/2024

import React, { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import HandleCookies from '../helpers/HandleCookies';
import { sha256 } from '../helpers/HandleLogin';

const SignUp = () => {
	const { setAuthToken } = HandleCookies();
	const [formData, setFormData] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
		PhoneNumber: '',
		StreetAddress: '',
		PostCode: '',
		Suburb: '',
		State: ''
	});
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState('');

	// Function to generate a shorter salt (16 characters) 
	const generateShorterSalt = (length = 16) => {
		return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
	};

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Basic password validation
		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		try {
			// Check if email already exists
			const emailCheckResponse = await axios.get(`http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons?Email=${formData.email}`, {
				headers: {
					'Content-Type': 'application/json',
					'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ',
				}
			});

			if (emailCheckResponse.data.length > 0) {
				setError('An account with this email already exists.');
				return;
			}

			// Generate Salt and Hash the password
			const salt = generateShorterSalt(16);
			const hashPW = await sha256(salt + formData.password);

			const newPatron = {
				Email: formData.email,
				Name: formData.name,
				Salt: salt,
				HashPW: hashPW
			};

			await axios.post('http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons', newPatron, {
				headers: {
					'Content-Type': 'application/json',
					'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ',
				}
			});

			const newTOEntry = {
				Email: formData.email,
				PhoneNumber: formData.PhoneNumber,
				StreetAddress: formData.StreetAddress,
				PostCode: formData.PostCode,
				Suburb: formData.Suburb,
				State: formData.State
			};

			await axios.post('http://localhost:8080/api/v1/db/data/v1/inft3050/TO', newTOEntry, {
				headers: {
					'Content-Type': 'application/json',
					'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ',
				}
			});

			// Set auth token and success message
			setSuccessMessage('Account created successfully! You can now log in.');
			setError(null);
			setFormData({
				email: '',
				name: '',
				password: '',
				confirmPassword: '',
				PhoneNumber: '',
				StreetAddress: '',
				PostCode: '',
				Suburb: '',
				State: ''
			});
		} catch (error) {
			console.error('Sign up failed', error);
			setError(error.response?.data?.msg || 'Failed to create account. Please try again.');
		}
	};

	return (
		<div>
			<h1>Sign Up Page</h1>
			<Box>
				<Typography variant="h4">CREATE AN ACCOUNT!</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						label="Email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						required
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Name"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						required
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Password"
						name="password"
						type="password"
						value={formData.password}
						onChange={handleInputChange}
						required
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Confirm Password"
						name="confirmPassword"
						type="password"
						value={formData.confirmPassword}
						onChange={handleInputChange}
						required
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Phone Number"
						name="PhoneNumber"
						value={formData.PhoneNumber}
						onChange={handleInputChange}
						required
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Street Address"
						name="StreetAddress"
						value={formData.StreetAddress}
						onChange={handleInputChange}
						required
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Post Code"
						name="PostCode"
						value={formData.PostCode}
						onChange={handleInputChange}
						required
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Suburb"
						name="Suburb"
						value={formData.Suburb}
						onChange={handleInputChange}
						required
						fullWidth
						margin="normal"
					/>
					<TextField
						label="State"
						name="State"
						value={formData.State}
						onChange={handleInputChange}
						required
						fullWidth
						margin="normal"
					/>
					<Button type="submit" variant="contained" color="primary">
						Sign Up
					</Button>
				</form>
				{error && <Typography color="error">{error}</Typography>}
				{successMessage && <Typography color="primary">{successMessage}</Typography>}
			</Box>
		</div>
	);
};

export default SignUp;

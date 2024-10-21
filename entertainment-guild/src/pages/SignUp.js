// SignUp.js
// Author: Liam Kimberley || C3375248
// Last Updated: 19/10/2024

import React, { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import HandleCookies from '../helpers/HandleCookies';
import { sha256 } from '../helpers/HandleLogin'; // Named import for sha256

const SignUp = () => {
	const { setAuthToken } = HandleCookies();
	const [formData, setFormData] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: ''
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
			// Generate Salt and Hash the password
			const salt = generateShorterSalt(16); // Generating a shorter 16-character salt
			const hashPW = await sha256(salt + formData.password);

			console.log('Generated HashPW:', hashPW); // Debugging line to check hashed password

			// Prepare payload for the API request
			const newPatron = {
				Email: formData.email,
				Name: formData.name,
				Salt: salt,
				HashPW: hashPW // This should be the correct hashed password
			};

			console.log('New Patron:', newPatron); // Log payload before sending

			// Send POST request to the API for creating the account
			const response = await axios.post('http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons', newPatron, {
				headers: {
					'Content-Type': 'application/json',
					'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ', // Auth token for API
				}
			});

			console.log('API Response:', response.data); // Log API response

			// If successful, set auth token and success message
			setAuthToken(response.data.token); // Assuming the API sends back a token
			setSuccessMessage('Account created successfully! You can now log in.');
			setError(null); // Clear any previous errors
			setFormData({ email: '', name: '', password: '', confirmPassword: '' }); // Reset form
		} catch (error) {
			console.error('Sign up failed');
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
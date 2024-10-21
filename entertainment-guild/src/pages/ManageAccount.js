// ManageAccount.js
// Author: Liam Kimberley || C3375248
// Last Updated: 21/10/2024

import React, { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import HandleCookies from '../helpers/HandleCookies';
import { sha256 } from '../helpers/HandleLogin'; // Named import for sha256

const ManageAccount = () => {
    const { authToken, setAuthToken } = HandleCookies();
    const [formData, setFormData] = useState({
        name: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        try {
            // Hash the current password for verification
            const hashedCurrentPassword = await sha256(authToken.salt + formData.currentPassword);
            console.log('Stored salt:', authToken.salt);
            console.log('Hashed Current Password:', hashedCurrentPassword); // Log hashed current password
            console.log('Stored Hashed Password:', authToken.hashPW); // Log stored hashed password for comparison

            // Check if the current password matches the one in the auth token (hashed)
            if (hashedCurrentPassword !== authToken.hashPW) {
                setError('Current password is incorrect');
                return;
            }

            // Hash the new password
            const newHashedPassword = await sha256(authToken.salt + formData.newPassword);

            // Prepare the updated user data
            const updatedUser = {
                Name: formData.name,
                HashPW: newHashedPassword,
                salt: authToken.salt // Ensure to keep the salt
            };

            // Send PUT request to update user information
            const response = await axios.put(
                `http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons/${authToken.id}`,
                updatedUser,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ' // Auth token for API
                    }
                }
            );

            console.log('API Response:', response.data); // Log the API response

            // Setting the updated token with valid structure
            const updatedToken = { 
                ...authToken, 
                name: formData.name, 
                hashPW: newHashedPassword // Ensure you're passing the new hashed password correctly
            };

            // Setting the updated token
            setAuthToken(updatedToken); // This will store the updated token in cookies

            setSuccessMessage('Account updated successfully!');
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Update failed:', error);
            setError(error.response?.data?.msg || 'Failed to update account. Please try again.');
        }
    };

    return (
        <div>
            <h1>Manage Account</h1>
            <Box>
                <Typography variant="h4">UPDATE YOUR ACCOUNT</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Current Password"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Update Account
                    </Button>
                </form>
                {error && <Typography color="error">{error}</Typography>}
                {successMessage && <Typography color="primary">{successMessage}</Typography>}
            </Box>
        </div>
    );
};

export default ManageAccount;

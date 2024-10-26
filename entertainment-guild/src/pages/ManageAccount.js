// ManageAccount.js
// Author: Liam Kimberley || C3375248
// Last Updated: 26/10/2024

import React, { useState, useEffect } from 'react';
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

    // Check if authToken and user ID are available
    useEffect(() => {
        if (!authToken || !authToken.id) { 
            setError('User ID not found. Please log in again.');
        }
    }, [authToken]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for authToken and user ID before proceeding
        if (!authToken || !authToken.id) { // Check for userID
            setError('Unable to update account. Missing user ID.');
            return;
        }

        // Basic validation for passwords
        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        try {
            // Hash the current password for verification
            const hashedCurrentPassword = await sha256(authToken.salt + formData.currentPassword);

            // Check if the current password matches the one in the authToken (hashed)
            if (hashedCurrentPassword !== authToken.hashPW) {
                setError('Current password is incorrect');
                return;
            }

            // Hash the new password
            const newHashedPassword = await sha256(authToken.salt + formData.newPassword);

            // Prepare the updated user data
            const updatedUser = {
                UserID: authToken.id,
                Name: formData.name || undefined, // Only include if a name is provided
                HashPW: newHashedPassword,
                Salt: authToken.salt // Keep the salt
            };

            // Use a PATCH request to the correct URL using the patron's UserID as the identifier
            const response = await axios.patch(
                `http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons/${authToken.id}`, // Use UserID in the URL path
                updatedUser,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ' // Auth token for API
                    }
                }
            );

            // Update the token with the new hashed password and name
            const updatedToken = { 
                ...authToken, 
                name: formData.name || authToken.name, // Use previous name if no new name is provided
                hashPW: newHashedPassword // Ensure you're passing the new hashed password correctly
            };

            // Set the updated token in cookies
            setAuthToken(updatedToken);

            setSuccessMessage('Account updated successfully!');
            setError(null); // Clear any previous errors
        } catch (error) {
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

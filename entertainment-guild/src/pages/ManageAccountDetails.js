// ManageAccount.js
// Author: Liam Kimberley || C3375248
// Last Updated: 02/11/2024

import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import HandleCookies from '../helpers/HandleCookies';
import PatronDeletePopup from '../component/PatronDeletePopup';

const ManageAccountDetails = () => {
    const { authToken, setAuthToken } = HandleCookies();
    const [formData, setFormData] = useState({
        name: '', 
        PhoneNumber: '',
        StreetAddress: '',
        PostCode: '',
        Suburb: '',
        State: ''
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [openDeletePopup, setOpenDeletePopup] = useState(false);

    // Check if authToken is available
    useEffect(() => {
        if (!authToken || !authToken.email) { 
            setError('User email not found. Please log in again.');
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

        if (!authToken || !authToken.email) { 
            setError('Unable to update account. Missing user email.');
            return;
        }

        try {
            // Prepare updated data for Patrons and TO tables
            const updatedPatron = {
                Email: authToken.email,
                Name: formData.name || undefined, // Only include if a name is provided
            };

            const updatedTO = {
                Email: authToken.email,
                PhoneNumber: formData.PhoneNumber || undefined,
                StreetAddress: formData.StreetAddress || undefined,
                PostCode: formData.PostCode || undefined,
                Suburb: formData.Suburb || undefined,
                State: formData.State || undefined
            };

            // Update in Patrons table
            await axios.patch(
                `http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons/${authToken.id}`,
                updatedPatron,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                }
            );

            // Update in TO table
            await axios.patch(
                `http://localhost:8080/api/v1/db/data/v1/inft3050/TO/${authToken.customerID}`,
                updatedTO,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                }
            );

            // Update auth token with new name, if provided
            const updatedToken = {
                ...authToken,
                name: formData.name || authToken.name
            };
            setAuthToken(updatedToken);

            setSuccessMessage('Account updated successfully!');
            setError(null);
        } catch (error) {
            console.error('Update failed', error);
            setError(error.response?.data?.msg || 'Failed to update account. Please try again.');
        }
    };

    const handleDeleteAccount = () => {
        setOpenDeletePopup(true);
    };

    const handleClosePopup = () => {
        setOpenDeletePopup(false);
    };

    return (
        <div>
            <h1>Manage Account Details</h1>
            <Box>
                <Typography variant="h4">UPDATE YOUR DETAILS</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        defaultValue={authToken.Name}
                        value={formData.name}
                        onChange={handleInputChange}
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
                    <Button type="submit" variant="contained" fullWidth color="primary">
                        Update Account
                    </Button>
                    <Box mt={2}>
                        <Button variant="contained" fullWidth color="error" onClick={handleDeleteAccount}>
                            Delete Account
                        </Button>
                    </Box>
                </form>
                {error && <Typography color="error">{error}</Typography>}
                {successMessage && <Typography color="primary">{successMessage}</Typography>}
            </Box>
            <PatronDeletePopup open={openDeletePopup} onClose={handleClosePopup} />
        </div>
    );
};

export default ManageAccountDetails;

// ManageAccount.js
// Author: Liam Kimberley || C3375248
// Last Updated: 02/11/2024

import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
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
    const [error, setError] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [openDeletePopup, setOpenDeletePopup] = useState(false);

    // Check if authToken is available
    useEffect(() => {
        if (!authToken || !authToken.email) { 
            setError({ general: 'User email not found. Please log in again.' });
        }
    }, [authToken]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Validation functions
    const validateFields = () => {
        const newErrors = {};

        // Validate Street Address (contains both letters and numbers)
        if (!/\d/.test(formData.StreetAddress) || !/[a-zA-Z]/.test(formData.StreetAddress)) {
            newErrors.StreetAddress = 'Address must contain both letters and numbers (e.g., 377 Ring Road)';
        }

        // Validate Post Code (only numbers)
        if (!/^\d+$/.test(formData.PostCode)) {
            newErrors.PostCode = 'Post code must contain numbers only';
        }

        // Validate State (must be selected)
        if (!formData.State) {
            newErrors.State = 'Please select a state';
        }

        setError(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!authToken || !authToken.email) { 
            setError({ general: 'Unable to update account. Missing user email.' });
            return;
        }

        if (!validateFields()) {
            return; // Stop submission if validation fails
        }

        try {
            const updatedPatron = {
                Email: authToken.email,
                Name: formData.name || undefined,
            };

            const updatedTO = {
                Email: authToken.email,
                PhoneNumber: formData.PhoneNumber || undefined,
                StreetAddress: formData.StreetAddress || undefined,
                PostCode: formData.PostCode || undefined,
                Suburb: formData.Suburb || undefined,
                State: formData.State || undefined
            };

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

            const updatedToken = {
                ...authToken,
                name: formData.name || authToken.name
            };
            setAuthToken(updatedToken);

            setSuccessMessage('Account updated successfully!');
            setError({});
        } catch (error) {
            console.error('Update failed', error);
            setError({ general: error.response?.data?.msg || 'Failed to update account. Please try again.' });
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
                        defaultValue={authToken.name}
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
                        error={!!error.StreetAddress}
                        helperText={error.StreetAddress}
                    />
                    <TextField
                        label="Post Code"
                        name="PostCode"
                        value={formData.PostCode}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                        error={!!error.PostCode}
                        helperText={error.PostCode}
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
                    <FormControl fullWidth margin="normal" required error={!!error.State}>
                        <InputLabel>State</InputLabel>
                        <Select
                            name="State"
                            value={formData.State}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="NSW">New South Wales</MenuItem>
                            <MenuItem value="VIC">Victoria</MenuItem>
                            <MenuItem value="QLD">Queensland</MenuItem>
                            <MenuItem value="WA">Western Australia</MenuItem>
                            <MenuItem value="SA">South Australia</MenuItem>
                            <MenuItem value="TAS">Tasmania</MenuItem>
                            <MenuItem value="ACT">Australian Capital Territory</MenuItem>
                            <MenuItem value="NT">Northern Territory</MenuItem>
                        </Select>
                        {error.State && <FormHelperText>{error.State}</FormHelperText>}
                    </FormControl>
                    <Button type="submit" variant="contained" fullWidth color="primary">
                        Update Account
                    </Button>
                    <Box mt={2}>
                        <Button variant="contained" fullWidth color="error" onClick={handleDeleteAccount}>
                            Delete Account
                        </Button>
                    </Box>
                </form>
                {error.general && <Typography color="error">{error.general}</Typography>}
                {successMessage && <Typography color="primary">{successMessage}</Typography>}
            </Box>
            <PatronDeletePopup open={openDeletePopup} onClose={handleClosePopup} />
        </div>
    );
};

export default ManageAccountDetails;

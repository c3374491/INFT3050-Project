// SignUp.js
// Author: Liam Kimberley || C3375248
// Last Updated: 26/10/2024

import React, { useState } from 'react';
import { Typography, Box, TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';
import HandleCookies from '../helpers/HandleCookies';
import { sha256 } from '../helpers/HandleLogin';

const STATES = [
    "New South Wales",
    "Victoria", 
    "Queensland", 
    "South Australia", 
    "Western Australia", 
    "Tasmania", 
    "Australian Capital Territory", 
    "Northern Territory", 
];

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
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const generateShorterSalt = (length = 16) => {
        return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        let tempErrors = {};

        // Address validation
        if (!/\d+/.test(formData.StreetAddress) || !/[A-Za-z]/.test(formData.StreetAddress)) {
            tempErrors.StreetAddress = 'Address must contain both letters and numbers.';
        }

        // Post Code validation
        if (!/^\d+$/.test(formData.PostCode)) {
            tempErrors.PostCode = 'Post Code must contain numbers only.';
        }

        // State validation
        if (!STATES.includes(formData.State)) {
            tempErrors.State = 'Please select a valid Australian state or territory.';
        }

        // Password match validation
        if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const emailCheckResponse = await axios.get(`http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons?Email=${formData.email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ',
                }
            });

            if (emailCheckResponse.data.length > 0) {
                setErrors({ email: 'An account with this email already exists.' });
                return;
            }

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

            setSuccessMessage('Account created successfully! You can now log in.');
            setErrors({});
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
            setErrors({ form: error.response?.data?.msg || 'Failed to create account. Please try again.' });
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
                        error={!!errors.email}
                        helperText={errors.email}
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
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
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
                        error={!!errors.StreetAddress}
                        helperText={errors.StreetAddress}
                    />
                    <TextField
                        label="Post Code"
                        name="PostCode"
                        value={formData.PostCode}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                        error={!!errors.PostCode}
                        helperText={errors.PostCode}
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
                        select
                        label="State"
                        name="State"
                        value={formData.State}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="normal"
                        error={!!errors.State}
                        helperText={errors.State}
                    >
                        {STATES.map((state) => (
                            <MenuItem key={state} value={state}>
                                {state}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button type="submit" variant="contained" color="primary">
                        Sign Up
                    </Button>
                </form>
                {errors.form && <Typography color="error">{errors.form}</Typography>}
                {successMessage && <Typography color="primary">{successMessage}</Typography>}
            </Box>
        </div>
    );
};

export default SignUp;

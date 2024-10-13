import React from 'react';
import { Typography, Box } from '@mui/material';
import HandleCookies from '../helpers/HandleCookies';

const SignUp = () => {

	const { authToken } = HandleCookies();

	return (
		<div>
			<h1>Sign Up Page</h1>
			<Box>
				<Typography variant="h4">CREATE AN ACCOUNT!</Typography>
			</Box>
		</div>
	);
}

export default SignUp;
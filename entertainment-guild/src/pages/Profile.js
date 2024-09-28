import React from 'react';
import { Typography, Box, Button, Card } from '@mui/material';
import HandleCookies from '../helpers/HandleCookies';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

	const { authToken, clearAuthToken } = HandleCookies();

	const navigate = useNavigate();

	function handleLogout() {
		clearAuthToken();
		navigate('/');
	};

	return (
		<Box display="flex" justifyContent="center">
			{authToken && (
				<Box>
					<h1>{/*UNCOMMENT THIS FOR ADMIN {authToken.username}*/} Profile Page</h1>
					<Box>
						<Typography variant="h6">Welcome, {authToken.name}!</Typography>
						<Typography variant="body1">Email: {authToken.email}</Typography>
						<Typography variant="body1"><li> {authToken.TOList}</li></Typography>

						{/*UN-COMMENT THIS TO DISPLAY YES/NO ON "ISADMIN" <Typography variant="body1">Admin Status: {authToken.isAdmin ? "Yes" : "No"}</Typography>*/}
					</Box>
					<Button variant="outlined" onClick={handleLogout}>Log Out</Button>
				</Box>
			)}
		</Box>

	);
}

export default Profile;
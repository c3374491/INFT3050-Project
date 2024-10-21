import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import HandleCookies from '../helpers/HandleCookies';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const { authToken, clearAuthToken } = HandleCookies();

  const navigate = useNavigate();

  function handleLogout() {
    clearAuthToken();
    navigate('/');
  }

  function handleManageAccount() {
    navigate('/ManageAccount'); // Navigate to the ManageAccount.js page
  }

  return (
    <Box display="flex" justifyContent="center">
      {authToken && (
        <Box>
          <h1>{authToken.username} Profile Page</h1>
          <Box>
            <Typography variant="h6">Welcome, {authToken.name}!</Typography>
            <Typography variant="body1">Email: {authToken.email}</Typography>
            <Typography variant="body1"><li> {authToken.TOList}</li></Typography>
            <Typography variant="body1">Admin Status: {authToken.isAdmin ? "Yes" : "No"}</Typography>
          </Box>

          {/* Manage Account Button */}
          <Box mt={2}>
            <Button variant="outlined" fullWidth onClick={handleManageAccount}>
              Manage Account
            </Button>
          </Box>

          {/* Log Out Button */}
          <Box mt={2}>
            <Button variant="outlined" fullWidth onClick={handleLogout}>
              Log Out
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Profile;

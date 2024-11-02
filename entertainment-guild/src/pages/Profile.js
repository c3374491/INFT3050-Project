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

  function handleManageAccountPassword() {
    navigate('/ManageAccountPassword'); // Navigate to the ManageAccount.js page
  }

  function handleManageAccountDetails() {
    navigate('/ManageAccountDetails'); // Navigate to the ManageAccount.js page
  }

  return (
    <Box display="flex" justifyContent="center">
      {authToken && (
        <Box>
          <h1>{authToken.username} Profile Page</h1>
          <Box>
            <Typography variant="h6">Welcome, {authToken.name}!</Typography>
            <Typography variant="body1">Email: {authToken.email}</Typography>
          </Box>

          {/* Manage Password Button */}
          <Box mt={2}>
            <Button variant="outlined" fullWidth onClick={handleManageAccountPassword}>
              Manage Password
            </Button>
          </Box>

          {/* Manage Details Button */}
          <Box mt={2}>
            <Button variant="outlined" fullWidth onClick={handleManageAccountDetails}>
              Manage Account Details
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

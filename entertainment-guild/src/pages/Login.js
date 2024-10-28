import { Box, FormControl, FormGroup, TextField, Button, Typography } from '@mui/material';
import React, { useState } from "react";
import HandleLogin from '../helpers/HandleLogin';
import { Link } from "react-router-dom";
import HandleCookies from '../helpers/HandleCookies';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordPopup from "../component/ForgotPasswordPopup";


const Login = () => {

	const navigate = useNavigate();
	
	const { setAuthToken, authToken, clearAuthToken } = HandleCookies();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [result, setResult] = useState(null); // null indicates no attempt, true for success, false for failure
	const [isOpen, setOpen] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault(); //Prevent reloading of the page
		const loginResponse = await HandleLogin(username, password);
		const token = await HandleLogin(username, password);
		console.log("response: ", token);
		if (loginResponse) {
			// Authenticated successful
			setResult(true);
			setAuthToken(loginResponse.userInfo, { expires: new Date(Date.now() + 86400e3) })
			navigate('/profile');
		}
		else {
			// Authentication failed
			setResult(false);
		}
	}


	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	}

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	}

	// Get handleOpenPopup and handleClosePopup functions from https://mui.com/material-ui/react-dialog/
	// Function to open the popup and set the selected product
	const handleOpenPopup = (product) => {
		setOpen(true);
	};

	// Function to close the popup and reset the selected product
	const handleClosePopup = () => {
		setOpen(false);
	};
	

	return (
		<Box display="flex" justifyContent="center">
			<Box
				width={300}
				alignItems="left"
				sx={{
					'.MuiTextField-root, .MuiFormControl-root': { m: 1, ml: 0 },
					'.MuiButton-root': { m: 1 },
				}}>
				<h1>Login</h1>
				<form method="post" onSubmit={handleSubmit}>
					<FormControl>
						<FormGroup>
							<TextField id="username-field" label="Username" variant="outlined" autoComplete="username"
								value={username} onChange={handleUsernameChange} />
						</FormGroup>
						<FormGroup>
							<TextField id="password-field" label="Password" variant="outlined" autoComplete="current-password"
								type="password" value={password} onChange={handlePasswordChange} />
						</FormGroup>
					</FormControl>
					<Box >
						<Button type="submit" variant="outlined">Submit</Button>
					</Box>
				</form>
				
				<Link onClick={() => handleOpenPopup()}>I forgot my password...</Link>
				<p>Don't have an account? <Link to="/signup">Sign up!</Link></p>
			</Box >
			{isOpen && (
				<ForgotPasswordPopup
					open={isOpen}
					onClose={handleClosePopup}
				/>
			)}
		</Box >
		
	);
}

export default Login;
import { Box, FormControl, FormGroup, TextField, Button, Typography, Alert } from '@mui/material';
import { useState } from "react";
import HandleLogin from '../helpers/HandleLogin';
import { Link } from "react-router-dom";
import HandleCookies from '../helpers/HandleCookies';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordPopup from "../component/ForgotPasswordPopup";
import Snackbar from "@mui/material/Snackbar";


const Login = () => {

	const navigate = useNavigate();

	const { setAuthToken, authToken, clearAuthToken } = HandleCookies();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [result, setResult] = useState(null);
	const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
	const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

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

	const handlePasswordChangeSuccess = () => {
		setIsSnackBarOpen(true);
		setShowForgotPasswordPopup(false);
	};

	const handleCloseSnackbar = () => {
		setIsSnackBarOpen(false);
	};
	
	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	}

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	}

	const handleForgotPasswordClick = () =>
		setShowForgotPasswordPopup(true);

	const handleCloseForgotPasswordPopup = () =>
		setShowForgotPasswordPopup(false);


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
				{result === false && (
					<Alert variant="outlined" severity="error">
						<Typography variant='body2'>Username or Password is incorrect!</Typography>
					</Alert>
				)}
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
				<Link onClick={handleForgotPasswordClick} >
					I forgot my password...
				</Link>
				<p>Don't have an account? <Link to="/signup">Sign up!</Link></p>
			</Box >
			{showForgotPasswordPopup && <ForgotPasswordPopup open={showForgotPasswordPopup} onClose={handleCloseForgotPasswordPopup}
															 onPasswordChangeSuccess={handlePasswordChangeSuccess}/>}
			<Snackbar
				open={isSnackBarOpen}
				autoHideDuration={3000}
				onClose={handleCloseSnackbar}
				message="Password changed successfully!"
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			/>
		</Box >
	);
}

export default Login;
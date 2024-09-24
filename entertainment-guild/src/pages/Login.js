// New page - ED 23/09/2024 (Lab Week 9 Provided)
import { Box, FormControl, FormGroup, TextField, Button, Typography } from '@mui/material';
import { useState } from "react";
import HandleLogin from '../helpers/HandleLogin';
import { Link } from "react-router-dom";


const Login = () => {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [result, setResult] = useState(null); // null indicates no attempt, true for success, false for failure
	const [userInfo, setUserInfo] = useState(null); // Stores user information

	function handleLogout() {
		setUserInfo(null);
	};

	async function handleSubmit(event) {
		event.preventDefault(); //Prevent reloading of the page
		const loginResponse = await HandleLogin(username, password);
		const token = await HandleLogin(username, password);
		console.log("response: ", token);
		if (loginResponse) {
			// Authenticated successful
			//setResult("Authentication successful");
			//setResult(token.Name);
			setResult(true);
			setUserInfo(loginResponse.userInfo);
		}
		else {
			// Authentication failed
			//setResult("Authentication failed");
			setResult(false);
		}
	}


	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	}


	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	}



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
					{/* <TextField id="result" disabled label="Authentication Result" value={result} /> */}
				</form>
				<Link to="/signup">Sign up ?</Link>
				{/* Display user information if login is successful */}
                {result && userInfo && (
                    <Box mt={2}>
                        <Typography variant="h6">Welcome, {userInfo.name}!</Typography>
                        <Typography variant="body1">Email: {userInfo.email}</Typography>
                        <Typography variant="body1">Admin Status: {userInfo.isAdmin ? "Yes" : "No"}</Typography>
                    	<p onClick={handleLogout}>Click me to Log Out</p>
					</Box>
					
                )}
			</Box >
		</Box >
	);
}

export default Login;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, TextField } from '@mui/material';
import HandleCookies from '../helpers/HandleCookies';

const NavBarAdmin = () => {

	const { authToken } = HandleCookies();

	return (
		<AppBar position="static">
			<Toolbar>
				<Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
					{/* Logo with link */}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<NavLink to="/" style={{ textDecoration: 'none', color: 'white' }}>
							Logo
						</NavLink>
					</Typography>

					{/* Navigation links */}
					<Box sx={{ display: 'flex', gap: 4, flexGrow: 1 }}>
						<Button color="inherit">
							<NavLink to="/manageusers" style={{ textDecoration: 'none', color: 'white' }}>
								Manage Users
							</NavLink>
						</Button>
						<Button color="inherit">
							<NavLink to="/manageproducts" style={{ textDecoration: 'none', color: 'white' }}>
								Manage Products
							</NavLink>
						</Button>
						{authToken ? (
							<Button color="inherit">
								<NavLink to="/profile" style={{ textDecoration: 'none', color: 'white' }}>
									Profile
								</NavLink>
							</Button>
						) : (
							<Button color="inherit">
								<NavLink to="/login" style={{ textDecoration: 'none', color: 'white' }}>
									Login
								</NavLink>
							</Button>)}
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default NavBarAdmin;

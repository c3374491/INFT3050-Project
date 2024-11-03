import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, TextField } from '@mui/material';
import HandleCookies from '../helpers/HandleCookies';
import logo from "../assets/images/Logo.png";

const NavBarAdmin = () => {

	const { authToken } = HandleCookies();

	return (
		<AppBar position="static">
			<Toolbar>
				<Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
					{/* Logo with link */}
					<Typography sx={{ flexGrow: 1 }}>
						<NavLink to="/">
							<img src={logo} alt="Logo" style={{ height: '80px' }} />
						</NavLink>
					</Typography>

					{/* Navigation links */}
					<Box sx={{ display: 'flex', gap: 4, flexGrow: 1 }}>
						<Button color="inherit">
							<NavLink to="/admin/manageusers" style={{ textDecoration: 'none', color: 'white' }}>
								Manage Users
							</NavLink>
						</Button>
						<Button color="inherit">
							<NavLink to="/admin/manageproducts" style={{ textDecoration: 'none', color: 'white' }}>
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

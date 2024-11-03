import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, Box, TextField, MenuItem, Menu} from '@mui/material';
import HandleCookies from '../helpers/HandleCookies';
import logo from "../assets/images/Logo.png";

const NavBarAdmin = () => {

    const { authToken } = HandleCookies();

    const [anchor, setAnchor] = useState(null);

    const handleMenuClick = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    return (
        <AppBar position="static" sx={{bgcolor : "#f44336"}}>
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
                        <Button color="inherit" onClick={handleMenuClick}>
                            Manage Product Stock
                        </Button>
                        <Menu
                            anchorEl={anchor}
                            open={Boolean(anchor)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <NavLink to="/employe/managestockbooks" style={{ textDecoration: 'none', color: 'black' }}>
                                    Books
                                </NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <NavLink to="/employe/managestockmovies" style={{ textDecoration: 'none', color: 'black' }}>
                                    Movies
                                </NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <NavLink to="/employe/managestockgames" style={{ textDecoration: 'none', color: 'black' }}>
                                    Games
                                </NavLink>
                            </MenuItem>
                        </Menu>
                        <Button color="inherit">
                            <NavLink to="/employe/showusers" style={{ textDecoration: 'none', color: 'white' }}>
                                See Users
                            </NavLink>
                        </Button>
                        <Button color="inherit">
                            <NavLink to="/employe/showorders" style={{ textDecoration: 'none', color: 'white' }}>
                                See Orders
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

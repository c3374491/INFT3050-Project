import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, TextField } from '@mui/material';
import cartIcon from "../assets/images/cart-icon.png"

const NavBarUsers = () => {
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

                    {/* Search bar */}
                    <Box sx={{ flexGrow: 1 }}>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search..."
                            sx={{ width: '100%', maxWidth: 400 }}
                        />
                    </Box>

                    {/* Navigation links */}
                    <Box sx={{ display: 'flex', gap:4,flexGrow:1 }}>
                        <Button color="inherit">
                            <NavLink to="/books" style={{ textDecoration: 'none', color: 'white' }}>
                                Books
                            </NavLink>
                        </Button>
                        <Button color="inherit">
                            <NavLink to="/games" style={{ textDecoration: 'none', color: 'white' }}>
                                Games
                            </NavLink>
                        </Button>
                        <Button color="inherit">
                            <NavLink to="/movies" style={{ textDecoration: 'none', color: 'white' }}>
                                Movies
                            </NavLink>
                        </Button>
                    </Box>
                    <Button color="inherit">
                        <NavLink to="/cart" style={{ textDecoration: 'none', color: 'white' }}>
                            <img src={cartIcon}  alt={"Cart Logo"} width={35}/>
                        </NavLink>
                    </Button>
                    <Button color="inherit">
                        <NavLink to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                            Login
                        </NavLink>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBarUsers;

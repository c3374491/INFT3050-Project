import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, TextField } from '@mui/material';
import cartIcon from "../assets/images/cart-icon.png"
import searchIcon from "../assets/images/searchIcon.png"
import HandleCookies from '../helpers/HandleCookies';
import logo from '../assets/images/Logo.png';

const NavBarUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (searchTerm.trim()) {
            navigate(`/productlistsearch?query=${searchTerm}`);
        }
    };

	const { authToken } = HandleCookies();

    return (
        <AppBar position="sticky" sx={{ bgcolor: "#5b7569" }} >
            <Toolbar>
                <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                    <Typography sx={{ flexGrow: 1 }}>
                        <NavLink to="/">
                            <img src={logo} alt="Logo" style={{ height: '80px' }} />
                        </NavLink>
                    </Typography>
                    {/* Search bar */}
                    <Box sx={{ flexGrow: 1}}>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    navigate(`/productlistsearch?query=${searchTerm}`);
                                }
                            }}
                            sx={{ width: '80%', maxWidth: 400 }}/>
                            <img src={searchIcon} 
                                 onClick={handleSearch} 
                                 color="white"  
                                 alt="search icon"
                                width={30}/>
                        
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
            </Toolbar>
        </AppBar>
    );
};

export default NavBarUsers;

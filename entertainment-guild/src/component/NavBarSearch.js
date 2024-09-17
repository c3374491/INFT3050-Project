import React, { useEffect, useRef } from 'react';
import { Box, TextField } from '@mui/material';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';

const NavBarSearch = () => {

	const initialState = 0;

	const query = useRef();

	const handleSearch = (e) => {
		e.preventDefault();
		const queryVal = query.current.value;
		console.log(queryVal);
		const newThing = axios.get('http://localhost:8080/api/v1/db/data/v1/inft3050/Product', { headers: { 'Accept': 'application/json', 'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ' } });
		newThing.then((response2) => {
			console.log(response2.data.list.filter(product => (product.Name.includes(queryVal) || product.Description.includes(queryVal) || product.Author.includes(queryVal))));
		})
	}

	/*const promise = axios.get('http://localhost:8080/api/v1/db/data/v1/inft3050/Product', { headers: { 'Accept': 'application/json', 'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ' } });
	promise.then((response) => {
		console.log(response);
		console.log(response.data);
	})*/

	return (
		<form onSubmit={handleSearch} >
			<Box sx={{ flexGrow: 1 }}>
				<TextField
					variant="outlined"
					size="small"
					placeholder="Search..."
					sx={{ width: '100%', maxWidth: 400 }}
					inputRef={query}
				/>
			</Box>
		</form>
	);
}
export default NavBarSearch;
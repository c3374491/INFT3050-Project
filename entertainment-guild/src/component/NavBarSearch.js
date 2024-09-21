import React, { useRef } from 'react';
import { Box, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavBarSearch = () => {
  const navigate = useNavigate();
  const query = useRef();

  const handleSearch = async (e) => {
    e.preventDefault();
    const queryVal = query.current.value;
    console.log(queryVal);
    
    try {
      const response = await axios.get(
        'http://localhost:8080/api/v1/db/data/v1/inft3050/Product?limit=1000',
        {
          headers: {
            'Accept': 'application/json',
            'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ',
          },
        }
      );

      const filteredProducts = response.data.list.filter(
        (product) =>
          product.Name.includes(queryVal) ||
          product.Description.includes(queryVal) ||
          product.Author.includes(queryVal)
      );
      
      // Navigate to the results page and pass the filtered products
      navigate('/results', { state: { filteredProducts } });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
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
};

export default NavBarSearch;

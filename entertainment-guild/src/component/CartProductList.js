import React from 'react';
import { Box, Typography } from "@mui/material";

const CartProductList = ({ productList }) => {
    
    return (
        <Box>
            {productList.length > 0 ? (
                productList.map(product => (
                    <Box key={product.ID} mb={2}>
                        <Typography variant="h6">{product.Name}</Typography>
                    </Box>
                ))
            ) : (
                <Typography variant="body1">Your cart is empty.</Typography>
            )}
        </Box>
    );
};

export default CartProductList;

import React, {useState} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { format } from 'date-fns';
import HandleCookies from "../helpers/HandleCookies";
import Snackbar from "@mui/material/Snackbar";
import {wait} from "@testing-library/user-event/dist/utils";

// ProductDetailsPopup component to display in a pop up some informations about a product
// open: boolean to show or hide the popup dialog, defined in the parent component
// product: object containing the product details to display
// onClose: function to close the popup dialog, defined in the parent component
const ProductDetailsPopup = ({ open, product, onClose,showAddToCart=true }) => {
    const [isSnackBarOpen, setSnackBarOpen] = useState(false);
    const [cartProduct, setCartProduct] = useState(null);
    const { setCartCookie, getCartCookie } = HandleCookies();

    // https://mui.com/material-ui/react-snackbar/
    // Function to open the snackbar and set the selected product
    const handleOpenSnackbar = (product) => {
        setCartProduct(product);
        setSnackBarOpen(true);
    }

    // Function to close the snackbar and reset the cart product
    const handleCloseSnackbar = () => {
        setCartProduct(null);
        setSnackBarOpen(false);
    }
    const addToCart = (product) => {
        console.log(product)
        setCartCookie(product);
        const updatedCart = getCartCookie();
        console.log("Cart updated with IDs:", updatedCart);
        handleOpenSnackbar(product);
    };
    
    return (
        // Dialog component from material ui, to display product details
        // https://mui.com/material-ui/react-dialog/
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{product.Name}</DialogTitle>
            <DialogContent>
                <Typography><strong>Price</strong> : ${product.Price}</Typography>
                <Typography><strong>by</strong> {product.Author}</Typography>
                <Typography>{product.Description}</Typography>
                {product.Published && (
                    <Typography><strong>Published on:</strong> {format(new Date(product.Published), 'MMMM dd, yyyy')}</Typography>
                )}
            </DialogContent>
            <div style={{display:'flex', justifyContent: 'space-between'}}>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Close</Button>
                </DialogActions>
                {showAddToCart &&
                    <DialogActions>
                        <Button onClick={() => addToCart(product)} color="primary">Add to cart</Button>
                    </DialogActions>
                }
                
            </div>
            {/* Display a snackbar if a user add a product to cart
            Automaticallyb hidding after 3000ms, pop in the top right of the screen */}
            <Snackbar
                open={isSnackBarOpen}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  // Set position to top-right
                message={cartProduct ? `You added ${cartProduct.Name} to the cart` : ''}
                onClose={handleCloseSnackbar}
            />
        </Dialog>
        
    );
};

export default ProductDetailsPopup;

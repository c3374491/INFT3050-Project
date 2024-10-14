import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { format } from 'date-fns';

// ProductDetailsPopup component to display in a pop up some informations about a product
// open: boolean to show or hide the popup dialog, defined in the parent component
// product: object containing the product details to display
// onClose: function to close the popup dialog, defined in the parent component
const ProductDetailsPopup = ({ open, product, onClose }) => {
    return (
        // Dialog component from material ui, to display product details
        // https://mui.com/material-ui/react-dialog/
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{product.Name}</DialogTitle>
            <DialogContent>
                <Typography><strong>by</strong> {product.Author}</Typography>
                <Typography>{product.Description}</Typography>
                {product.Published && (
                    <Typography><strong>Published on:</strong> {format(new Date(product.Published), 'MMMM dd, yyyy')}</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDetailsPopup;

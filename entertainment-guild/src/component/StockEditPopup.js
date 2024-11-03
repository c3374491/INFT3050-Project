import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField, MenuItem, Select, InputLabel, FormControl,
} from '@mui/material';
import HandleCookies from "../helpers/HandleCookies";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subGenres from "../data/subGenres";

// ProductEditPopup component to edit a product in a popup
// open: boolean to show or hide the popup dialog, defined in the parent component
// user: object containing the product details to edit
// onClose: function to close the popup dialog, defined in the parent component
const StockEditPopup = ({ open, product, onClose }) => {
    const [quantity, setQuantity] = useState(product.Quantity);
    const [price, setPrice] = useState(product.Price);


    const onSave = async () => {

        const updatedStock = {
            Quantity: quantity,
            Price: price,
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/db/data/v1/inft3050/Stocktake?limit=1000', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                }
            });

            const stockData = await response.json();
            console.log(stockData.list)
            const item = stockData.list.find(stockItem => stockItem.ProductId === product.ProductId);

            if (!item) {
                throw new Error(`No item found the ProductId : ${product.ProductId}`);
            }

            const itemId = item.ItemId;

            const patchResponse = await fetch(`http://localhost:8080/api/v1/db/data/v1/inft3050/Stocktake/${itemId}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ',
                },
                body: JSON.stringify(updatedStock),
            });

            if (!patchResponse.ok) {
                const errorData = await patchResponse.json();
                throw new Error(`Error when update the user: ${errorData.message || patchResponse.statusText}`);
            }

            const data = await patchResponse.json();
            console.log('Stock Updated:', data);

        } catch (error) {
            console.error('Error:', error);
        }

        onClose();
        window.location.reload();
    };


    return (
        // Dialog component from material ui, to display product details
        // https://mui.com/material-ui/react-dialog/
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="lg">
            <DialogTitle>Edit the product : {product.Name}</DialogTitle>
            <DialogContent className="textFieldManageContainer">
                <TextField
                    margin="dense"
                    label="Quantity"
                    type="number"
                    name="Quantity"
                    defaultValue={product.Quantity}
                    required
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <TextField
                    margin="dense"
                    label="Price"
                    type="text"
                    name="Price"
                    defaultValue={product.Price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                />

            </DialogContent>
            <div style={{display:'flex', justifyContent: 'space-between'}}>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Close</Button>
                </DialogActions>
                <DialogActions>
                    <Button onClick={onSave} color="primary">Save</Button>
                </DialogActions>
            </div>
        </Dialog>

    );
};

export default StockEditPopup;

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
const UserEditPopup = ({ open, product, onClose }) => {
    const [name, setName] = useState(product.Name);
    const [author, setAuthor] = useState(product.Author);
    const [description, setDescription] = useState(product.Description);
    const [genre, setGenre] = useState(product.Genre);
    const [subGenre, setSubGenre] = useState(product.SubGenre);
    const [published, setPublished] = useState(product.Published);
    
    const { authToken } = HandleCookies();
    
    const onSave = async () => {
        
        const date = new Date();
        const updatedProduct = {
            Name: name,
            Author: author,
            Description: description,
            Genre: genre,
            SubGenre: subGenre,
            Published: published,
            LastUpdatedBy: authToken.UserName,
            LastUpdated: date
        };

        try {
            const response = await fetch(`http://localhost:8080/api/v1/db/data/v1/inft3050/Product/${product.ID}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error when update the user: ${errorData.message || response.statusText}`);
            }

            const data = await response.json();
            console.log('Product Updated:', data);

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
                    label="Name"
                    type="text"
                    name="Name"
                    defaultValue={product.Name}
                    required
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    margin="dense"
                    label="Author"
                    type="text"
                    name="Authir"
                    defaultValue={product.Author}
                    required
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    name="Description"
                    multiline
                    defaultValue={product.Description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <FormControl fullWidth margin="dense">
                    <InputLabel id="genre-number-label">Genre</InputLabel>
                    <Select
                        labelId="genre-number-label"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    >
                        <MenuItem value={1}>1 - Book</MenuItem>
                        <MenuItem value={2}>2 - Movie</MenuItem>
                        <MenuItem value={3}>3 - Game</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense">
                    <InputLabel id="subgenre-label">SubGenre</InputLabel>
                    <Select
                        labelId="subgenre-label"
                        value={subGenre}
                        onChange={(e) => setSubGenre(e.target.value)}
                    >
                        {genre && subGenres[genre].map((sub) => (
                            <MenuItem key={sub.id} value={sub.id}>
                                {sub.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* https://refine.dev/blog/react-date-picker/#introduction */}
                <DatePicker
                    selected={published}
                    onChange={setPublished}
                    className="datePicker"
                    placeholderText="Select a date"
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

export default UserEditPopup;

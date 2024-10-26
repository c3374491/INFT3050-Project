
import React, { useState } from "react";
import axios from "axios";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

const UserDeletePopup = ({ user, open, onClose }) => {
    const [deleteError, setDeleteError] = useState(null); // State to track any errors during deletion

    // Handles form submission for deleting the user
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send DELETE request to the API with the specified username
            await axios.delete(
                `http://localhost:8080/api/v1/db/data/v1/inft3050/User/${user.UserName}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ", // Auth token for API
                    },
                }
            );
            onClose();
            window.location.reload();
        } catch (error) {
            if (error.response) {
                console.error("Error response data:", error.response.data); // Log the server response
            }
            setDeleteError(error); // Set error state to display error message
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete the user</DialogTitle>
            <DialogContent>
                <Typography>
                    Do you really want to delete this user : {user.Name} ?
                </Typography>
                {deleteError && <Typography color="error">Error : {deleteError.message}</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="secondary">
                    Delete the user
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDeletePopup;

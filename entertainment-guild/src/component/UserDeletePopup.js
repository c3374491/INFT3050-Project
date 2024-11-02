
import React, { useState } from "react";
import axios from "axios";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

const UserDeletePopup = ({ user, open, onClose }) => {
    const [deleteError, setDeleteError] = useState(null); // State to track any errors during deletion

    // Handles form submission for deleting the user
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        console.log(user.UserName);
        let isUser = 0;
        try {
            let response = [];
            if (user.UserName)
            {
                // Get the user's product list
                response = await axios.get(
                    `http://localhost:8080/api/v1/db/data/v1/inft3050/User/${user.UserName}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ",
                        },
                    }
                );
                isUser = 1;
                console.log("Response Data:", response.data); // Log the response
            }
            console.log(isUser)
            // Check if the user has products
            if (isUser) {
                if (response.data.list && response.data.list.length > 0) {
                    console.log("User has products");
                    // Create the update object with the required fields
                    const updatedUser = {
                        Email: null,
                        Name: null,
                        Salt: null,
                        HashPW: null,
                        IsAdmin: 0,
                    };

                    // Use axios to PATCH the user
                    await axios.patch(
                        `http://localhost:8080/api/v1/db/data/v1/inft3050/User/${user.UserName}`,
                        updatedUser,
                        {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ',
                            },
                        }
                    );

                } else {
                    await axios.delete(
                        `http://localhost:8080/api/v1/db/data/v1/inft3050/User/${user.UserName}`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ",
                            },
                        }
                    );
                }
                
            } else {
                // Delete the user if they have no products
                await axios.delete(
                    `http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons/${user.UserID}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ",
                        },
                    }
                );
            }

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

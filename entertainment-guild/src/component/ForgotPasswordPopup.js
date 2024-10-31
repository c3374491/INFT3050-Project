import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";
import {sha256} from "../helpers/HandleLogin";
const ForgotPasswordPopup = ({open , onClose}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onConfirm = async () => {
        try {
            const user = await fetchUser();
            if (user) {
                await updateUserPassword(user);
                console.log("Password updated !");
                onClose();
            } else {
                console.log("User not found ou multiples user found.");
                setError("User not found");
            }
        } catch (err) {
            console.error("Error updating the password :", err);
        }
    };

    const fetchUser = async () => {
        try {
            const [response1, response2] = await Promise.all([
                axios.get("http://localhost:8080/api/v1/db/data/v1/inft3050/User?limit=1000", {
                    headers: {
                        'Accept': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                }),
                axios.get("http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons?limit=1000", {
                    headers: {
                        'Accept': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                })
            ]);

            const combinedUsers = [...response1.data.list, ...response2.data.list];
            const filteredUsers = combinedUsers.filter(user => user.UserName === username || user.Email === username);

            return filteredUsers.length === 1 ? filteredUsers[0] : null;
        } catch (error) {
            console.error('Error trying to fetch the data:', error);
            setError(error);
            return null;
        }
    };

    // Function to generate a shorter salt (16 characters) 
    const generateShorterSalt = (length = 16) => {
        return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    };

    const updateUserPassword = async (user) => {
        let url = "";
        if (user.hasOwnProperty("UserName")) {
            url = `http://localhost:8080/api/v1/db/data/v1/inft3050/User/${user.UserName}`;
        } else {
            url = `http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons/${user.UserID}`;
        }
        
        // Generate salt and hash the password
        const generatedSalt = generateShorterSalt(16);  // Generate salt
        const hashedPassword = await sha256(generatedSalt + password); // Hash the password using salt

        const updatedPassword = {
            Salt: generatedSalt,
            HashPW : hashedPassword,
        };

        await axios.patch(url, updatedPassword, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
            }
        });
    };


    return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Forgot password</DialogTitle>
        <DialogContent className="textFieldManageContainer">
            <TextField
                margin="dense"
                label="Username"
                type="text"
                name="username"
                required
                onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
                margin="dense"
                label="New password"
                type="password"
                name="password"
                security="true"
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
                <Typography color="error" variant="body2" style={{ marginTop: "10px" }}>
                    {error}
                </Typography>
            )}
        </DialogContent>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
            <DialogActions>
                <Button onClick={onConfirm} color="primary">Confirm</Button>
            </DialogActions>
        </div>
    </Dialog>
    );
}

export default ForgotPasswordPopup;
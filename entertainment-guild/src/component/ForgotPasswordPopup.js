import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import React, {useState} from "react";
const ForgotPasswordPopup = ({open , onClose}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const onConfirm = async () => {
        console.log(email)
        
    };
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Forgot password</DialogTitle>
            <DialogContent className="textFieldManageContainer">
                <TextField
                    margin="dense"
                    label="Email"
                    type="text"
                    name="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <TextField
                    margin="dense"
                    label="Password"
                    type="text"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
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
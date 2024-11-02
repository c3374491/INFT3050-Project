import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Switch,
    FormControlLabel
} from '@mui/material';

// UserEditPopup component to edit a user in a popup
// open: boolean to show or hide the popup dialog, defined in the parent component
// user: object containing the user details to edit
// onClose: function to close the popup dialog, defined in the parent component
const UserEditPopup = ({ open, user, onClose }) => {
    const [name, setName] = useState(user.Name);
    const [username, setUsername] = useState(user.UserName);
    const [email, setEmail] = useState(user.Email);
    const [isAdmin, setIsAdmin] = useState(Boolean(user.IsAdmin));

    const onSave = async () => {

        try {
            if (user.UserName !== undefined)
            {
                const updatedUser = {
                    UserName: user.UserName,
                    Email: email,
                    Name: name,
                    IsAdmin: isAdmin ? 1 : 0,
                };
                const response = await fetch(`http://localhost:8080/api/v1/db/data/v1/inft3050/User/${user.UserName}`, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ',
                    },
                    body: JSON.stringify(updatedUser),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Error when update the user: ${errorData.message || response.statusText}`);
                }

                const data = await response.json();
                console.log('User updated:', data);
            }
            else {
                const updatedUser = {
                    Email: email,
                    Name: name,
                    IsAdmin: isAdmin ? 1 : 0,
                };
                const response = await fetch(`http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons/${user.UserID}`, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ',
                    },
                    body: JSON.stringify(updatedUser),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Error when update the user: ${errorData.message || response.statusText}`);
                }

                const data = await response.json();
                console.log('User updated:', data);
            }
            

        } catch (error) {
            console.error('Error:', error);
        }
        
        onClose();
        window.location.reload();
    };


    return (
        // Dialog component from material ui, to display product details
        // https://mui.com/material-ui/react-dialog/
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit the user : {user.Name}</DialogTitle>
            <DialogContent className="textFieldManageContainer">

                <TextField
                    margin="dense"
                    label="Name"
                    type="text"
                    name="Name"
                    defaultValue={user.Name}
                    required
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    margin="dense"
                    label="Email"
                    type="text"
                    name="Email"
                    defaultValue={user.Email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {user.UserName &&
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                        }
                        label={"IsAdmin"}
                    />
                }
                
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

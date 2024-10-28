import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "../style.css";
import "../helpers/HandleCookies"
import editIcon from "../assets/images/edit_icon.png";
import UserEditPopup from "./UserEditPopup";
import deleteIcon from "../assets/images/delete-icon.png";
import UserDeletePopup from "./UserDeletePopup";
import AddUserForm from "./AddUserForm"; 

// ShowUsers component to display a list of the users
// apiUrl: string containing the URL to fetch the products data
const ShowUsers = ({ apiUrl, searchTerm}) => {
    const [users, setUsers] = useState([]);
    const [selectedUserEdit, setSelectedUserEdit] = useState(null);
    const [selectedUserDelete, setSelectedUserDelete] = useState(null);
    const [error, setError] = useState(null);
    const [isOpenEdit, setOpenEdit] = useState(false);
    const [isOpenDelete, setOpenDelete] = useState(false);

    
    // Get handleOpenPopup and handleClosePopup functions from https://mui.com/material-ui/react-dialog/
    // Function to open the popup and set the selected product
    const handleOpenPopup = (user) => {
        setSelectedUserEdit(user);
        setOpenEdit(true);
    };

    // Function to close the popup and reset the selected product
    const handleClosePopup = () => {
        setSelectedUserEdit(null);
        setOpenEdit(false);
    };
    
    const handleDeleteUser = (user) => {
        setSelectedUserDelete(user);
        setOpenDelete(true);
    }

    const handleClosePopupDelete = () => {
        setSelectedUserDelete(null);
        setOpenDelete(false);
    };
    

    // Fetch products data from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        'Accept': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                });
                
                if (Array.isArray(response.data.list)) {
                    setUsers(response.data.list);
                } else {
                    console.warn('Expected array but got:', response.data.list);
                    setUsers([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchUsers();
    }, [apiUrl]);

    const filteredUsers = users
        .filter(user => user.Name !== null)
        .filter(user =>
            user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.UserName.toLowerCase().includes(searchTerm.toLowerCase() || 
            user.Email.toLowerCase().includes(searchTerm.toLowerCase())
            ));

    // Display the list of users
    return (
        <div>
            <div className="userTableWrap">
            {filteredUsers.length > 0 ? (
                <table className="userTable">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers
                        .filter(user => user.Name !== null)
                        .map((user, index) => (
                        <tr key={index} className={index % 2 === 0 ? "evenRow" : "oddRow"}>
                            <td>{user.UserName}</td>
                            <td>{user.Name}</td>
                            <td>{user.Email ? user.Email : "No Email"}</td>
                            <td>{user.IsAdmin ? "Yes" : "No"}</td>
                            <td>
                                <button onClick={() => handleOpenPopup(user)} className="editButton">
                                    <img src={editIcon} alt="Edit Button Icon" className="editImage"/>
                                </button>
                                <button onClick={() => handleDeleteUser(user)} className="deleteButton">
                                    <img src={deleteIcon} alt="Delete Button Icon" className="deleteImage"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No users available.</p>
            )}
            </div>
            {error && <p>Error: {error.message}</p>}

            {selectedUserEdit && (
                <UserEditPopup
                    open={isOpenEdit}
                    user={selectedUserEdit}
                    onClose={handleClosePopup}
                />
            )}

            {selectedUserDelete && (
                <UserDeletePopup
                    open={isOpenDelete}
                    user={selectedUserDelete}
                    onClose={handleClosePopupDelete}
                />
            )}
        </div>
    );
};

export default ShowUsers;

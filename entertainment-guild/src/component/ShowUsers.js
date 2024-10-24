import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "../style.css";
import "../helpers/HandleCookies"
import editIcon from "../assets/images/edit_icon.png";

// ShowUsers component to display a list of the users
// apiUrl: string containing the URL to fetch the products data
const ShowUsers = ({ apiUrl}) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    
    const editUser = (user) => {
        
        console.log("appuie")
    }

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

    // Display the list of users
    return (
        <div>
            {users.length > 0 ? (
                <ul>
                    {users.map((user, index) => (
                        <li key={index}
                            className="userManagementStyle">
                            <div className="">
                                Name : <strong>{user.Name}</strong>
                            </div>
                            <p className="">
                                Username : <strong>{user.UserName}</strong>
                            </p>
                            <div>
                                <p>Email: {user.Email ? user.Email : "No Email"}</p>
                            </div>
                            <div>
                                <p>Admin: {user.IsAdmin ? "Yes" : "No"}</p>
                            </div>
                            <div>
                                <button onClick={() => editUser(user)} className="editButton">
                                    <img src={editIcon} alt="Info Button Icon" className="editImage"/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users available.</p>
            )}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default ShowUsers;

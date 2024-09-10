import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
    const [User, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/db/data/v1/inft3050/User', {
                    headers: {
                        'Accept': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                });
                console.log('API Response:', response.data); 
                if (Array.isArray(response.data.list)) {
                    setUsers(response.data.list);
                } else {
                    console.warn('Expected array in list but got:', response.data.list);
                    setUsers([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchUsers();
    }, []);

    const filteredUser = User.filter(user => user.IsAdmin === false); // All users who are not admins

    return (
        <div>
            <h1>Users</h1>
            {filteredUser.length > 0 ? (
                <ul>
                    {filteredUser.map((user, index) => (
                        //User information
                        <li key={index}>
                            <strong>{user.Name}</strong>
                            <p>{user.UserName}</p>
                            <p>{user.Email}</p>
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

export default ManageUsers;
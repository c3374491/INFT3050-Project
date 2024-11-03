import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "../style.css";
import "../helpers/HandleCookies"
import {TextField} from "@mui/material";

// ShowUsers component to display a list of the users
// apiUrl: string containing the URL to fetch the products data
const EmployeShowUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    
    // Fetch products data from the API
    useEffect(() => {
        const fetchUsers = async () => {
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

                // Combine the lists from both responses
                const combinedUsers = [
                    ...response1.data.list.map(user => ({
                        ...user,
                        IsAdmin: user.IsAdmin,
                        IsEmployee: !user.IsAdmin
                    })),
                    ...response2.data.list.map(user => ({
                        ...user,
                        IsAdmin: false,
                        IsEmployee: false
                    }))
                ];

                // Filter out null names and update the state
                const filteredUsers = combinedUsers.filter(user => user.Name !== null);
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchUsers();
    }, );

    const filteredUsers = users
        .filter(user => user.Name !== null)
        .filter(user =>
            user.Name && user.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.UserName && user.UserName.toLowerCase().includes(searchTerm.toLowerCase() ||
                user.Email && user.Email.toLowerCase().includes(searchTerm.toLowerCase())
            ));

    // Display the list of users
    return (
        <div>
            <div className="containerTextField">
                <TextField
                    id="standard-basic"
                    label="Search users..."
                    variant="standard"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="searchField"
                />
            </div>
            <div className="stockTableWrap">
                {filteredUsers.length > 0 ? (
                    <table className="userTable">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Employe</th>
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
                                    <td>{user.IsEmployee ? "Yes" : "No"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users available.</p>
                )}
            </div>
            {error && <p>Error: {error.message}</p>}

        </div>
    );
};

export default EmployeShowUsers;

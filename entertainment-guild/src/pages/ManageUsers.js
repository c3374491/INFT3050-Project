
// ManageUsers.js 
// Author: Liam Kimberley || C3375248 
// Last Updated: 14/10/2024

import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUserForm from "../component/AddUserForm"; 
import UpdateUserForm from "../component/UpdateUserForm"; 
import DeleteUserForm from "../component/DeleteUserForm"; 

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // State to hold the list of Users
  const [error, setError] = useState(null); // State to track any errors during data fetching

  useEffect(() => {
    getUsers();
  }, []);

  // Function to get Users from the API
  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/db/data/v1/inft3050/User?limit=1000",
        {
          headers: {
            "Content-Type": "application/json",
            "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ", // Auth token for API
          },
        }
      );
      if (Array.isArray(response.data.list)) {
        setUsers(response.data.list); // Update the state with the fetched Users
      } else {
        setUsers([]); 
      }
    } catch (error) {
      setError(error); 
    }
  };

  return (
    <div>
      <h1>Manage Users</h1>
      {/* Display list of Users or a message if no Users are available */}
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <strong>{user.Name}</strong> {/* Display User's Name */}
              <p>User Name: {user.UserName}</p> {/* Display User's Username */}
              <p>Email: {user.Email ? user.Email : "No Email"}</p> {/* Handle null emails */}
              <p>Admin: {user.IsAdmin ? "Yes" : "No"}</p> {/* Check if user is Admin */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No Users available.</p>
      )}
      {error && <p>Error: {error.message}</p>} {/* Display any errors that occurred */}

        {/* Render each of the forms for adding, updating, and deleting products */}
        <AddUserForm getUsers={getUsers} />
        <UpdateUserForm getUsers={getUsers} />
        <DeleteUserForm getUsers={getUsers} />

    </div>
  );
};

export default ManageUsers;

// AddUserForm.js
// Author: Liam Kimberley || C3375248
// Last Updated: 14/10/2024

import React, { useState } from "react";
import axios from "axios";

const AddUserForm = ({ getUsers }) => {
  // State to hold data for the new user to be added
  const [newUser, setNewUser] = useState({
    UserName: "",
    Name: "",
    IsAdmin: false, // Default value for IsAdmin
    Email: "",
  });

  const [postError, setPostError] = useState(null); // State to track any errors during user addition

  // Handles changes to input fields for the new user
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox for IsAdmin
    const finalValue = type === "checkbox" ? checked : value;
    
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: finalValue, 
    }));
  };

  // Handles form submission for adding the new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the user data for POST request, converting IsAdmin to 1 or 0
    const userToPost = {
      UserName: newUser.UserName,
      Name: newUser.Name,
      IsAdmin: newUser.IsAdmin ? 1 : 0, // Convert boolean to integer (1 for true, 0 for false)
      Email: newUser.Email || null, // Email can be null if not provided
    };

    try {
      // Log the data before sending it for debugging purposes
      console.log("Posting user data:", userToPost);

      // Send POST request to add the new user
      await axios.post(
        "http://localhost:8080/api/v1/db/data/v1/inft3050/User",
        userToPost,
        {
          headers: {
            "Content-Type": "application/json",
            "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ", // Auth token for API
        },
      });

      getUsers(); // Refresh the user list after successful addition
    } catch (error) {
      console.error("Error response:", error.response ? error.response.data : error.message);
      setPostError(error.response ? error.response.data : error.message); // Set error state to display error message
    }
  };

  return (
    <div>
      <h2>Add New User</h2>
      {/* Form to input data for the new user */}
      <form onSubmit={handleSubmit}>
        <label>
          User Name:
          <input
            type="text"
            name="UserName"
            value={newUser.UserName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="Name"
            value={newUser.Name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="Email"
            value={newUser.Email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Is Admin:
          <input
            type="checkbox"
            name="IsAdmin"
            checked={newUser.IsAdmin}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>

      {/* Display any errors that occurred during the add operation */}
      {postError && <p>Error: {postError}</p>}
    </div>
  );
};

export default AddUserForm;

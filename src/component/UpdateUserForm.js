// UpdateUserForm.js
// Author: Liam Kimberley || C3375248
// Last Updated: 14/10/2024

import React, { useState } from "react";
import axios from "axios";

const UpdateUserForm = ({ getUsers }) => {
  // State to hold the data for the user to be updated
  const [patchUser, setPatchUser] = useState({
    UserName: "", // UserName to identify the user
    Name: "",
    Email: "",
    IsAdmin: false, // Default value for IsAdmin
  });
  const [patchError, setPatchError] = useState(null); // State to track any errors during update

  // Handles changes to the input fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPatchUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox for IsAdmin
    }));
  };

  // Handles form submission for updating the user
  const handlePatchSubmit = async (e) => {
    e.preventDefault();

    // Convert IsAdmin boolean to 1/0 for SQL Server
    const userToPatch = {
      Name: patchUser.Name || undefined,
      Email: patchUser.Email || undefined,
      IsAdmin: patchUser.IsAdmin ? 1 : 0, // Convert boolean to 1 (true) or 0 (false)
    };

    try {
      // Send PATCH request to update the user in the API with the specified UserName
      await axios.patch(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/User/${patchUser.UserName}`,
        userToPatch,
        {
          headers: {
            "Content-Type": "application/json",
            "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ", // Auth token for API
          },
        }
      );
      getUsers(); // Refresh the user list after updating
    } catch (error) {
      setPatchError(error); // Set error state to display error message
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      {/* Form to input the user data for updating */}
      <form onSubmit={handlePatchSubmit}>
        <label>
          User Name:
          <input
            type="text"
            name="UserName"
            value={patchUser.UserName}
            onChange={handleInputChange}
            required // Makes the UserName field mandatory
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="Name"
            value={patchUser.Name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="Email"
            value={patchUser.Email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Is Admin:
          <input
            type="checkbox"
            name="IsAdmin"
            checked={patchUser.IsAdmin}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Update User</button>
      </form>

      {/* Display any errors that occurred during the update */}
      {patchError && <p>Error: {patchError.message}</p>}
    </div>
  );
};

export default UpdateUserForm;

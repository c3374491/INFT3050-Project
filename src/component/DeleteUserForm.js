// DeleteUserForm.js
// Author: Liam Kimberley || C3375248
// Last Updated: 14/10/2024

import React, { useState } from "react";
import axios from "axios";

const DeleteUserForm = ({ getUsers }) => {
  // State to hold the username of the user to be deleted
  const [userName, setUserName] = useState("");
  const [deleteError, setDeleteError] = useState(null); // State to track any errors during deletion

  // Handles changes to the username input field
  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  // Handles form submission for deleting the user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send DELETE request to the API with the specified username
      await axios.delete(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/User/${userName}`,
        {
          headers: {
            "Content-Type": "application/json",
            "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ", // Auth token for API
          },
        }
      );
      getUsers(); // Refresh the user list after successful deletion
      setUserName(""); // Reset the username field
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data); // Log the server response
      }
      setDeleteError(error); // Set error state to display error message
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      {/* Form to input the username for deletion */}
      <form onSubmit={handleSubmit}>
        <label>
          User name:
          <input
            type="text"
            value={userName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">Delete User</button>
      </form>

      {/* Display any errors that occurred during the delete operation */}
      {deleteError && <p>Error: {deleteError.message}</p>}
    </div>
  );
};

export default DeleteUserForm;

<<<<<<< Updated upstream:src/component/DeleteProductForm.js
// DeleteProductForm.js
// Author: Liam Kimberley || C3375248 
// Last Updated: 14/9/2024

import React, { useState } from "react";
import axios from "axios";

const DeleteProductForm = ({ getProducts }) => {
  // State to hold the product ID to be deleted
  const [productId, setProductId] = useState("");
  const [deleteError, setDeleteError] = useState(null); // State to track any errors during deletion

  // Handles changes to the product ID input field
  const handleInputChange = (e) => {
    setProductId(e.target.value);
  };

  // Handles form submission for deleting the product
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      // Send DELETE request to the API with the specified product ID
      await axios.delete(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/Product/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ", // Auth token for API
          },
        }
      );
      getProducts(); // Refresh the product list after successful deletion
      setProductId(""); // Reset the product ID field
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data); // Log the server response
      }
      setDeleteError(error); // Set error state to display error message
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      {/* Form to input the product ID for deletion */}
      <form onSubmit={handleSubmit}>
        <label>
          Product ID:
          <input
            type="text"
            value={productId}
            onChange={handleInputChange}
            required 
          />
        </label>
        <br />
        <button type="submit">Delete Product</button>
      </form>

      {/* Display any errors that occurred during the delete operation */}
      {deleteError && <p>Error: {deleteError.message}</p>}
    </div>
  );
};

export default DeleteProductForm;
=======
// DeleteProductForm.js
// Author: Liam Kimberley || C3375248 
// Last Updated: 21/9/2024

import React, { useState } from "react";
import axios from "axios";

const DeleteProductForm = ({ getProducts }) => {
  // State to hold the product ID to be deleted
  const [productId, setProductId] = useState("");
  const [deleteError, setDeleteError] = useState(null); // State to track any errors during deletion

  // Handles changes to the product ID input field
  const handleInputChange = (e) => {
    setProductId(e.target.value);
  };

  // Handles form submission for deleting the product
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      // Send DELETE request to the API with the specified product ID
      await axios.delete(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/Product/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ", // Auth token for API
          },
        }
      );
      getProducts(); // Refresh the product list after successful deletion
      setProductId(""); // Reset the product ID field
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data); // Log the server response
      }
      setDeleteError(error); // Set error state to display error message
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      {/* Form to input the product ID for deletion */}
      <form onSubmit={handleSubmit}>
        <label>
          Product ID:
          <input
            type="text"
            value={productId}
            onChange={handleInputChange}
            required 
          />
        </label>
        <br />
        <button type="submit">Delete Product</button>
      </form>

      {/* Display any errors that occurred during the delete operation */}
      {deleteError && <p>Error: {deleteError.message}</p>}
    </div>
  );
};

export default DeleteProductForm;
>>>>>>> Stashed changes:entertainment-guild/src/component/DeleteProductForm.js

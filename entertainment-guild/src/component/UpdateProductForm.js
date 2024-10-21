// UpdateProductForm.js
// Author: Liam Kimberley || C3375248 
// Last Updated: 14/9/2024

import React, { useState } from "react";
import axios from "axios";

const UpdateProductForm = ({ getProducts }) => {
  // State to hold the data for the product to be updated
  const [patchProduct, setPatchProduct] = useState({
    ID: "", // Product ID for the product to be updated
    Author: "",
    Description: "",
    Genre: "",
    LastUpdatedBy: "",
    Name: "",
    Published: "",
    SubGenre: 1, // Default SubGenre value
  });
  const [patchError, setPatchError] = useState(null); // State to track any errors during update

  // Handles changes to the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatchProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value, 
    }));
  };

  // Handles form submission for updating the product
  const handlePatchSubmit = async (e) => {
    e.preventDefault(); 

    // Preparing the data to be patched
    const productToPatch = {
      Author: patchProduct.Author || undefined, 
      Description: patchProduct.Description || undefined,
      Genre: patchProduct.Genre ? parseInt(patchProduct.Genre, 10) : undefined, 
      LastUpdated: new Date().toISOString(), // Generate timestamp for LastUpdated
      LastUpdatedBy: patchProduct.LastUpdatedBy || undefined,
      Name: patchProduct.Name || undefined,
      Published: patchProduct.Published || undefined,
      SubGenre: patchProduct.SubGenre ? parseInt(patchProduct.SubGenre, 10) : undefined, 
    };

    try {
      // Send PATCH request to update the product in the API with the specified product ID
      await axios.patch(
        `http://localhost:8080/api/v1/db/data/v1/inft3050/Product/${patchProduct.ID}`,
        productToPatch,
        {
          headers: {
            "Content-Type": "application/json",
            "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ", // Auth token for API
          },
        }
      );
      getProducts(); // Refresh the product list after updating
    } catch (error) {
      setPatchError(error); // Set error state to display error message
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      {/* Form to input the product data for updating */}
      <form onSubmit={handlePatchSubmit}>
        <label>
          Product ID:
          <input
            type="text"
            name="ID"
            value={patchProduct.ID}
            onChange={handleInputChange}
            required // Makes the ID field mandatory
          />
        </label>
        <br />
        <label>
          Author:
          <input
            type="text"
            name="Author"
            value={patchProduct.Author}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="Description"
            value={patchProduct.Description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Genre:
          <input
            type="number"
            name="Genre"
            value={patchProduct.Genre}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="Name"
            value={patchProduct.Name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Published:
          <input
            type="text"
            name="Published"
            value={patchProduct.Published}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Last Updated By:
          <input
            type="text"
            name="LastUpdatedBy"
            value={patchProduct.LastUpdatedBy}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          SubGenre:
          <input
            type="number"
            name="SubGenre"
            value={patchProduct.SubGenre}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Update Product</button>
      </form>

      {/* Display any errors that occurred during the update */}
      {patchError && <p>Error: {patchError.message}</p>}
    </div>
  );
};

export default UpdateProductForm;

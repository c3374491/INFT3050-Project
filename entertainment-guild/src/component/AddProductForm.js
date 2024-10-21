// AddProductForm.js
// Author: Liam Kimberley || C3375248 
// Last Updated: 14/9/2024

import React, { useState } from "react";
import axios from "axios";

const AddProductForm = ({ getProducts }) => {
  // State to hold data for the new product to be added
  const [newProduct, setNewProduct] = useState({
    Author: "",
    Description: "",
    Genre: "",
    LastUpdatedBy: "",
    Name: "",
    Published: "",
    SubGenre: 1, // Default value for SubGenre
  });
  const [postError, setPostError] = useState(null); // State to track any errors during product addition

  // Handles changes to input fields for the new product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value, 
    }));
  };

  // Handles form submission for adding the new product
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Prepare the product data for POST request
    const productToPost = {
      Author: newProduct.Author,
      Description: newProduct.Description,
      Genre: parseInt(newProduct.Genre, 10), 
      LastUpdated: new Date().toISOString(), 
      LastUpdatedBy: newProduct.LastUpdatedBy,
      Name: newProduct.Name,
      Published: newProduct.Published,
      SubGenre: parseInt(newProduct.SubGenre, 10), 
    };

    try {
      // Send POST request to add the new product
      await axios.post(
        "http://localhost:8080/api/v1/db/data/v1/inft3050/Product",
        productToPost,
        {
          headers: {
            "Content-Type": "application/json",
            "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ", // Auth token for API
          },
        }
      );
      getProducts(); // Refresh the product list after successful addition
    } catch (error) {
      setPostError(error); // Set error state to display error message
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      {/* Form to input data for the new product */}
      <form onSubmit={handleSubmit}>
        <label>
          Author:
          <input
            type="text"
            name="Author"
            value={newProduct.Author}
            onChange={handleInputChange}
            required 
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="Description"
            value={newProduct.Description}
            onChange={handleInputChange}
            required 
          />
        </label>
        <br />
        <label>
          Genre:
          <input
            type="number"
            name="Genre"
            value={newProduct.Genre}
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
            value={newProduct.Name}
            onChange={handleInputChange}
            required 
          />
        </label>
        <br />
        <label>
          Published:
          <input
            type="text"
            name="Published"
            value={newProduct.Published}
            onChange={handleInputChange}
            required 
          />
        </label>
        <br />
        <label>
          Last Updated By:
          <input
            type="text"
            name="LastUpdatedBy"
            value={newProduct.LastUpdatedBy}
            onChange={handleInputChange}
            required 
          />
        </label>
        <br />
        <label>
          SubGenre:
          <input
            type="number"
            name="SubGenre"
            value={newProduct.SubGenre}
            onChange={handleInputChange}
            required 
          />
        </label>
        <br />
        <button type="submit">Add Product</button>
      </form>

      {/* Display any errors that occurred during the add operation */}
      {postError && <p>Error: {postError.message}</p>}
    </div>
  );
};

export default AddProductForm;

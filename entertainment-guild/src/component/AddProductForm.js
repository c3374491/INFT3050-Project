// AddProductForm.js
// Author: Liam Kimberley || C3375248 
// Last Updated: 14/9/2024

import React, { useState } from "react";
import axios from "axios";
import {TextField} from "@mui/material";
import HandleCookies from "../helpers/HandleCookies";

const AddProductForm = ({ }) => {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState(null);
    const [subgenre, setSubgenre] = useState(null);
    const [published, setPublished] = useState(null);
    const [postError, setPostError] = useState(null); // State to track any errors during product addition

    const { authToken } = HandleCookies();

  // Handles form submission for adding the new product
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    // Prepare the product data for POST request
    const productToPost = {
        Name: name,
        Author: author,
        Description: description,
        Genre: genre,
        SubGenre: subgenre,
        Published: published,
        LastUpdatedBy: authToken.UserName,
        LastUpdated: new Date(),
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
    } catch (error) {
      setPostError(error); // Set error state to display error message
    }
  };
  {/* Form to input data for the new product */}
  return (
      <form onSubmit={handleSubmit}>
          <div className="addProductContainer">
              <TextField
                  margin="dense"
                  label="Name"
                  type="text"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="addUserForm"
              />

              <TextField
                  margin="dense"
                  label="Author"
                  type="text"
                  name="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="addUserForm"
              />

              <TextField
                  margin="dense"
                  fullWidth
                  label="Description"
                  type="text"
                  name="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  multiline
                  className="addUserForm"
              />
                  
              <button type="submit">Add Product</button>
          </div>
              {/* Display submission errors with a custom message */}
              {postError && (
                  <div style={{color: "red", marginTop: "10px"}}>
                      <strong>Error: </strong>
                      {postError}
                  </div>
              )}
      </form>
);
};

export default AddProductForm;
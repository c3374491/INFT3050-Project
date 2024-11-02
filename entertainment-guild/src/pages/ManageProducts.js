// ManageProducts.js 
// Author: Liam Kimberley || C3375248 
// Last Updated: 14/9/2024

import React, { useEffect, useState } from "react";
import {TextField} from "@mui/material";
import AddUserForm from "../component/AddUserForm";
import ShowProducts from "../component/ShowProducts";
import AddProductForm from "../component/AddProductForm"; 

const ManageProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

    return (
      <div>
        <h1>Manage products</h1>
        <div className="containerTextField">
          <TextField
              id="standard-basic"
              label="Search products..."
              variant="standard"
              value={searchTerm}
              onChange={handleSearch}
              className="searchField"
          />
        </div>
        {/* Display list of Users or a message if no Users are available */}
        <ShowProducts apiUrl="http://localhost:8080/api/v1/db/data/v1/inft3050/Product?limit=1000"
                   searchTerm={searchTerm}/>
        <h2>Add a new product</h2>
        <AddProductForm/>
        
      </div>
  );
};

export default ManageProducts;

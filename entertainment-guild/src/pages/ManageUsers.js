// ManageUsers.js 
// Author: Liam Kimberley || C3375248 
// Last Updated: 14/10/2024

import ShowUsers from "../component/ShowUsers";
import {TextField} from "@mui/material";
import React, {useState} from "react";
import AddProductForm from "../component/AddProductForm";
import AddUserForm from "../component/AddUserForm"; 

const ManageUsers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
    <div>
      <h1>Manage Users</h1>
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
      {/* Display list of Users or a message if no Users are available */}
      <ShowUsers apiUrl1="http://localhost:8080/api/v1/db/data/v1/inft3050/User?limit=1000"
                 apiUrl2="http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons?limit=1000"
            searchTerm={searchTerm}/>
        <h2>Add a new user</h2>
        <AddUserForm/>

    </div>
  );
};

export default ManageUsers;

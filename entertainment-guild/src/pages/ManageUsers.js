// ManageUsers.js 
// Author: Liam Kimberley || C3375248 
// Last Updated: 14/10/2024

import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUserForm from "../component/AddUserForm"; 
import UpdateUserForm from "../component/UpdateUserForm"; 
import DeleteUserForm from "../component/DeleteUserForm";
import ShowUsers from "../component/ShowUsers"; 

const ManageUsers = () => {
  
  return (
    <div>
      <h1>Manage Users</h1>
      {/* Display list of Users or a message if no Users are available */}
      <ShowUsers apiUrl="http://localhost:8080/api/v1/db/data/v1/inft3050/User?limit=1000"/>

        {/* Render each of the forms for adding, updating, and deleting products */}
        {/*<AddUserForm getUsers={getUsers} />*/}
        {/*<UpdateUserForm getUsers={getUsers} />*/}
        {/*<DeleteUserForm getUsers={getUsers} />*/}

    </div>
  );
};

export default ManageUsers;

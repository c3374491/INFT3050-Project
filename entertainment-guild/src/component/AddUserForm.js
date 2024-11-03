import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import {sha256} from "../helpers/HandleLogin";
import "../style.css";
import Snackbar from "@mui/material/Snackbar";

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [postError, setPostError] = useState(null); // State to track errors while adding a user
  const [usernameError, setUsernameError] = useState(null); // Error state for existing username
  const [emailError, setEmailError] = useState(null); // Error state for existing email
  const [users, setUsers] = useState([]); // State to store the list of users
  const [error, setError] = useState(""); // State to store any fetch error
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null); // Error state for existing password
  const [isEmploye, setIsEmploye] = useState(null);
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8080/api/v1/db/data/v1/inft3050/User`, {
          headers: {
            Accept: "application/json",
            "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ",
          },
        });

        const patronsResponse = await axios.get(`http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons`, {
          headers: {
            Accept: "application/json",
            "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ",
          },
        });

        const users = [
          ...(userResponse.data.list || []),   
          ...(patronsResponse.data.list || []), 
        ];

        if (Array.isArray(users)) {
          setUsers(users);
        } else {
          console.warn("Expected array but got:", users);
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchUsers();
  }, []);

  // Function to generate a shorter salt (16 characters) 
  const generateShorterSalt = (length = 16) => {
    return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  };

  // Handle form submission to add a new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error states
    setPostError(null);
    setUsernameError(null);
    setEmailError(null);

    // Check if the username or email already exists in the user list
    const isUsernameTaken = users.some((user) => user.UserName === username);
    const isEmailTaken = users.some((user) => user.Email === email);

    if (isUsernameTaken) {
      setUsernameError("Username is already taken");
      return; // Stop submission if username exists
    }

    if (isEmailTaken) {
      setEmailError("Email is already taken");
      return; // Stop submission if email exists
    }

    // Generate salt and hash the password
    const generatedSalt = generateShorterSalt(16);  // Generate salt
    const hashedPassword = await sha256(generatedSalt + password); // Hash the password using salt

    // Prepare user data for the POST request, converting IsAdmin to 1 or 0
    const userToPost = {
      UserName: username,
      Email: email,
      Name: name,
      IsAdmin: isAdmin ? 1 : 0, // Convert boolean to integer
      IsEmploye : isEmploye ? 1 : 0,
      Salt: generatedSalt,
      HashPW: hashedPassword
    };
    

    try {
      if (isAdmin || isEmploye) {
        // Send POST request to add the new user
        await axios.post(
            "http://localhost:8080/api/v1/db/data/v1/inft3050/User",
            userToPost,
            {
              headers: {
                "Content-Type": "application/json",
                "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ",
              },
            }
        );
        window.location.reload();
      }
      else {
        // Send POST request to add the new user
        await axios.post(
            "http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons",
            userToPost,
            {
              headers: {
                "Content-Type": "application/json",
                "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ",
              },
            }
        );
        handleOpenSnackbar();
      }
    } catch (error) {
      console.error("Error response:", error.response ? error.response.data : error.message);
    }
  };

  // https://mui.com/material-ui/react-snackbar/
  // Function to open the snackbar and set the selected product
  const handleOpenSnackbar = () => {
    setSnackBarOpen(true);
  }

  // Function to close the snackbar and reset the cart product
  const handleCloseSnackbar = () => {
    setSnackBarOpen(false);

    window.location.reload();
  }


  return (

      <form onSubmit={handleSubmit}>
        <div className="addUserContainer">
          <TextField
              margin="dense"
              label="Username"
              type="text"
              name="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              error={Boolean(usernameError)} // Show red border if there is an error
              helperText={usernameError} // Display username error message
              className="addUserForm"
          />
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
              label="Email"
              type="email"
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={Boolean(emailError)} // Show red border if there is an error
              helperText={emailError} // Display email error message
              className="addUserForm"
          />
          <TextField
              margin="dense"
              label="Password"
              type="password"
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={Boolean(passwordError)} // Show red border if there is an error
              helperText={passwordError} // Display email error message
              className="addUserForm"
          />
          <label>
            Is Admin:
            <input
                type="checkbox"
                name="IsAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </label>
          <label>
            Is Employe:
            <input
                type="checkbox"
                name="IsEmploye"
                checked={isEmploye}
                onChange={(e) => setIsEmploye(e.target.checked)}
            />
          </label>
        </div>
        <div className="buttonSubmitContainer">
          <button type="submit" className="buttonSubmit">
            <strong>Add user</strong>
          </button>
        </div>
        {/* Display submission errors with a custom message */}
          {postError && (
              <div style={{color: "red", marginTop: "10px"}}>
                <strong>Error: </strong>
                {postError}
              </div>
          )}
        {/* Display a snackbar if a user add a product to cart
            Automaticallyb hidding after 3000ms, pop in the top right of the screen */}
        <Snackbar
            open={isSnackBarOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  // Set position to top-right
            message={`You created a new user : ${name}`}
            onClose={handleCloseSnackbar}
        />
      </form>
      

)
  ;
};

export default AddUserForm;

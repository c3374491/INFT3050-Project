import './App.css';
import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/Login";
import Books from "./pages/Books";
import Games from "./pages/Games";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import ErrorNotFound from "./pages/ErrorNotFound";
import SignUp from "./pages/SignUp";
import Management from "./pages/Management";
import ManageUsers from "./pages/ManageUsers";
import ManageProducts from "./pages/ManageProducts";
import NavBarUsers from "./component/NavBarUsers";
import NavBarAdmin from "./component/NavBarAdmin";

const App = () => {
  return (
    <>
      <NavBarUsers />
      <NavBarAdmin />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route path="/games" element={<Games />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/management" element={<Management />} />
        <Route path="/manageusers" element={<ManageUsers />} />
        <Route path="/manageproducts" element={<ManageProducts />} />
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </>
  );
}

export default App;

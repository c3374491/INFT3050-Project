import './App.css';
import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/Login";
import NavBar from "./component/NavBar";
import Books from "./pages/Books";
import Games from "./pages/Games";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route path="/games" element={<Games />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;

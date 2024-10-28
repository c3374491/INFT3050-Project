import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile"
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
import NavBarAdmin from "./component/NavBarAdmin"
import ProductListSearch from "./pages/ProductListSearch";
import { CookiesProvider } from 'react-cookie';
import HandleCookies from './helpers/HandleCookies';
import Checkout from "./pages/Checkout";
import AdminRoute from "./component/AdminRoute";
import ManageAccount from "./pages/ManageAccount.js";


const App = () => {

	const { authToken } = HandleCookies();

	return (
		<CookiesProvider>
			{(authToken == null && <NavBarUsers />) || (authToken.isAdmin && (<NavBarAdmin />) || authToken && <NavBarUsers /> )}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/login" element={<Login />} />
				<Route path="/books" element={<Books />} />
				<Route path="/games" element={<Games />} />
				<Route path="/movies" element={<Movies />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/productlistsearch" element={<ProductListSearch />} />

				{/* Protect the admin routes */}
				<Route path="/admin/management" element={<AdminRoute><Management /></AdminRoute>} />
				<Route path="/admin/manageusers" element={<AdminRoute><ManageUsers /></AdminRoute>} />
				<Route path="/admin/manageproducts" element={<AdminRoute><ManageProducts /></AdminRoute>} />

				<Route path="*" element={<ErrorNotFound />} />
			</Routes>
		</CookiesProvider>
	);
}

export default App;

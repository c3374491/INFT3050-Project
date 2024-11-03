import React, { useEffect, useState } from 'react';
import { Box, Alert } from "@mui/material";
import HandleCookies from "../helpers/HandleCookies";
import CartProductList from "../component/CartProductList";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { authToken, getCartCookie } = HandleCookies();
    const [products, setProducts] = useState([]);
    const [showAddToCart, setShowAddToCart] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const cart = getCartCookie("cart");
        console.log("cart = " + cart);
        if (cart) {
            try {
                // Parse the cart JSON to get an array of IDs
                const cartIDs = JSON.parse(cart);
                console.log("cartIDs = " + cartIDs);
                fetchProducts(cartIDs);
            } catch (error) {
                console.error('Error parsing cart JSON:', error);
            }
        }
    }, []);

    const fetchProducts = async (ids) => {
        const apiUrl = 'http://localhost:8080/api/v1/db/data/v1/inft3050/Product?limit=1000';
        try {
            const productResponse = await axios.get(apiUrl, {
                headers: {
                    'Accept': 'application/json',
                    'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                }
            });
            console.log(productResponse.data.list);

            const stocktakeResponse = await axios.get("http://localhost:8080/api/v1/db/data/v1/inft3050/Stocktake?limit=1000",{
                headers: {
                    'Accept': 'application/json',
                    'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                }
            });

            const productsList = productResponse.data.list.filter(product => ids.includes(product.ID));
            const stocktakeList = stocktakeResponse.data.list;

            // Merge prices into products
            const productsWithPrices = productsList.map(product => {
                const stockItem = stocktakeList.find(item => item.ProductId === product.ID);
                return {
                    ...product,
                    Price: stockItem ? stockItem.Price : null, // Assign price if available
                };
            });
            setProducts(productsWithPrices)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleCheckout = () => {
        if (authToken) {
            navigate('/checkout');
        }
        else {
            // Redirect to the login page
            navigate('/login');
        }
        
    };


    return (
        <div>
            <Box display="flex" justifyContent="center">
                <Box>
					{authToken && authToken.isAdmin && (<div><br /> <Alert severity="error">CAUTION: You are logged in as an Admin!</Alert></div>)}
                    <h1>Your Cart</h1>
                    {/* Show products in the cart */}
                    <CartProductList productList={products}/>
                    <Box className="centerButton">
                        <button onClick={handleCheckout} className="buttonCheckout">Checkout</button>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

export default Cart;

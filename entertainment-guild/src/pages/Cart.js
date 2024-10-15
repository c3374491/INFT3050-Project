import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import HandleCookies from "../helpers/HandleCookies";
import CartProductList from "../component/CartProductList";
import axios from "axios";

const Cart = () => {
    const { authToken, getCartCookie } = HandleCookies();
    const [currentCart, setCurrentCart] = useState([]);
    const [products, setProducts] = useState([]);

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
            const response = await axios.get(apiUrl, {
                headers: {
                    'Accept': 'application/json',
                    'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                },
                params: { ids: ids.join(',') }
            });

            // Affichez les données pour voir ce que vous obtenez
            console.log("Response data:", response.data);

            if (Array.isArray(response.data.list)) {
                console.log("Fetched Products:", response.data.list);

                // Filtrer les produits par ID
                const filteredProducts = response.data.list.filter(product =>
                    ids.includes(product.ID)
                );

                console.log("Filtered Products:", filteredProducts);
                setProducts(filteredProducts);
            } else {
                console.warn('Expected array but got:', response.data.list);
                setProducts([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    return (
        <div>
            <Box display="flex" justifyContent="center">
                <Box>
                    <h1>Your Cart</h1>
                    {/* Show products in the cart */}
                    <CartProductList productList={products} />
                </Box>
            </Box>
        </div>
    );
}

export default Cart;

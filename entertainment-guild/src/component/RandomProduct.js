import axios from "axios";
import React, {useEffect, useState} from "react";
import addToCartIcon from "../assets/images/add-to-cart-icon.svg";
import informationIcon from "../assets/images/information-icon.png";
import {Box, Typography} from "@mui/material";
import ProductDetailsPopup from "./ProductDetailPopup";
import HandleCookies from '../helpers/HandleCookies';
import Snackbar from "@mui/material/Snackbar";

const RandomProduct = ({ genre }) => {

    const [isOpen, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [product, setProduct] = useState([]);
    const {setCartCookie, getCartCookie} = HandleCookies();

    const [isSnackBarOpen, setSnackBarOpen] = useState(false);
    const [cartProduct, setCartProduct] = useState(null);
    
    // Get handleOpenPopup and handleClosePopup functions from https://mui.com/material-ui/react-dialog/
    // Function to open the popup and set the selected product
    const handleOpenPopup = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    // Function to close the popup and reset the selected product
    const handleClosePopup = () => {
        setSelectedProduct(null);
        setOpen(false);
    };

    // Function to fetch products based on genre
    const fetchProducts = async (genre) => {
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

            const productsList = productResponse.data.list.filter(item => item.Genre === genre);
            const stocktakeList = stocktakeResponse.data.list;

            // Merge prices into products
            const productsWithPrices = productsList.map(product => {
                const stockItem = stocktakeList.find(item => item.ProductId === product.ID);
                return {
                    ...product,
                    Price: stockItem ? stockItem.Price : null, // Assign price if available
                };
            });

                if (productsWithPrices.length > 0) {
                    // Select a random product from the filtered list
                    const randomProduct = productsWithPrices[Math.floor(Math.random() * productsWithPrices.length)];
                    setProduct([randomProduct]); // Set it as a single product in an array
                } else {
                    console.warn('No products found for the specified genre.');
                    setProduct([]);
                }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Fetch products when the component mounts or genre changes
    useEffect(() => {
        fetchProducts(genre);
    }, [genre]);

    const addToCart = (product) => {
        console.log(product)
        setCartCookie(product);
        const updatedCart = getCartCookie();
        console.log("Cart updated with IDs:", updatedCart);
        handleOpenSnackbar(product);
    };

    // https://mui.com/material-ui/react-snackbar/
    // Function to open the snackbar and set the selected product
    const handleOpenSnackbar = (product) => {
        setCartProduct(product);
        setSnackBarOpen(true);
    }

    // Function to close the snackbar and reset the cart product
    const handleCloseSnackbar = () => {
        setCartProduct(null);
        setSnackBarOpen(false);
    }

    return (
        <Box>
            {product.length === 1 ? (
                product.map((product, index) => (
                    <li key={index} className="productStyleVertical">
                        <div className="productInfoVertical">
                            <strong>{product.Name}</strong>
                        </div>
                        <div className="priceProduct">
                            ${product.Price}
                        </div>
                            <p className="productDescription">
                                {product.Description}
                            </p>
                            <div className="productAction">
                                <button onClick={() => handleOpenPopup(product)} className="productCart">
                                    <img src={informationIcon} alt="Info Button Icon" className="productCartImage"/>
                                </button>
                                <button onClick={() => addToCart(product)} className="productCart">
                                    <img src={addToCartIcon} alt="Add to car Button Icon" className="productCartImage"/>
                                </button>
                            </div>
                    </li>
                ))
                ) : (
                <Typography variant="body1">No products found for the selected genre.</Typography>
            )}
            {/* Display the popup dialog with more details */}
            {selectedProduct && (
                <ProductDetailsPopup
                    open={isOpen}
                    product={selectedProduct}
                    onClose={handleClosePopup}
                />
            )}
            {/* Display a snackbar if a user add a product to cart
            Automaticallyb hidding after 3000ms, pop in the top right of the screen */}
            <Snackbar
                open={isSnackBarOpen}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  // Set position to top-right
                message={cartProduct ? `You added ${cartProduct.Name} to the cart` : ''}
                onClose={handleCloseSnackbar}
            />
        </Box>

    );
};

export default RandomProduct;

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ProductDetailsPopup from "./ProductDetailPopup";
import "../style.css";
// https://mui.com/material-ui/react-snackbar/
import Snackbar from '@mui/material/Snackbar';
import "../helpers/HandleCookies"
import HandleCookies from "../helpers/HandleCookies";
import informationIcon from "../assets/images/information-icon.png";
import addToCartIcon from "../assets/images/add-to-cart-icon.svg";

// ProductList component to display a list of products and a popup dialog with more details
// apiUrl: string containing the URL to fetch the products data
// genre: string containing the genre to filter the products, 1 -> books, 2-> movies or 3 -> games
// title: string containing the title to display above the list of products depends on the genre
const ProductList = ({ apiUrl, genre, searchTerm, descriptionLength, orientation = "horizontal"}) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isSnackBarOpen, setSnackBarOpen] = useState(false);
    const [cartProduct, setCartProduct] = useState(null);
    const { setCartCookie, getCartCookie } = HandleCookies();

    // Fetch products data from the API
    useEffect(() => {
        const fetchProducts = async () => {
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

                setProducts(productsWithPrices);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchProducts();
    }, [apiUrl, genre]);

    const filteredProducts = products
        .filter(product =>
            product.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.Description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aInName = a.Name.toLowerCase().includes(searchTerm.toLowerCase());
            const bInName = b.Name.toLowerCase().includes(searchTerm.toLowerCase());

            // Put first where the search is in the name
            if (aInName && !bInName) return -1; // `a` comes first
            if (!aInName && bInName) return 1;  // `b` comes first
            return 0; // Keep original order if no match
        });


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

    const addToCart = (product) => {
        console.log(product)
        setCartCookie(product);
        const updatedCart = getCartCookie();
        console.log("Cart updated with IDs:", updatedCart);
        handleOpenSnackbar(product);
    };


    // Display the list of products
    // If the description is longer than 400 characters, display only the first 400 characters
    // Display a button to open the popup with more details
    return (
        <div>
            {filteredProducts.length > 0 ? (
                <ul>
                    {filteredProducts.map((product, index) => (
                        <li key={index}
                            className={orientation === "horizontal" ? "productStyleHorizontal" : "productStyleVertical"}>
                            <div className={orientation === "horizontal" ? "productInfoHorizontal" : "productInfoVertical"}>
                                <strong>{product.Name}</strong>
                            </div>
                            <strong>${product.Price}</strong>
                            <p className="productDescription">
                                {product.Description.length > descriptionLength
                                    ? `${product.Description.substring(0, descriptionLength)}...`
                                    : product.Description}
                            </p>
                            <div className={orientation === "vertical" ? "productAction" : null}>
                                <button onClick={() => handleOpenPopup(product)} className="productCart">
                                    <img src={informationIcon} alt="Info Button Icon" className="productCartImage"/>
                                </button>
                                <button onClick={() => addToCart(product)} className="productCart">
                                    <img src={addToCartIcon} alt="Add to car Button Icon" className="productCartImage"/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products available.</p>
            )}
            {error && <p>Error: {error.message}</p>}

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
        </div>
    );
};

export default ProductList;

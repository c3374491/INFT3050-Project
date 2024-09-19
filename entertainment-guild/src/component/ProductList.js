import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductDetailsPopup from "./ProductDetailPopup";
import "../style.css";

// ProductList component to display a list of products and a popup dialog with more details
// apiUrl: string containing the URL to fetch the products data
// genre: string containing the genre to filter the products, 1 -> books, 2-> movies or 3 -> games
// title: string containing the title to display above the list of products depends on the genre
const ProductList = ({ apiUrl, genre, title }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch products data from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        'Accept': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                });

                if (Array.isArray(response.data.list)) {
                    const filteredProducts = response.data.list.filter(item => item.Genre === genre);
                    setProducts(filteredProducts);
                } else {
                    console.warn('Expected array but got:', response.data.list);
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchProducts();
    }, [apiUrl, genre]);

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

    // Display the list of products
    // If the description is longer than 400 characters, display only the first 400 characters
    // Display a button to open the popup with more details
    return (
        <div>
            <h1>{title}</h1>
            {products.length > 0 ? (
                <ul>
                    {products.map((product, index) => (
                        <li key={index} className="productStyle">
                            <div className="productInfo">
                                <strong>{product.Name}</strong>
                            </div>
                            <p className="productDescription">
                                {product.Description.length > 400
                                    ? `${product.Description.substring(0, 400)}...`
                                    : product.Description}
                            </p>
                            {/* Button to open the pop up */}
                            <button onClick={() => handleOpenPopup(product)}>i</button>
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
        </div>
    );
};

export default ProductList;

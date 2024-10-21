import React, {useState} from 'react';
import {Box, Typography} from "@mui/material";
import "../style.css";
import ProductDetailsPopup from "./ProductDetailPopup";
import HandleCookies from "../helpers/HandleCookies";
import deleteIcon from "../assets/images/delete-icon.png";
import informationIcon from "../assets/images/information-icon.png";

const CartProductList = ({ productList }) => {

    const [isOpen, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const {removeProductFromCart} = HandleCookies();
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

    // Fonction to delete the product from the cookie
    const handleDeleteProductCookie = (productId) => {
        removeProductFromCart(productId);
        window.location.reload()
    };
    
    return (
        <Box>
            {productList.length > 0 ? (
                productList.map((product,index) => (
                    <li key={index} className="productStyleHorizontal">
                        <div className="productInfoHorizontal">
                            <strong>{product.Name}</strong>
                        </div>
                        <p className="productDescription">
                            {product.Description.length > 300
                                ? `${product.Description.substring(0, 300)}...`
                                : product.Description}
                        </p>
                        <button onClick={() => handleOpenPopup(product)} className="productCart">
                            <img src={informationIcon} alt="Info Button Icon" className="productCartImage"/>
                        </button>
                        <button onClick={() => handleDeleteProductCookie(product.ID)} className="productCart">
                            <img src={deleteIcon} alt="Delete Button Icon" className="productCartImage"/>
                        </button>
                    </li>
                ))
            ) : (
                <Typography variant="body1">Your cart is empty.</Typography>
            )}
            {/* Display the popup dialog with more details */}
            {selectedProduct && (
                <ProductDetailsPopup
                    open={isOpen}
                    product={selectedProduct}
                    onClose={handleClosePopup}
                    showAddToCart={false}
                />
            )}
        </Box>
    );
};

export default CartProductList;

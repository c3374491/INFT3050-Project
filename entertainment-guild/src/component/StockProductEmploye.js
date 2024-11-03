import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "../style.css";
import "../helpers/HandleCookies"
import editIcon from "../assets/images/edit_icon.png";
import deleteIcon from "../assets/images/delete-icon.png";
import bookIcon from "../assets/images/book_icon.png";
import movieIcon from "../assets/images/movie_icon.png";
import gameIcon from "../assets/images/game_icon.png";
import {format} from "date-fns";
import ProductEditPopup from "./ProductEditPopup";
import ProductDeletePopup from "./ProductDeletePopup";
import Snackbar from "@mui/material/Snackbar";
import StockEditPopup from "./StockEditPopup";

// ShowProduct component to display a list of the products
// apiUrl: string containing the URL to fetch the products data
const StockProductEmploye = ({ apiUrl, apiUrl2, searchTerm, genre}) => {
    const [products, setProducts] = useState([]);
    const [selectedProductEdit, setSelectedProductEdit] = useState(null);
    const [selectedProductDelete, setSelectedProductDelete] = useState(null);
    const [error, setError] = useState(null);
    const [isOpenEdit, setOpenEdit] = useState(false);
    const [isOpenDelete, setOpenDelete] = useState(false);


    // Get handleOpenPopup and handleClosePopup functions from https://mui.com/material-ui/react-dialog/
    // Function to open the popup and set the selected product
    const handleOpenPopup = (product) => {
        setSelectedProductEdit(product);
        setOpenEdit(true);
    };

    // Function to close the popup and reset the selected product
    const handleClosePopup = () => {
        setSelectedProductEdit(null);
        setOpenEdit(false);
    };

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

                const stocktakeResponse = await axios.get(apiUrl2, {
                    headers: {
                        'Accept': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                });
                
                const productsList = productResponse.data.list.filter(item => item.Genre === genre);
                const stocktakeList = stocktakeResponse.data.list;

                // Merge prices into products
                const products = productsList.map(product => {
                    const stockItem = stocktakeList.find(item => item.ProductId === product.ID);
                    return {
                        ...product,
                        Price: stockItem ? stockItem.Price : null, // Assign price if available
                        Quantity: stockItem ? stockItem.Quantity : null, // Assign quantity if available
                        ProductId: stockItem ? stockItem.ProductId : null
                    };
                });

                if (Array.isArray(products)) {
                    setProducts(products);
                } else {
                    console.warn('Expected array but got:', products);
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchProducts();
    }, [apiUrl]);

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


    // Display the list of products
    return (
        <div>
            <div className="stockTableWrap">
                {filteredProducts.length > 0 ? (
                    <table className="stockTable">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Edit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredProducts.map((product, index) => (
                            <tr key={index} className={index % 2 === 0 ? "evenRow" : "oddRow"}>
                                <td>{product.Name}</td>
                                <td>{product.Author}</td>
                                <td>
                                    {product.Quantity}
                                </td>
                                <td>
                                    {product.Price}
                                </td>
                                <td>
                                    <button onClick={() => handleOpenPopup(product)} className="editButton">
                                        <img src={editIcon} alt="Edit Button Icon" className="editImage"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No products available.</p>
                )}
            </div>
            {error && <p>Error: {error.message}</p>}

            {selectedProductEdit && (
                <StockEditPopup
                    open={isOpenEdit}
                    product={selectedProductEdit}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
};

export default StockProductEmploye;

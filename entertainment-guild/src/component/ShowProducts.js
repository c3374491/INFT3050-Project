import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "../style.css";
import "../helpers/HandleCookies"
import editIcon from "../assets/images/edit_icon.png";
import deleteIcon from "../assets/images/delete-icon.png";
import UserDeletePopup from "./UserDeletePopup";
import bookIcon from "../assets/images/book_icon.png";
import movieIcon from "../assets/images/movie_icon.png";
import gameIcon from "../assets/images/game_icon.png";
import {format} from "date-fns";
import ProductEditPopup from "./ProductEditPopup";
import ProductDeletePopup from "./ProductDeletePopup";

// ShowProduct component to display a list of the products
// apiUrl: string containing the URL to fetch the products data
const ShowProducts = ({ apiUrl, searchTerm}) => {
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

    const handleDeleteUser = (product) => {
        setSelectedProductDelete(product);
        setOpenDelete(true);
    }

    const handleClosePopupDelete = () => {
        setSelectedProductDelete(null);
        setOpenDelete(false);
    };


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
                    setProducts(response.data.list);
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


    // Display the list of users
    return (
        <div>
            <div className="userTableWrap">
                {filteredProducts.length > 0 ? (
                    <table className="userTable">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Description</th>
                            <th>Genre</th>
                            <th>Subgenre</th>
                            <th>Published</th>
                            <th>Last updated by</th>
                            <th>Last update</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredProducts.map((product, index) => (
                            <tr key={index} className={index % 2 === 0 ? "evenRow" : "oddRow"}>
                                <td>{product.Name}</td>
                                <td>{product.Author}</td>
                                <td>{product.Description.length > 150
                                    ? `${product.Description.substring(0, 150)}...`
                                    : product.Description}</td>
                                <td>
                                    {product.Genre === 1 ? (
                                        <img src={bookIcon} alt="Genre 1" width="30px" />
                                    ) : product.Genre === 2 ? (
                                        <img src={movieIcon} alt="Genre 2" width="30px" />
                                    ) : product.Genre === 3 ? (
                                        <img src={gameIcon} alt="Genre 3" width="30px"/>
                                    ) : (
                                        <img src="no.png" alt="Default Genre" />
                                    )}
                                </td>
                                <td>
                                    {product.SubGenre}
                                </td>
                                <td>
                                    {format(new Date(product.Published), 'MMMM dd, yyyy')}
                                </td>
                                <td>
                                    {product.LastUpdatedBy}
                                </td>
                                <td>
                                    {format(new Date(product.LastUpdated), 'MMMM dd, yyyy')}
                                </td>
                                <td>
                                    <button onClick={() => handleOpenPopup(product)} className="editButton">
                                        <img src={editIcon} alt="Edit Button Icon" className="editImage"/>
                                    </button>
                                    <button onClick={() => handleDeleteUser(product)} className="deleteButton">
                                        <img src={deleteIcon} alt="Delete Button Icon" className="deleteImage"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users available.</p>
                )}
            </div>
            {error && <p>Error: {error.message}</p>}

            {selectedProductEdit && (
                <ProductEditPopup
                    open={isOpenEdit}
                    product={selectedProductEdit}
                    onClose={handleClosePopup}
                />
            )}

            {selectedProductDelete && (
                <ProductDeletePopup
                    open={isOpenDelete}
                    product={selectedProductDelete}
                    onClose={handleClosePopupDelete}
                />
            )}
        </div>
    );
};

export default ShowProducts;

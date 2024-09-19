import React from 'react';
import ProductList from "../component/ProductList";

// Books component to display a list of books and a popup dialog with more details
const Books = () => {
    return (
        <ProductList
            apiUrl='http://localhost:8080/api/v1/db/data/v1/inft3050/Product'
            genre={1}
            title="Books"
        />
    );
};

export default Books;

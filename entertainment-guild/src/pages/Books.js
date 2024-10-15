import React, {useState} from 'react';
import ProductList from "../component/ProductList";
import {TextField} from "@mui/material";

// Books component to display a list of books and a popup dialog with more details
const Books = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    
    return (
        <div>
            <h1>Books</h1>
            <div className="containerTextField">
            <TextField 
                id="standard-basic" 
                label="Search books..." 
                variant="standard"
                value={searchTerm}
                onChange={handleSearch}
                className="searchField"
            />
            </div>
            <ProductList
                apiUrl='http://localhost:8080/api/v1/db/data/v1/inft3050/Product?limit=1000'
                genre={1}
                searchTerm={searchTerm}
                descriptionLength={400}
            />
        </div>
    );
};

export default Books;

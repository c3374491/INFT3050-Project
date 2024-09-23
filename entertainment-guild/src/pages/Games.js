import React, {useState} from 'react';
import {TextField} from "@mui/material";
import ProductList from "../component/ProductList";

const Games = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    
    return (
        <div>
            <h1>Games</h1>
            <div className="containerTextField">
                <TextField
                    id="standard-basic"
                    label="Search games..."
                    variant="standard"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="searchField"
                />
            </div>
            <ProductList
                apiUrl='http://localhost:8080/api/v1/db/data/v1/inft3050/Product?limit=1000'
                genre={3}
                searchTerm={searchTerm}
            />
        </div>
    );
}

export default Games;
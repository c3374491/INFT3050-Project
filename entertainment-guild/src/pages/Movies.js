import React, {useState} from 'react';
import {TextField} from "@mui/material";
import ProductList from "../component/ProductList";

const Movies = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    
    return (
        <div>
            <h1>Movies</h1>
            <div className="containerTextField">
                <TextField
                    id="standard-basic"
                    label="Search movies..."
                    variant="standard"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="searchField"
                />
            </div>
            <ProductList
                apiUrl='http://localhost:8080/api/v1/db/data/v1/inft3050/Product?limit=1000'
                genre={2}
                searchTerm={searchTerm}
                descriptionLength={400}
            />
        </div>
    );
}

export default Movies;
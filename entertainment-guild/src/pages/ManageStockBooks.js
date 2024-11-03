
import React, { useEffect, useState } from "react";
import {TextField} from "@mui/material";
import StockProductEmploye from "../component/StockProductEmploye";

const ManageStockBooks = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <h1>Manage stock books</h1>
            <div className="containerTextField">
                <TextField
                    id="standard-basic"
                    label="Search products..."
                    variant="standard"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="searchField"
                />
            </div>
            {/* Display list of Users or a message if no Users are available */}
            <StockProductEmploye apiUrl="http://localhost:8080/api/v1/db/data/v1/inft3050/Product?limit=1000"
                                 apiUrl2="http://localhost:8080/api/v1/db/data/v1/inft3050/Stocktake?limit=1000"
                          searchTerm={searchTerm}
            genre={1}/>

        </div>
    );
};

export default ManageStockBooks;

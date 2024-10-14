import { useLocation } from 'react-router-dom';
import React, {useState} from "react";
import ProductListSearchComponent from "../component/ProductListSearchComponent";

const ProductListSearch = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('query');

    return (
        <div>
            <h1>Result for the search : {searchTerm}</h1>
            <div className="containerProductListSearchComponent">
            <ProductListSearchComponent 
                apiUrl={'http://localhost:8080/api/v1/db/data/v1/inft3050/Product?limit=1000'}
                genre={1}
                searchTerm={searchTerm}
                descriptionLength={100}
            />
            <ProductListSearchComponent
                apiUrl={'http://localhost:8080/api/v1/db/data/v1/inft3050/Product?limit=1000'}
                genre={2}
                searchTerm={searchTerm}
                descriptionLength={100}
            />
            <ProductListSearchComponent
                apiUrl={'http://localhost:8080/api/v1/db/data/v1/inft3050/Product?limit=1000'}
                genre={3}
                searchTerm={searchTerm}
                descriptionLength={100}
            />
            </div>
        </div>
    );
};

export default ProductListSearch;

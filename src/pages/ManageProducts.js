import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageProducts = () => {
    const [Product, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/db/data/v1/inft3050/Product', {
                    headers: {
                        'Accept': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                });
                console.log('API Response:', response.data); 
                if (Array.isArray(response.data.list)) {
                    setProducts(response.data.list);
                } else {
                    console.warn('Expected array in list but got:', response.data.list);
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchProducts();
    }, []);

    const filteredProduct = Product.filter(product => product.SubGenre === 1); // All products with a SubGenre of 1

    return (
        <div>
            <h1>Manage Products</h1>
            {filteredProduct.length > 0 ? (
                <ul>
                    {filteredProduct.map((product, index) => (
                        //Product information
                        <li key={index}>
                            <strong>{product.Name}</strong> 
                            <p>{product.Published}</p>
                            <p>{product.LastUpdatedBy}</p>
                            <p>{product.LastUpdated}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Products available.</p>
            )}
            {error && <p>Error: {error.message}</p>}
        </div>
    );


};

export default ManageProducts;

// ManageProducts.js 
// Author: Liam Kimberley || C3375248 
// Last Updated: 14/9/2024

import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProductForm from "../component/AddProductForm"; 
import UpdateProductForm from "../component/UpdateProductForm"; 
import DeleteProductForm from "../component/DeleteProductForm"; 

const ManageProducts = () => {
  const [Product, setProducts] = useState([]); // State to hold the list of products
  const [error, setError] = useState(null); // State to track any errors during data fetching

  useEffect(() => {
    getProducts();
  }, []);

  // Function to get products from the API
  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/db/data/v1/inft3050/Product?limit=1000",
        {
          headers: {
            "Content-Type": "application/json",
            "xc-token": "sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ", // Auth token for API
          },
        }
      );
      if (Array.isArray(response.data.list)) {
        setProducts(response.data.list); // Update the state with the fetched products
      } else {
        setProducts([]); 
      }
    } catch (error) {
      setError(error); 
    }
  };

  // Filter products 
  const filteredProduct = Product.filter((product) => product.SubGenre === 1);

  return (
    <div>
      <h1>Manage Products</h1>
      {/* Display list of products that match the filter or a message if no products are available */}
      {filteredProduct.length > 0 ? (
        <ul>
          {filteredProduct.map((product, index) => (
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
      {error && <p>Error: {error.message}</p>} {/* Display any errors that occurred */}

      {/* Render each of the forms for adding, updating, and deleting products */}
      <AddProductForm getProducts={getProducts} />
      <UpdateProductForm getProducts={getProducts} />
      <DeleteProductForm getProducts={getProducts} />
    </div>
  );
};

export default ManageProducts;

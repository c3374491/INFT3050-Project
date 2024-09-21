import React from 'react';
import { useLocation } from 'react-router-dom';
import ItemDisplay from '../component/ItemDisplay';

const SearchBarResults = () => {
  const location = useLocation();
  const { filteredProducts } = location.state || {}; // Get the filtered products from state

  return (
    <div>
      <h1>Results</h1>
      {/* Check if there are results and display them */}
      {filteredProducts && filteredProducts.length > 0 ? (
		<div>
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.ID}>
              <strong>{product.Name}</strong> by {product.Author} <br />
              {product.Description}
            </li>
          ))}
        </ul>
		<ItemDisplay />
		</div>
      ) : (
        <p>No results</p>
      )}
    </div>
  );
};

export default SearchBarResults;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [bookDetails, setBookDetails] = useState(null)

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/db/data/v1/inft3050/Genre/1', {
                    headers: {
                        'Accept': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                });
                console.log('API Response:', response.data["Product List"]); // Check the response
                // Access to the list array of the response
                if (Array.isArray(response.data["Product List"])) {
                    setBooks(response.data["Product List"]);
                } else {
                    console.warn('Expected array in list but got:', response.data["Product List"]);
                    setBooks([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchBooks();
    }, []);
    

    return (
        <div>
            <h1>Books</h1>
            {books.length > 0 ? (
                <ul>
                    {books.map((book, index) => (
                        <li key={index}>
                            <strong>{book.Name}</strong>
                            <p>{book.Description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books available.</p>
            )}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Books;

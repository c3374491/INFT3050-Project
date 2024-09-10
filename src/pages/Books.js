import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/db/data/v1/inft3050/Product', {
                    headers: {
                        'Accept': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                });
                console.log('API Response:', response.data); // Vérifie la réponse
                // Accède au tableau `list` dans la réponse
                if (Array.isArray(response.data.list)) {
                    setBooks(response.data.list);
                } else {
                    console.warn('Expected array in list but got:', response.data.list);
                    setBooks([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book => book.SubGenre === 1); // Filter books based on SubGenre

    return (
        <div>
            <h1>Books</h1>
            {filteredBooks.length > 0 ? (
                <ul>
                    {filteredBooks.map((book, index) => (
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

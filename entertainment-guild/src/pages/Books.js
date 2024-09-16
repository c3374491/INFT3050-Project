import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../style.css"

const Books = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Get the list of books
                const response = await axios.get('http://localhost:8080/api/v1/db/data/v1/inft3050/Product', {
                    headers: {
                        'Accept': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                });

                console.log('fetch product API Response:', response.data);

                if (Array.isArray(response.data.list)) {
                    const books = response.data.list.filter(product => product.Genre === 1)
                    setBooks(books);
                } else {
                    console.warn('Expected array in Product List but got:', response.data.list);
                    setBooks([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchBooks();
    }, []);
    
    const shorterDescription = (text) => {
        if (text.length > 400) {
            return text.substring(0, 400) + '...';
        }
        return text;
    }

    return (
        <div>
            <h1>Books</h1>
            {books.length > 0 ? (
                <ul>
                    {books.map((book, index) => (
                        <div className="productStyle" key={index}>
                            <div className="bookInfo">
                                <strong>{book.Name}</strong>
                                <p>{book.Author}</p>
                            </div>
                            
                            <p className="productDescription">{shorterDescription(book.Description)}</p>
                        </div>
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
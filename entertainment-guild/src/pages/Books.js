import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../style.css"

const Books = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [bookDetails, setBookDetails] = useState(null)

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Get the list of books
                const response = await axios.get('http://localhost:8080/api/v1/db/data/v1/inft3050/Genre/1', {
                    headers: {
                        'Accept': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                });

                console.log('fetch book API Response:', response.data["Product List"]);

                if (Array.isArray(response.data["Product List"])) {
                    // Get the details for the books
                    const booksWithDetails = await Promise.all(
                        response.data["Product List"].map(async (book) => {
                            try {
                                const detailsResponse = await axios.get(`http://localhost:8080/api/v1/db/data/v1/inft3050/Product/${book.ID}`, {
                                    headers: {
                                        'Accept': 'application/json',
                                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                                    }
                                });
                                // Return the book and its details
                                return {
                                    ...book,
                                    Description: detailsResponse.data.Description,
                                    Author: detailsResponse.data.Author
                                };
                            } catch (error) {
                                console.error(`Error fetching details for book ID ${book.ID}:`, error);
                                return {
                                    ...book,
                                    Description: 'Description not available'
                                };
                            }
                        })
                    );
                    setBooks(booksWithDetails);
                } else {
                    console.warn('Expected array in Product List but got:', response.data["Product List"]);
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
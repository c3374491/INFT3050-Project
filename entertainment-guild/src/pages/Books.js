import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../style.css"
import '@mui/material';
import {format} from 'date-fns';
import {Button, DialogActions, DialogContent, DialogTitle, Typography, Dialog} from "@mui/material";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

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
    
    const handleButtonClick = (book) => {
        setSelectedBook(book);
        setIsPopupOpen(true);
    }
    
    const closePopup = () => {
        setSelectedBook(null);
        setIsPopupOpen(false);
    }

    const addToCart = async (bookId) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/db/data/v1/inft3050/Cart',
                {
                    bookId: selectedBook,
                    quantity: 1
                }, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                });

            console.log('Add to cart response:', response.data);
            alert('Book added to cart!');
        } catch (error) {
            console.error('Error adding book to cart:', error);
            alert('Failed to add book to cart.');
        }
    };


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
                            <div className="infoAndCart">
                                <button variant="contained" onClick={() => handleButtonClick(book)}>i</button>
                                <button onClick={() => addToCart(book)}>cart</button>
                            </div>
                        </div>
                    ))}
                    </ul>
                ) : (
                    <p>No books available.</p>
                )}
            {error && <p>Error: {error.message}</p>}

            <Dialog open={isPopupOpen} onClose={closePopup}>
                <DialogTitle>{selectedBook?.Name}</DialogTitle>
                <DialogContent>
                    <Typography><strong>by</strong> {selectedBook?.Author}</Typography>
                    <Typography>{selectedBook?.Description}</Typography>
                    <Typography><strong>Published the</strong> {selectedBook? format(new Date(selectedBook.Published), 'MMMM, dd yyyy') : ''}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closePopup} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Books;



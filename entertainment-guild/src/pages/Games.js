import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Games = () => {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
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
                    setGames(response.data.list);
                } else {
                    console.warn('Expected array in list but got:', response.data.list);
                    setGames([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchGames();
    }, []);

    const filteredGames = games.filter(book => book.SubGenre === 2); // Filter games based on SubGenre

    return (
        <div>
            <h1>Games</h1>
            {filteredGames.length > 0 ? (
                <ul>
                    {filteredGames.map((book, index) => (
                        <li key={index}>{book.Name}</li>
                    ))}
                </ul>
            ) : (
                <p>No games available.</p>
            )}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Games;

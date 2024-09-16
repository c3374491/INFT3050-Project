import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Games = () => {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/db/data/v1/inft3050/Genre/3', {
                    headers: {
                        'Accept': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                });
                console.log('API Response:', response.data["Product List"]);// Check the response
                // Access to the list array of the response
                if (Array.isArray(response.data["Product List"])) {
                    setGames(response.data["Product List"]);
                } else {
                    console.warn('Expected array in list but got:', response.data["Product List"]);
                    setGames([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchGames();
    }, []);

    return (
        <div>
            <h1>Games</h1>
            {games.length > 0 ? (
                <ul>
                    {games.map((game, index) => (
                        <li key={index}>
                            <strong>{game.Name}</strong>
                            <p>{game.Description}</p>
                        </li>
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

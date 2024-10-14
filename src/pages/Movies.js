import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
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
                    setMovies(response.data.list);
                } else {
                    console.warn('Expected array in list but got:', response.data.list);
                    setMovies([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchMovies();
    }, []);

    const filteredMovies = movies.filter(movie => movie.SubGenre === 3); // Filter movies based on SubGenre

    return (
        <div>
            <h1>Movies</h1>
            {filteredMovies.length > 0 ? (
                <ul>
                    {filteredMovies.map((movie, index) => (
                        <li key={index}>
                            <strong>{movie.Name}</strong>
                            <p>{movie.Description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No movies available.</p>
            )}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Movies;

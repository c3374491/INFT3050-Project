import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/db/data/v1/inft3050/Genre/2', {
                    headers: {
                        'Accept': 'application/json',
                        'xc-token': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ'
                    }
                });
                console.log('API Response:', response.data["Product List"]); // Check the response
                // Access to the list array of the response
                if (Array.isArray(response.data["Product List"])) {
                    setMovies(response.data["Product List"]);
                } else {
                    console.warn('Expected array in list but got:', response.data);
                    setMovies([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Movies</h1>
            {movies.length > 0 ? (
                <ul>
                    {movies.map((movie, index) => (
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

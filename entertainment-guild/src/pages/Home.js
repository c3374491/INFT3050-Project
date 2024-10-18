import React from 'react';
import RandomProduct from "../component/RandomProduct";

const Home = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Welcome!</h1>

            <h2>You might be interested in:</h2>
            <div className="containerProductListSearchComponent" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <h3>Book</h3>
                    <RandomProduct genre={1} />
                </div>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <h3>Movie</h3>
                    <RandomProduct genre={2} />
                </div>
                <div style={{ flex: 1 }}>
                    <h3>Game</h3>
                    <RandomProduct genre={3} />
                </div>
            </div>
        </div>
    );
}

export default Home;

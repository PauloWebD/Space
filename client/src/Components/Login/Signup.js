import React, { useState } from 'react';
import './Login.css';
import Navbar from '../Navbar';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const [favoritePlanet, setFavoritePlanet] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        // Check that the password and confirmation match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Make API call to add the user
        try {
            const response = await fetch('http://localhost:3001/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email, favoritePlanet }),
            });

            if (response.ok) {
                // Signup successful, redirect to signup page
                window.location.href = '/signup';
            } else {
                // Signup failed, display error message
                const data = await response.json();
                setError(data.message);
            }
        } catch (err) {
            console.error(err);
            setError('Error signing up');
        }
    };
    const handlePlanetChange = (event) => {
        setFavoritePlanet(event.target.value);
    };
    const planets = ['Mercure', 'Vénus', 'Terre', 'Mars', 'Jupiter', 'Saturne', 'Uranus', 'Neptune'];


    return (
        <div className="all">
            <Navbar />
            <div className="PageSignup">
                <div className="signup">
                    <h1>Signup Page</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <label>
                            <p>Favorite planet:</p>
                            <select value={favoritePlanet} onChange={handlePlanetChange}>
                                <option value=''>Choose a planet</option>
                                {planets.map((planet, index) => (
                                    <option value={planet} key={index}>{planet}</option>
                                ))}
                            </select>
                        </label>
                        <p>Selected planet: {favoritePlanet}</p>

                        {error && <div className="error">{error}</div>}

                        <button type="submit">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;

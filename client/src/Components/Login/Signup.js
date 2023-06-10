import React, { useState, useEffect } from 'react';
import './Login.css';
import { NavLink } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [favoritePlanet, setFavoritePlanet] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        // Check if all fields are filled
        if (!isFormValid) {
            setError('Please fill all fields');
            return;
        }

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
                window.location.href = '/login';
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        } else if (name === 'email') {
            setEmail(value);
        }
    };

    const handlePlanetChange = (event) => {
        setFavoritePlanet(event.target.value);
    };

    const planets = ['Mercure', 'Venus', 'Terre', 'Mars', 'Jupiter', 'Saturne', 'Uranus', 'Neptune'];

    useEffect(() => {
        // Check if all fields are filled
        setIsFormValid(username !== '' && password !== '' && confirmPassword !== '' && email !== '' && favoritePlanet !== '');
    }, [username, password, confirmPassword, email, favoritePlanet]);

    return (
        <div className="all">
            <NavLink to={'/Login'}> Déjà inscrit ? Cliquez ICI</NavLink>
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
                            onChange={handleInputChange}
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
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

                        {isFormValid ? (
                            <button type="submit">Signup</button>
                        ) : (
                            <div className="error">Please fill all fields</div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;

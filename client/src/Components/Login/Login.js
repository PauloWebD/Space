import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import Navbar from '../Navbar';

const Login = ({ onPropChange }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const fetchUserInfo = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/users/getUser/${userId}`);
            setUserInfo(response.data.user);

        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:3001/api/users/login', {
                username: username,
                password: password
            })
            .then(response => {
                console.log(response.data.message);
                const userId = response.data.user._id;
                onPropChange(userId);
                fetchUserInfo(userId);
                sessionStorage.setItem('token', userId);
                navigate('/userPage'); // Naviguer vers la page userPage en incluant l'ID de l'utilisateur
            })
            .catch(error => {
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('Network error. Please try again later.');
                }
            });
    }

    return (
        <div className="all">
            <Navbar username={userInfo && userInfo.username} />
            <div className="PageSignup">
                <div className='login'>
                    <h1>Login Page</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <p> Username :</p>
                            <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
                        </label>
                        <label>
                            <p>Password :</p>
                            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                        </label>
                        <button type='submit'>Login</button>
                        {errorMessage && <p>{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

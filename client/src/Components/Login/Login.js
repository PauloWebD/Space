import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

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

    // ... Votre code existant

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:3001/api/users/login', {
                username: username,
                password: password
            })
            .then(response => {
                const userId = response.data.user._id;
                onPropChange(userId);
                fetchUserInfo(userId);

                // Enregistrer le token dans le sessionStorage
                const token = response.data.token;
                sessionStorage.setItem('token', token);

                // Vérifier si l'utilisateur est un administrateur
                if (response.data.user.isAdmin) {
                    navigate('/dashboard'); // Rediriger vers la page d'administration pour l'administrateur
                } else {
                    navigate('/userPage'); // Naviguer vers la page userPage en incluant l'ID de l'utilisateur
                }
            })
            .catch(error => {
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('Network error. Please try again later.');
                }
            });
    };


    return (
        <div className="all">
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

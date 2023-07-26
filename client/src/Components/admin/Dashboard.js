import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        rank: 1, // Valeur par défaut du rang
    });

    const planets = ['Mercure', 'Venus', 'Terre', 'Mars', 'Jupiter', 'Saturne', 'Uranus', 'Neptune'];

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/users/allUsers');
            setAllUsers(response.data.users);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const handleInputChange = (event) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/users/addUser', newUser);
            console.log('New user added:', response.data);
            // Vous pouvez actualiser la liste des utilisateurs après l'ajout réussi
            fetchAllUsers();
            // Réinitialisez le formulaire
            setNewUser({
                username: '',
                email: '',
                rank: 1, // Réinitialisez la valeur du rang à 1
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            // Envoyer une requête DELETE pour supprimer l'utilisateur
            await axios.delete(`http://localhost:3001/api/users/deleteUser/${userId}`);
            console.log('User deleted:', userId);
            // Actualiser la liste des utilisateurs après la suppression réussie
            fetchAllUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const handleIncreaseRank = async (userId, currentRank) => {
        try {
            const newRank = currentRank + 1;
            // Envoyer une requête PUT pour mettre à jour le rang de l'utilisateur
            await axios.put(`http://localhost:3001/api/users/updateRank/${userId}`, { rank: newRank });
            // Actualiser la liste des utilisateurs après la mise à jour réussie
            fetchAllUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDecreaseRank = async (userId, currentRank) => {
        try {
            const newRank = currentRank - 1;
            // Envoyer une requête PUT pour mettre à jour le rang de l'utilisateur
            await axios.put(`http://localhost:3001/api/users/updateRank/${userId}`, { rank: newRank });
            // Actualiser la liste des utilisateurs après la mise à jour réussie
            fetchAllUsers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={newUser.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Rank:</label>
                    <input
                        type="number"
                        name="rank"
                        value={newUser.rank}
                        onChange={handleInputChange}
                    />
                    {/* Boutons pour augmenter et diminuer le rang */}
                    <button type="button" onClick={handleIncreaseRank}>+</button>
                    <button type="button" onClick={handleDecreaseRank}>-</button>
                </div>
                {/* Ajoutez ici d'autres champs pour le nouvel utilisateur */}
                <button type="submit">Add User</button>
            </form>

            <h2>All Users</h2>
            <ul>
                {allUsers.map(user => (
                    <li key={user._id}>
                        <p>Name: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Rank: {user.rank}</p>
                        {/* Affichez d'autres informations de l'utilisateur ici */}
                        <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                        <button onClick={() => handleIncreaseRank(user._id, user.rank)}>+</button>
                        <button onClick={() => handleDecreaseRank(user._id, user.rank)}>-</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        favoritePlanet: '',
        rank: 1,
    });


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


    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3001/api/users/deleteUser/${userId}`);
            console.log('User deleted:', userId);
            fetchAllUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateUserRank = async (userId, newRank) => {
        try {
            await axios.put(`http://localhost:3001/api/users/updateUserRank/${userId}`, { rank: newRank });
            console.log('User rank updated:', userId);
            fetchAllUsers();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <h1>Dashboard</h1>


            <h1>All Users</h1>
            <ul>
                {allUsers.map(user => (
                    <li key={user._id}>
                        <p>Name: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Rank: {user.rank}</p>
                        <select value={user.rank} onChange={(e) => handleUpdateUserRank(user._id, e.target.value)}>
                            <option disabled>UpdateUserRank</option>
                            <option value="Débutant">Débutant</option>
                            <option value="Avancé">Avancé</option>
                            <option value="Expert">Expert</option>
                        </select>
                        <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/users/getUser/${userId}`);
                setUserInfo(response.data.user);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserInfo();
    }, [userId]);

    return (
        <div>
            <h1>Page utilisateur</h1>
            {userInfo && (
                <div>
                    <h2>Nom d'utilisateur : {userInfo.username}</h2>
                    <p>Planète favorite : {userInfo.favoritePlanet}</p>
                </div>
            )}
        </div>
    );
};

export default UserPage;

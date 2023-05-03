import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPage = () => {
    const [username, setUsername] = useState('');
    const [rank, setrank] = useState('');
    // const [logo, setLogo] = useState('');
    // const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/userInfo');
                console.log('response ==> ', response);
                const { username } = response.data[0]; // Access first element of array
                setUsername(username);
                setrank(rank);
                // setLogo(logo);
                // setDescription(description);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserInfo();
    }, []);

    return (
        <div>
            <h1>UserPage</h1>
            <p>Welcome : {username}</p>
            <p>Your Rank : {rank} </p>
            {/* <p>Planet: {planet}</p>
            <img src={logo} alt="Logo" />
            <p>Description: {description}</p> */}
        </div>
    );
};

export default UserPage;

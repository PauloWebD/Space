import React, { useState, useEffect } from 'react';
import { OrbitControls } from "@react-three/drei";
import axios from 'axios';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { Canvas } from 'react-three-fiber';
// planets
import Jupiter from '../3D/Jupiter';
import Mars from '../3D/Mars';
import Mercure from '../3D/Mercure';
import Saturne from '../3D/Saturne';
import Terre from '../3D/Terre';
import Uranus from '../3D/Uranus';
import Venus from '../3D/Venus';
import Neptune from '../3D/Neptune';

import './UserPage.css';
import Navbar from '../Navbar';

const UserPage = (props) => {
    const [userInfo, setUserInfo] = useState(null);
    const [planetInfo, setPlanetInfo] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const { userId } = useParams();
    const navigate = useNavigate(); // Add navigate hook

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                if (props.userId) {
                    console.log('frfrfr ==>', props.userId);
                    const response = await axios.get(`http://localhost:3001/api/users/getUser/${props.userId}`);
                    console.log('polo ==>', response.data.user);
                    setUserInfo(response.data.user);
                    fetchPlanetInfo(response.data.user.favoritePlanet);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchPlanetInfo = async (planetName) => {
            try {
                const response = await axios.get(`https://api.le-systeme-solaire.net/rest.php/bodies/${planetName}`);
                setPlanetInfo(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserInfo();
    }, [props.userId]);


    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3001/api/messages/createMessage', {
                userId: userId,
                message: message
            });

            setMessage('');
        } catch (error) {
            console.log(error);
        }
    };

    const getPlanetComponent = () => {
        switch (userInfo?.favoritePlanet) {
            case 'Jupiter':
                return <Jupiter />;
            case 'Mars':
                return <Mars />;
            case 'Mercure':
                return <Mercure />;
            case 'Saturne':
                return <Saturne />;
            case 'Terre':
                return <Terre />;
            case 'Uranus':
                return <Uranus />;
            case 'Venus':
                return <Venus />;
            case 'Neptune':
                return <Neptune />;
            default:
                return null;
        }
    };

    function convertKelvinToCelsius(tempKelvin) {
        const tempCelsius = tempKelvin - 273.15;
        return Math.round(tempCelsius * 10) / 10;
    }

    // Add navigation to welcome page with user ID
    const navigateToWelcome = () => {
        navigate(`/WelcomePage/${userId}`);

    };


    return (
        <div>
            <Navbar />

            <h1>Page utilisateur</h1>
            {userInfo && (
                <div>
                    <p>Nom d'utilisateur : {userInfo.username}</p>
                    <p>Rang : {userInfo.rank}</p>
                    <p>Planète favorite : {userInfo.favoritePlanet}</p>
                    <button onClick={navigateToWelcome}>Augmente ton rank ICI  !! </button>
                    <br />
                    <button>
                        <NavLink to={'/'}> Home</NavLink>
                    </button>
                    {planetInfo && (
                        <div>
                            <h1>Informations sur la planète favorite :</h1>
                            <p>Distance moyenne avec le Soleil: {planetInfo.semimajorAxis} kilomètres</p>
                            <p>Rayon équatorial: {planetInfo.equaRadius} kilomètres</p>
                            <p>Température moyenne: {convertKelvinToCelsius(planetInfo.avgTemp)} °C</p>
                            <p>Rotation autour du Soleil: {planetInfo.sideralOrbit}</p>
                            <p>Rotation sur elle-même: {planetInfo.sideralRotation}</p>
                            <p>Nombre de lunes: {planetInfo?.moons?.length || 0}</p>
                        </div>
                    )}
                </div>
            )}
            <div className="PageUtilisateur">
                <div className="planetFav">
                    <Canvas>
                        <OrbitControls />
                        {getPlanetComponent()}
                    </Canvas>
                </div>
            </div>
            {/* <div className="message">
                <h1>Messages :</h1>
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <p key={message._id}>{message.message}</p>
                    ))
                ) : (
                    <p>Aucun message</p>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={message} onChange={handleChange} />
                <button type="submit">Envoyer</button>
            </form> */}
        </div>
    );
};

export default UserPage;

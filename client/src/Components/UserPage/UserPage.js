import React, { useState, useEffect } from 'react';
import { OrbitControls } from "@react-three/drei";
import axios from 'axios';
import { useParams } from 'react-router-dom';
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

import './UserPage.css'
import Navbar from '../Navbar';

const UserPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [planetInfo, setPlanetInfo] = useState(null);
    const [message, setMessage] = useState('');
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/users/getUser/${userId}`);
                setUserInfo(response.data.user);
                fetchPlanetInfo(response.data.user.favoritePlanet);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchPlanetInfo = async (planetName) => {
            console.log({ planetName });
            try {
                const response = await axios.get(`https://api.le-systeme-solaire.net/rest.php/bodies/${planetName}`);
                setPlanetInfo(response.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchUserInfo();
    }, [userId]);
    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Envoyez le message à la base de données
            await axios.post('http://localhost:3001/api/messages/createMessage', {
                userId: userId,
                message: message
            });

            // Réinitialisez le champ de texte après avoir envoyé le message
            setMessage('');

            // Effectuez toute autre action nécessaire après l'envoi du message
            // Par exemple, mettez à jour les messages affichés sur la page ou récupérez les derniers messages de l'utilisateur
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
        return Math.round(tempCelsius * 10) / 10; // Arrondi à un chiffre après la virgule
    }

    return (
        <div>
            <Navbar />
            {/* api keys:: hxESxLfgWfc9KHgfOvL6c0a70btoxp4vUSTqeIeu */}
            <h1>Page utilisateur</h1>
            {userInfo && (
                <div>
                    <p>Nom d'utilisateur : {userInfo.username}</p>
                    <p>Planète favorite : {userInfo.favoritePlanet}</p>
                    {planetInfo && (
                        <div>
                            <h1>Informations sur la planète favorite :</h1>
                            <p>Distance moyenne avec le Soleil: {planetInfo.semimajorAxis} kilomètres</p>
                            <p>Rayon équatorial: {planetInfo.equaRadius} kilomètres</p>
                            <p>Température moyenne: {convertKelvinToCelsius(planetInfo.avgTemp)} °C</p>
                            <p>Rotation autour du Soleil: {planetInfo.sideralOrbit}</p>
                            <p>Rotation sur elle-même: {planetInfo.sideralRotation}</p>
                            <p>Number of Moons: {planetInfo && planetInfo.moons ? planetInfo.moons.length : 0}</p>
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
            <form onSubmit={handleSubmit}>
                <input type="text" value={message} onChange={handleChange} />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
};

export default UserPage;

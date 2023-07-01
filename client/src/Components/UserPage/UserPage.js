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


import rankImageExpert from '../3D/assets/rank/1.png';
import rankImageAvance from '../3D/assets/rank/3.png';
import rankImageDebutant from '../3D/assets/rank/2.png';


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
                    const response = await axios.get(`http://localhost:3001/api/users/getUser/${props.userId}`);
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
            return planetName;
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
        navigate(`/WelcomePage/${props.userId}`);

    };
    console.log(userInfo?.favoritePlanet);

    const getRankImage = () => {
        if (userInfo?.rank === 'Expert') {
            return rankImageExpert;
        } else if (userInfo?.rank === 'Avancé') {
            return rankImageAvance;
        } else {
            return rankImageDebutant;
        }
    };

    return (
        <div className='User'>
            {userInfo && (
                <div>
                    <h1>Bonjour {userInfo.username}</h1>
                    <p className="user-rank">
                        {userInfo.rank}
                        {userInfo.rank && <img src={getRankImage()} alt="Rank" />} {/* Ajoutez cette ligne pour afficher l'image du rang */}
                    </p>
                    <p>Planète favorite : {userInfo.favoritePlanet}</p>
                    <button onClick={navigateToWelcome}>Augmente ton rank ICI  !! </button>
                    <br />
                    {planetInfo && (
                        <div>
                            <h1>Informations sur  {userInfo?.favoritePlanet} : </h1>
                            <p>Distance moyenne avec le Soleil : {planetInfo.semimajorAxis} kilomètres</p>
                            <p>Rayon équatorial : {planetInfo.equaRadius} kilomètres</p>
                            <p>Température moyenne : {convertKelvinToCelsius(planetInfo.avgTemp)} °C</p>
                            <p>Rotation autour du Soleil : {planetInfo.sideralOrbit}</p>
                            <p>Rotation sur elle-même : {planetInfo.sideralRotation}</p>
                            <p>Nombre de lunes : {planetInfo?.moons?.length || 0}</p>
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
        </div>
    );
};

export default UserPage;

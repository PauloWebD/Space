// Importez les modules nécessaires
import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import axios from "axios";

// Importez vos composants 3D pour chaque planète ici
import Jupiter from '../3D/Jupiter';
import Mars from '../3D/Mars';
import Mercure from '../3D/Mercure';
import Saturne from '../3D/Saturne';
import Terre from '../3D/Terre';
import Uranus from '../3D/Uranus';
import Venus from '../3D/Venus';
import Neptune from "../3D/Neptune";

import '../../../src/styles/Planet.css'
import Navbar from '../Navbar';
const Planet = () => {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState('terre'); // la planète par défaut est la Terre
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [stats, setStats] = useState({});

  const fetchData = (planet) => {
    fetch(`https://api.le-systeme-solaire.net/rest.php/bodies/${planet}`)
      .then(response => response.json())
      .then(data => {
        setPlanets(data);
        console.log(data);
      });
  };

  function convertKelvinToCelsius(tempKelvin) {
    const tempCelsius = tempKelvin - 273.15;
    return Math.round(tempCelsius * 10) / 10; // Arrondi à un chiffre après la virgule
  }

  useEffect(() => {
    fetchData(selectedPlanet);
  }, [selectedPlanet]);

  const handlePlanetChange = (planet) => {
    setSelectedPlanet(planet);
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();

    if (inputMessage.trim() === '') {
      return;
    }

    setMessages(prevMessages => [...prevMessages, inputMessage]);
    setInputMessage('');
  };

  return (
    <div className="planetPage">
      <Navbar />
      <div className="planetAll">
        <div className="planetDesc">
          <h1>{planets.name}</h1>
          <div className="planetDesc-data-desc">
            <h2>Distance moyenne avec le Soleil:</h2>
            <p>{planets.semimajorAxis} kilomètres</p>
          </div>
          <div className="planetDesc-data">
            <h3>le rayon équatorial:</h3>
            <p>{planets.equaRadius} kilomètres</p>
          </div>
          <div className="planetDesc-data">
            <h3>Température moyenne:</h3>
            <p>{convertKelvinToCelsius(planets.avgTemp)} °C</p>
          </div>
          <div className="planetDesc-data">
            <h3>Rotation autour du soleil:</h3>
            <p>{planets.sideralOrbit}</p>
          </div>
          <div className="planetDesc-data">
            <h3>Rotation sur elle-même:</h3>
            <p>{planets.sideralRotation}</p>
          </div>
        </div>
        <div className="planetVisu">
          <Canvas>
            <OrbitControls />
            {selectedPlanet === 'terre' && <Terre />}
            {selectedPlanet === 'mars' && <Mars />}
            {selectedPlanet === 'venus' && <Venus />}
            {selectedPlanet === 'jupiter' && <Jupiter />}
            {selectedPlanet === 'saturne' && <Saturne />}
            {selectedPlanet === 'mercure' && <Mercure />}
            {selectedPlanet === 'neptune' && <Neptune />}
            {selectedPlanet === 'uranus' && <Uranus />}
          </Canvas>
        </div>
        <div className="planetButton">
          <button onClick={() => handlePlanetChange('terre')}>Terre</button>
          <button onClick={() => handlePlanetChange('mars')}>Mars</button>
          <button onClick={() => handlePlanetChange('venus')}>Venus</button>
          <button onClick={() => handlePlanetChange('jupiter')}>Jupiter</button>
          <button onClick={() => handlePlanetChange('saturne')}>Saturne</button>
          <button onClick={() => handlePlanetChange('mercure')}>Mercure</button>
          <button onClick={() => handlePlanetChange('neptune')}>Neptune</button>
          <button onClick={() => handlePlanetChange('uranus')}>Uranus</button>
        </div>
        <div className="planetMessages">
          <h2>Messages sur {selectedPlanet}</h2>
          <form onSubmit={handleMessageSubmit}>
            <input
              type="text"
              name="message"
              placeholder="Votre message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit">Envoyer</button>
          </form>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
        <div className="planetStats">
          <h2>Statistiques des messages</h2>
          <ul>
            {Object.keys(stats).map((planet, index) => (
              <li key={index}>
                {planet}: {stats[planet]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Planet;


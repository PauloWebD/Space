import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import axios from "axios";

// Importez vos composants 3D pour chaque planète ici
import Jupiter from "../3D/Jupiter";
import Mars from "../3D/Mars";
import Mercure from "../3D/Mercure";
import Saturne from "../3D/Saturne";
import Terre from "../3D/Terre";
import Uranus from "../3D/Uranus";
import Venus from "../3D/Venus";
import Neptune from "../3D/Neptune";
import "./Planet.css";

import rankImageExpert from '../3D/assets/rank/1.png';
import rankImageAvance from '../3D/assets/rank/3.png';
import rankImageDebutant from '../3D/assets/rank/2.png';



const Planet = ({ userId, userRank }) => {
  const [planet, setPlanet] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState('terre');
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [UserName, setUserName] = useState([]);

  const fetchData = (selectedPlanet) => {
    fetch(`https://api.le-systeme-solaire.net/rest.php/bodies/${selectedPlanet}`)
      .then((response) => response.json())
      .then((data) => {
        setPlanet(data);
      });
  };

  function convertKelvinToCelsius(tempKelvin) {
    const tempCelsius = tempKelvin - 273.15;
    return Math.round(tempCelsius * 10) / 10; // Arrondi à un chiffre après la virgule
  }


  const handlePlanetChange = (currentPlanet) => {
    setSelectedPlanet(currentPlanet);
  };

  const sendMessage = async (event) => {
    event.preventDefault();

    // Envoyer le message au serveur
    try {
      await axios.post("http://localhost:3001/api/messages/createMessage", {
        userId: userId,
        planet: selectedPlanet,
        message: currentMessage,
      });

      fetchMessagesByPlanet(selectedPlanet);

      // Effacer le champ de saisie du message
      setCurrentMessage("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message", error);
    }
  };


  const fetchMessagesByPlanet = async (selectedPlanet) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/messages/getMessages/${selectedPlanet}`);
      setMessages(response.data.messages);
      console.log(response.data.messages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(selectedPlanet);
    fetchMessagesByPlanet(selectedPlanet);


  }, [selectedPlanet]);

  const getRankImage = (rank) => {
    if (rank === 'Expert') {
      return rankImageExpert;
    } else if (rank === 'Avancé') {
      return rankImageAvance;
    } else {
      return rankImageDebutant;
    }
  };
  return (
    <div className="planetPage">
      <div className="planetAll">
        <div className="planetDesc">
          <h1>{planet.name}</h1>
          <div className="planetDesc-data-desc">
            <h2>Distance moyenne avec le Soleil :</h2>
            <p>{planet.semimajorAxis} kilomètres</p>
          </div>
          <div className="planetDesc-data">
            <h3>Le rayon équatorial :</h3>
            <p>{planet.equaRadius} kilomètres</p>
          </div>
          <div className="planetDesc-data">
            <h3>Température moyenne :</h3>
            <p>{convertKelvinToCelsius(planet.avgTemp)} °C</p>
          </div>
          <div className="planetDesc-data">
            <h3>Rotation autour du soleil :</h3>
            <p>{planet.sideralOrbit}</p>
          </div>
          <div className="planetDesc-data">
            <h3>Rotation sur elle-même :</h3>
            <p>{planet.sideralRotation}</p>
          </div>
        </div>
        <div className="planetVisu">
          <Canvas>
            <OrbitControls minDistance={4} maxDistance={20} />
            {selectedPlanet === "terre" && <Terre />}
            {selectedPlanet === "mars" && <Mars />}
            {selectedPlanet === "venus" && <Venus />}
            {selectedPlanet === "jupiter" && <Jupiter />}
            {selectedPlanet === "saturne" && <Saturne />}
            {selectedPlanet === "mercure" && <Mercure />}
            {selectedPlanet === "neptune" && <Neptune />}
            {selectedPlanet === "uranus" && <Uranus />}
          </Canvas>
        </div>
        <div className="planetButton">
          <button onClick={() => handlePlanetChange("terre")}>Terre</button>
          <button onClick={() => handlePlanetChange("mars")}>Mars</button>
          <button onClick={() => handlePlanetChange("venus")}>Venus</button>
          <button onClick={() => handlePlanetChange("jupiter")}>Jupiter</button>
          <button onClick={() => handlePlanetChange("saturne")}>
            Saturne
          </button>
          <button onClick={() => handlePlanetChange("mercure")}>
            Mercure
          </button>
          <button onClick={() => handlePlanetChange("neptune")}>Neptune</button>
          <button onClick={() => handlePlanetChange("uranus")}>Uranus</button>
        </div>
        <div className="planetMessages">
          <h1>Commentaires pour {selectedPlanet}</h1>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={currentMessage}
              onChange={(event) => setCurrentMessage(event.target.value)}
              placeholder="Votre message..."
            />
            <button data-planet={selectedPlanet} type="submit">Envoyer</button>
          </form>

          {messages.map((message, index) => (
            <div key={index} className="message">
              {message.username} {<img src={getRankImage(message.rank)} alt="Rank" />} : {message.message}
            </div>
          ))}




        </div>
      </div>
    </div>
  );
};

export default Planet;
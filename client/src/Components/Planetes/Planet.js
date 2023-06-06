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
import Navbar from "../Navbar";

const Planet = () => {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState("terre");
  const [showHome, setShowHome] = useState(true);
  const [messages, setMessages] = useState({
    terre: [],
    mars: [],
    venus: [],
    jupiter: [],
    saturne: [],
    mercure: [],
    neptune: [],
    uranus: [],
  });
  const [currentMessage, setCurrentMessage] = useState("");

  const fetchData = (planet) => {
    fetch(`https://api.le-systeme-solaire.net/rest.php/bodies/${planet}`)
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data);
        console.log(data);
      });
  };

  function convertKelvinToCelsius(tempKelvin) {
    const tempCelsius = tempKelvin - 273.15;
    return Math.round(tempCelsius * 10) / 10; // Arrondi à un chiffre après la virgule
  }

  const handlePlanetChange = (planet) => {
    setSelectedPlanet(planet);
  };

  const sendMessage = async (event) => {
    event.preventDefault();

    // Récupérer le nom de la planète sélectionnée
    const planet = selectedPlanet;

    // Envoyer le message au serveur
    try {
      const response = await axios.post("http://localhost:3001/api/messages/createMessage", {
        planet,
        message: currentMessage,
      });


      // Mettre à jour les messages pour la planète sélectionnée avec la nouvelle liste de messages
      setMessages((prevMessages) => ({
        ...prevMessages,
        [planet]: response.data.messages,
      }));

      // Effacer le champ de saisie du message
      setCurrentMessage("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message", error);
    }
  };

  useEffect(() => {
    fetchData(selectedPlanet);
  }, [selectedPlanet]);

  useEffect(() => {
    const fetchPlanetMessages = async () => {
      try {
        const response = await axios.get(`/api/messages/createMessage/${selectedPlanet}`);
        setMessages((prevMessages) => ({
          ...prevMessages,
          [selectedPlanet]: response.data.messages,
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des messages", error);
      }
    };

    fetchPlanetMessages();
  }, [selectedPlanet]);

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
          {messages[selectedPlanet].map((message, index) => (
            <div key={index} className="message">
              {message}
            </div>
          ))}
        </div>
        <h1>Message pour {selectedPlanet}</h1>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={currentMessage}
            onChange={(event) => setCurrentMessage(event.target.value)}
            placeholder="Votre message..."
          />
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default Planet;

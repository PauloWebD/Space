import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { TextureLoader } from 'three';
import daymap from "./systemSolaire/daymap.jpg";
import moon from "./systemSolaire/moon.jpg";
import clouds from "./assets/clouds.jpg";
import nightmap from "./assets/nightmap.jpg";

const Terre = (props) => {
  const meshRef = useRef();
  const moonRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const { position } = props;
  const name = 'Terre';

  useFrame((state) => {
    meshRef.current.rotation.y += 0.001;

    const angle = meshRef.current.rotation.y; // Angle de rotation de la Terre
    const distanceFromEarth = 8; // Distance de la lune par rapport à la Terre

    moonRef.current.position.x = meshRef.current.position.x + distanceFromEarth * Math.cos(angle);
    moonRef.current.position.z = meshRef.current.position.z + distanceFromEarth * Math.sin(angle);
    moonRef.current.rotation.y += 0.01;
  });

  function getTimeBasedTexture() {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 8 && hour <= 18) {
      return daymap;
    } else {
      return nightmap;
    }
  }

  const texture = new TextureLoader().load(getTimeBasedTexture());

  return (
    <>
      <mesh ref={meshRef} position={position}>
        <sphereBufferGeometry attach="geometry" args={[1.2, 32, 32]} />
        <meshBasicMaterial attach="material" map={texture} />
      </mesh>
      <mesh ref={moonRef}>
        <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
        <meshBasicMaterial attach="material" map={new TextureLoader().load(moon)} />
      </mesh>
    </>
  );
};

export default Terre;

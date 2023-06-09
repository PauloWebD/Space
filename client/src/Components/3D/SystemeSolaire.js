import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader, DoubleSide } from 'three';
import * as THREE from "three";
import { NavLink } from 'react-router-dom';

import './SystemeSolaire.css';

import mercure from "./systemSolaire/mercure.jpg";
import sun from "./systemSolaire/sun.jpg";
import venus from "./systemSolaire/venus.jpg";
import daymap from "./systemSolaire/daymap.jpg";
import mars from "./systemSolaire/mars.jpg";
import jupiter from "./systemSolaire/jupiter.jpg";
import saturn from "./systemSolaire/saturn.jpg";
import uranusmap from "./systemSolaire/uranusmap.jpg";
import neptune from "./systemSolaire/neptune.jpg";
import saturnringcolor from "./systemSolaire/saturnringcolor.jpg";
import uranusringcolor from "./systemSolaire/uranusringcolor.jpg";

const Planet = ({ position, size, texture, orbitRadius, orbitSpeed }) => {
    const meshRef = useRef();

    useFrame((state) => {
        const elapsedTime = state.clock.getElapsedTime();
        const angle = elapsedTime * orbitSpeed;
        meshRef.current.position.x = Math.cos(angle) * orbitRadius;
        meshRef.current.position.z = Math.sin(angle) * orbitRadius;
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshBasicMaterial map={new TextureLoader().load(texture)} />
        </mesh>
    );
};

const SolarSystem = () => {
    return (
        <div className="canva">
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[100, 100, 100]} angle={0.5} penumbra={1} />

                <group position={[0, 0, 0]}>
                    {/* Soleil */}
                    <mesh>
                        <sphereGeometry args={[10.3, 32, 32]} />
                        <meshBasicMaterial map={new TextureLoader().load(sun)} />
                    </mesh>
                    {/* Lumière spot */}
                    <spotLight position={[0, 0, 0]} angle={Math.PI / 4} penumbra={0.5} />


                    {/* Mercure */}
                    <Planet
                        position={[14, 0, 0]}
                        size={0.03}
                        texture={mercure}
                        orbitRadius={14}
                        orbitSpeed={0.05}
                    />

                    {/* Venus */}
                    <Planet
                        position={[17, 0, 0]}
                        size={0.09}
                        texture={venus}
                        orbitRadius={17}
                        orbitSpeed={0.03}
                    />

                    {/* Earth */}
                    <Planet
                        position={[20, 0, 0]}
                        size={0.12}
                        texture={daymap}
                        orbitRadius={20}
                        orbitSpeed={0.02}
                    />

                    {/* Mars */}
                    <Planet
                        position={[25, 0, 0]}
                        size={0.06}
                        texture={mars}
                        orbitRadius={25}
                        orbitSpeed={0.01}
                    />

                    {/* Jupiter */}
                    <Planet
                        position={[52, 0, 0]}
                        size={1.39}
                        texture={jupiter}
                        orbitRadius={52}
                        orbitSpeed={0.005}
                    />

                    {/* Saturn */}
                    <group position={[95, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <mesh>
                            <sphereGeometry args={[0.93, 32, 32]} />
                            <meshBasicMaterial map={new TextureLoader().load(saturn)} />
                        </mesh>
                        <mesh>
                            <ringGeometry args={[1.5, 1.8, 32]} />
                            <meshBasicMaterial
                                map={new TextureLoader().load(saturnringcolor)}
                                side={DoubleSide}
                            />
                        </mesh>
                    </group>

                    {/* Uranus */}
                    <group position={[190, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <mesh>
                            <sphereGeometry args={[0.47, 32, 32]} />
                            <meshBasicMaterial map={new TextureLoader().load(uranusmap)} />
                        </mesh>
                        <mesh>
                            <ringGeometry args={[0.75, 1, 32]} />
                            <meshBasicMaterial
                                map={new TextureLoader().load(uranusringcolor)}
                                side={DoubleSide}
                            />
                        </mesh>
                    </group>

                    {/* Neptune */}
                    <Planet
                        position={[300, 0, 0]}
                        size={0.43}
                        texture={neptune}
                        orbitRadius={300}
                        orbitSpeed={0.0008}
                    />
                </group>
                <OrbitControls minDistance={30} maxDistance={320} />
            </Canvas>
        </div>
    );
};

export default SolarSystem;

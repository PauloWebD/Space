import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader, SphereGeometry, MeshBasicMaterial, Mesh, DoubleSide, RingBufferGeometry } from 'three';

import './Scene.css';

import mercure from "./systemSolaire/mercure.jpg";
import sun from "./systemSolaire/sun.jpg";
import venus from "./systemSolaire/venus.jpg";
import daymap from "./systemSolaire/daymap.jpg";
import mars from "./systemSolaire/mars.jpg";
import jupiter from "./systemSolaire/jupiter.jpg";
import saturn from "./systemSolaire/saturn.jpg";
import uranusmap from "./systemSolaire/uranusmap.jpg";
import neptune from "./systemSolaire/neptune.jpg";
import uranusringcolor from "./systemSolaire/uranusringcolor.jpg";
import saturnringcolor from "./systemSolaire/saturnringcolor.jpg";

const Planet = ({ position, size, texture, orbitRadius, orbitSpeed, hasRing, ringSize, ringTexture }) => {
    const meshRef = useRef();
    const ringRef = useRef();
    const [isActive, setIsActive] = useState(false);


    useFrame((state) => {
        const elapsedTime = state.clock.getElapsedTime();
        const angle = elapsedTime * orbitSpeed;
        meshRef.current.position.x = Math.cos(angle) * orbitRadius;
        meshRef.current.position.z = Math.sin(angle) * orbitRadius;

        if (hasRing) {
            ringRef.current.rotation.x = state.clock.getElapsedTime() / 2;
        }
    });

    return (
        <group>
            <mesh ref={meshRef} position={position} onClick={() => setIsActive(!isActive)}>
                <sphereGeometry args={[size, 32, 32]} />
                <meshBasicMaterial map={new TextureLoader().load(texture)} />
            </mesh>
            {hasRing && (
                <mesh ref={ringRef} position={position}>
                    <group rotation={[Math.PI / 2, 0, 0]}>
                        <mesh>
                            <ringBufferGeometry attach="geometry" args={[ringSize[0], ringSize[1], 64]} />
                            <meshBasicMaterial attach="material" map={new TextureLoader().load(ringTexture)} side={DoubleSide} />
                        </mesh>
                    </group>
                </mesh>
            )}
        </group>
    );
};

const SolarSystem = () => {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[100, 100, 100]} angle={0.5} penumbra={1} />

            <group position={[0, 0, 0]}>
                {/* Soleil */}
                <mesh>
                    <sphereGeometry args={[10.3, 32, 32]} />
                    <meshBasicMaterial map={new TextureLoader().load(sun)} />
                </mesh>

                {/* Mercure */}
                <group position={[14, 0, 0]}>
                    <Planet
                        position={[0, 0, 0]}
                        size={0.03}
                        texture={mercure}
                        orbitRadius={14}
                        orbitSpeed={0.05}
                    />
                </group>

                {/* Venus */}
                <group position={[17, 0, 0]}>
                    <Planet
                        position={[0, 0, 0]}
                        size={0.09}
                        texture={venus}
                        orbitRadius={17}
                        orbitSpeed={0.03}
                    />
                </group>

                {/* Earth */}
                <group position={[20, 0, 0]}>
                    <Planet
                        position={[0, 0, 0]}
                        size={0.12}
                        texture={daymap}
                        orbitRadius={20}
                        orbitSpeed={0.02}
                    />
                </group>

                {/* Mars */}
                <group position={[25, 0, 0]}>
                    <Planet
                        position={[0, 0, 0]}
                        size={0.06}
                        texture={mars}
                        orbitRadius={25}
                        orbitSpeed={0.015}
                    />
                </group>

                {/* Jupiter */}
                <group position={[52, 0, 0]}>
                    <Planet
                        position={[0, 0, 0]}
                        size={1.39}
                        texture={jupiter}
                        orbitRadius={52}
                        orbitSpeed={0.005}
                    />
                </group>

                {/* Saturn */}
                <group position={[95, 0, 0]}>
                    <Planet
                        position={[0, 0, 0]}
                        size={0.93}
                        texture={saturn}
                        orbitRadius={95}
                        orbitSpeed={0.003}
                        hasRing
                        ringSize={[1.6, 2.2]}
                        ringTexture={saturnringcolor}
                    />
                </group>

                {/* Uranus */}
                <group position={[190, 0, 0]}>
                    <Planet
                        position={[0, 0, 0]}
                        size={0.47}
                        texture={uranusmap}
                        orbitRadius={190}
                        orbitSpeed={0.002}
                        hasRing
                        ringSize={[1.6, 2.2]}
                        ringTexture={uranusringcolor}
                    />
                </group>

                {/* Neptune */}
                <group position={[300, 0, 0]}>
                    <Planet
                        position={[0, 0, 0]}
                        size={0.43}
                        texture={neptune}
                        orbitRadius={300}
                        orbitSpeed={0.001}
                    />
                </group>
            </group>

            <OrbitControls minDistance={12} maxDistance={320} />
        </Canvas>
    );
};

export default SolarSystem;

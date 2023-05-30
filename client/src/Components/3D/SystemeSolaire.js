import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import './Scene.css'
import { TextureLoader } from 'three';
import mercure from "./systemSolaire/mercure.jpg";
import sun from "./systemSolaire/sun.jpg";
import venus from "./systemSolaire/venus.jpg";
import daymap from "./systemSolaire/daymap.jpg";
import mars from "./systemSolaire/mars.jpg";
import jupiter from "./systemSolaire/jupiter.jpg";
import saturn from "./systemSolaire/saturn.jpg";
import uranusmap from "./systemSolaire/uranusmap.jpg";
import neptune from "./systemSolaire/neptune.jpg";


const SolarSystem = () => {

    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />

            {/* Sun */}
            <mesh position={[0, 0, 0]} >
                <sphereBufferGeometry attach="geometry" args={[10.3, 32, 32]} />
                <meshBasicMaterial map={new TextureLoader().load(sun)} />
            </mesh>

            {/* Mercury */}
            <mesh position={[14, 0, 0]} >
                <sphereBufferGeometry attach="geometry" args={[0.03, 32, 32]} />
                <meshBasicMaterial
                    attach="material"
                    map={new TextureLoader().load(mercure)}
                />
            </mesh>

            {/* Venus */}
            <mesh position={[17, 0, 0]}>
                <sphereBufferGeometry attach="geometry" args={[0.09, 32, 32]} />
                <meshBasicMaterial
                    attach="material"
                    map={new TextureLoader().load(venus)}
                />
            </mesh>

            {/* Earth */}
            <mesh position={[20, 0, 0]}>
                <sphereBufferGeometry attach="geometry" args={[0.12, 32, 32]} />
                <meshBasicMaterial attach="material" map={new TextureLoader().load(daymap)} />
            </mesh>

            {/* Mars */}
            <mesh position={[25, 0, 0]} rotation={[0, 0, 0.15]}>
                <sphereGeometry args={[0.06, 32, 32]} />
                <meshBasicMaterial
                    attach="material"
                    map={new TextureLoader().load(mars)}
                />
            </mesh>

            {/* Jupiter */}
            <mesh position={[52, 0, 0]} rotation={[0, 0, 0.1]}>
                <sphereGeometry args={[1.39, 32, 32]} />
                <meshBasicMaterial
                    attach="material"
                    map={new TextureLoader().load(jupiter)}
                />
            </mesh>

            {/* Saturn */}
            <mesh position={[95, 0, 0]} rotation={[0, 0, 0.07]}>
                <sphereGeometry args={[0.93, 32, 32]} />
                <meshBasicMaterial attach="material" map={new TextureLoader().load(saturn)} />
            </mesh>

            {/* Uranus */}
            <mesh position={[190, 0, 0]} rotation={[0, 0, 0.04]}>
                <sphereGeometry args={[0.47, 32, 32]} />
                <meshBasicMaterial attach="material" map={new TextureLoader().load(uranusmap)} />
            </mesh>

            {/* Neptune */}
            <mesh position={[300, 0, 0]} rotation={[0, 0, 0.02]}>
                <sphereGeometry args={[0.43, 32, 32]} />
                <meshBasicMaterial
                    attach="material"
                    map={new TextureLoader().load(neptune)}
                />
            </mesh>

            <OrbitControls minDistance={12} maxDistance={320}
            />

        </Canvas>
    );
};

export default SolarSystem;

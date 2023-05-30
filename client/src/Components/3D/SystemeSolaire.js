import React from 'react';
import { Canvas } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';
import './Scene.css'
import { TextureLoader } from 'three';
import mercure from "./systemSolaire/mercure.jpg";
import sun from "./systemSolaire/sun.jpg";
import venus from "./systemSolaire/venus.jpg";
import daymap from "./systemSolaire/daymap.jpg";

const SolarSystem = () => {
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />

            {/* Sun */}
            <mesh position={[0, 0, 0]} >
                <sphereBufferGeometry />
                <meshBasicMaterial map={new TextureLoader().load(sun)} />
            </mesh>

            {/* Mercury */}
            <mesh position={[20, 0, 0]} >
                <sphereBufferGeometry attach="geometry" args={[1.2, 32, 32]} />
                <meshBasicMaterial
                    attach="material"
                    map={new TextureLoader().load(mercure)}
                />
            </mesh>

            {/* Venus */}
            <mesh position={[30, 0, 0]}>
                <sphereBufferGeometry attach="geometry" args={[1.2, 32, 32]} />
                <meshBasicMaterial
                    attach="material"
                    map={new TextureLoader().load(venus)}
                />
            </mesh>

            {/* Earth */}
            <mesh position={[50, 0, 0]}>
                <sphereBufferGeometry attach="geometry" args={[1.2, 32, 32]} />
                <meshBasicMaterial attach="material" map={new TextureLoader().load(daymap)} />
            </mesh>

            {/* Mars */}
            <mesh position={[90, 0, 0]} rotation={[0, 0, 0.15]}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshLambertMaterial color={0xff0000} />
            </mesh>

            {/* Jupiter */}
            <mesh position={[120, 0, 0]} rotation={[0, 0, 0.1]}>
                <sphereGeometry args={[0.9, 32, 32]} />
                <meshLambertMaterial color={0xff8c00} />
            </mesh>

            {/* Saturn */}
            <mesh position={[150, 0, 0]} rotation={[0, 0, 0.07]}>
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshLambertMaterial color={0xffcc00} />
            </mesh>

            {/* Uranus */}
            <mesh position={[180, 0, 0]} rotation={[0, 0, 0.04]}>
                <sphereGeometry args={[0.7, 32, 32]} />
                <meshLambertMaterial color={0x00ffff} />
            </mesh>

            {/* Neptune */}
            <mesh position={[210, 0, 0]} rotation={[0, 0, 0.02]}>
                <sphereGeometry args={[0.7, 32, 32]} />
                <meshLambertMaterial color={0x00008b} />
            </mesh>

            <OrbitControls />
        </Canvas>
    );
};

export default SolarSystem;

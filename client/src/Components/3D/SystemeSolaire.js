import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from 'react-three-fiber';
import React, { useRef } from 'react';
import './Scene.css'
import Sun from './Sun';
import Mercure from './Mercure';
import Venus from './Venus';
import Terre from './Terre';
import Mars from './Mars';
import Jupiter from './Jupiter';
import Saturne from './Saturne';
import Uranus from './Uranus';
import Neptune from './Neptune';


const SolarSystem = () => {
    return (
        <Canvas>
            <Sun />
            <Mercure />
            <Venus />
            <Terre />
            <Mars />
            <Jupiter />
            <Saturne />
            <Uranus />
            <Neptune/>
            <OrbitControls
                maxDistance={800}
                minDistance={300}
            />
        </Canvas>
    );
};


export default SolarSystem;

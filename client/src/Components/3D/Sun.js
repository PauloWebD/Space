import { Stats, OrbitControls } from '@react-three/drei';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { TextureLoader } from 'three';
import sun from "./systemSolaire/sun.jpg";
import './Scene.css'


const Sun = () => {
    const meshRef = useRef();

    useFrame((state) => {
        meshRef.current.rotation.y += 0.0071;
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} >
            <sphereBufferGeometry />
            <meshBasicMaterial map={new TextureLoader().load(sun)} />
        </mesh>
    );
};

export default Sun;
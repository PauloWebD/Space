import { TextureLoader, DoubleSide } from 'three';
import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import saturn from "./systemSolaire/saturn.jpg";
import saturnringcolor from "./systemSolaire/saturnringcolor.jpg";

const Saturn = (props) => {
    const meshRef = useRef();
    const ringRef = useRef();
    const { position } = props;
    const name = 'Saturn';

    useFrame((state) => {
        meshRef.current.rotation.y += 0.01;
        ringRef.current.rotation.y += 0.01;
    });
    // size  4.9
    return (
        <>
            <mesh ref={meshRef} position={position} >
                <sphereBufferGeometry attach="geometry" args={[1.2, 32, 32]} />
                <meshBasicMaterial
                    attach="material"
                    map={new TextureLoader().load(saturn)}
                />
            </mesh>
            <mesh ref={ringRef} position={position}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <mesh>
                        <ringBufferGeometry attach="geometry" args={[1.6, 2.2, 64]} />
                        <meshBasicMaterial attach="material" map={new TextureLoader().load(saturnringcolor)} side={DoubleSide} />
                    </mesh>
                </group>
            </mesh>

        </>
    );
};
export default Saturn;
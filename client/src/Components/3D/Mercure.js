import { TextureLoader } from 'three';
import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import mercure from "./systemSolaire/mercure.jpg";


const Mercure = (props) => {
    const meshRef = useRef();
    const [isActive, setIsActive] = useState(false);
    const { position } = props;
    const name = 'Mercure';

    useFrame((state) => {
        // meshRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.17) * 200;
        // meshRef.current.position.z = Math.cos(state.clock.getElapsedTime() * 0.17) * 200;
        meshRef.current.rotation.y += 0.01;
    });
// size 0.3
    return (
        <>
            <mesh ref={meshRef} position={position} onClick={() => setIsActive(!isActive)}>
                <sphereBufferGeometry attach="geometry" args={[1.2, 32, 32]} />
                <meshBasicMaterial
                    attach="material"
                    map={new TextureLoader().load(mercure)}
                />
            </mesh>
            {isActive && (
                console.log(name)
            )}
        </>
    );
};
export default Mercure;
import { TextureLoader } from 'three';
import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import jupiter from "./systemSolaire/jupiter.jpg";


const Jupiter = (props) => {
    const meshRef = useRef();
    const [isActive, setIsActive] = useState(false);
    const { position } = props;
    const name = 'Jupiter';

    useFrame((state) => {
        // meshRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.04) * 300;
        // meshRef.current.position.z = Math.cos(state.clock.getElapsedTime() * 0.04) * 300;
        meshRef.current.rotation.y += 0.001;
    });
// size 13.9
    return (
        <>
            <mesh
                ref={meshRef}
                position={position}
                onClick={() => setIsActive(!isActive)}
            >
                <sphereBufferGeometry attach="geometry" args={[1.2, 32, 32]} />
                <meshBasicMaterial
                    attach="material"
                    map={new TextureLoader().load(jupiter)}
                />
            </mesh>
            {isActive && (
                console.log(name)
            )}
        </>
    );
};
export default Jupiter;

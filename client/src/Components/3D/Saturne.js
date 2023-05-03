import { TextureLoader, Vector3 } from 'three';
import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import saturn from "./systemSolaire/saturn.jpg";
import { NavLink } from 'react-router-dom';

const Saturne = (props) => {
    const meshRef = useRef();
    const [isActive, setIsActive] = useState(false);
    const { position } = props;
    const name = 'Saturne';


    useFrame((state) => {
        // meshRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.03) * 350;
        // meshRef.current.position.z = Math.cos(state.clock.getElapsedTime() * 0.03) * 350;
        meshRef.current.rotation.y += 0.01;


    });
// size 11.6
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
                    map={new TextureLoader().load(saturn)}
                />
            </mesh>
            {isActive && (
                console.log(name)
            )}
        </>
    );
};
export default Saturne;

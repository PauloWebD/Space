import { TextureLoader } from 'three';
import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import uranus from "./systemSolaire/uranus.jpg";


const Uranus = (props) => {
    const meshRef = useRef();
    const [isActive, setIsActive] = useState(false);
    const { position } = props;
    const name = 'Uranus';

    useFrame((state) => {
        // meshRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.024) * 385;
        // meshRef.current.position.z = Math.cos(state.clock.getElapsedTime() * 0.024) * 385;
        meshRef.current.rotation.y += 0.01;
    });
// size 5
    return (
        <>
            <mesh ref={meshRef} position={position} onClick={() => setIsActive(!isActive)}>
                <sphereBufferGeometry attach="geometry" args={[1.2, 32, 32]} />
                <meshBasicMaterial
                    attach="material"
                    map={new TextureLoader().load(uranus)}
                />
            </mesh>
            {
                isActive && (
                    console.log(name)
                )
            }
        </>
    );
};
export default Uranus;
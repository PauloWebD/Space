import { TextureLoader, DoubleSide } from 'three';
import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import uranusmap from "./systemSolaire/uranusmap.jpg";
import uranusringcolor from "./systemSolaire/uranusringcolor.jpg";

const Uranus = (props) => {
    const meshRef = useRef();
    const ringRef = useRef();
    const [isActive, setIsActive] = useState(false);
    const { position } = props;
    const name = 'Uranus';

    useFrame((state) => {
        meshRef.current.rotation.y += 0.01;
        ringRef.current.rotation.y += 0.01;
    });

    return (
        <>
            <mesh ref={meshRef} position={position} onClick={() => setIsActive(!isActive)}>
                <sphereBufferGeometry attach="geometry" args={[1.2, 32, 32]} />
                <meshBasicMaterial attach="material" map={new TextureLoader().load(uranusmap)} />
            </mesh>
            <mesh ref={ringRef} position={position}>
                <group rotation={[Math.PI / 2, 0.06, 0]}>
                    <mesh>
                        <ringBufferGeometry attach="geometry" args={[1.6, 2.2, 64]} />
                        <meshBasicMaterial attach="material" map={new TextureLoader().load(uranusringcolor)} side={DoubleSide} />
                    </mesh>
                </group>
            </mesh>


            {isActive && (
                console.log(name)
            )}
        </>
    );
};

export default Uranus;

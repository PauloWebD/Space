import { TextureLoader, DoubleSide } from 'three';
import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import saturn from "./systemSolaire/saturn.jpg";
import saturnringcolor from "./systemSolaire/saturnringcolor.jpg";

const Saturne = (props) => {
    const meshRef = useRef();
    const ringRef = useRef();
    const [isActive, setIsActive] = useState(false);
    const { position } = props;
    const name = 'Saturne';

    useFrame((state) => {
        meshRef.current.rotation.y += 0.01;
        ringRef.current.rotation.y += 0.01;
    });

    return (
        <>
            <mesh ref={meshRef} position={position} onClick={() => setIsActive(!isActive)}>
                <sphereBufferGeometry attach="geometry" args={[1.2, 32, 32]} />
                <meshBasicMaterial attach="material" map={new TextureLoader().load(saturn)} />
            </mesh>
            <mesh ref={ringRef} position={position}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <mesh>
                        <ringBufferGeometry attach="geometry" args={[1.6, 2.2, 64]} />
                        <meshBasicMaterial attach="material" map={new TextureLoader().load(saturnringcolor)} side={DoubleSide} />
                    </mesh>
                </group>
            </mesh>
            {isActive && (
                console.log(name)
            )}
        </>
    );
};

export default Saturne;

import { OrbitControls, RandomizedLight } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

const ThreeScene = (props) => {
    let camPos;
    console.log(props)
    if (props.position != undefined) camPos = props.position
    return (
        <Canvas camera={{ position: camPos }}>
            <directionalLight position={[1, 2, 1.5]} intensity={1.5} />  
            <hemisphereLight intensity={0.5} groundColor="red" />
            {/* <ambientLight intensity={3} /> */}
            <Suspense fallback={null}>
                {props.model}
                <OrbitControls />
            </Suspense>
        </Canvas>
    )
}

export default ThreeScene;
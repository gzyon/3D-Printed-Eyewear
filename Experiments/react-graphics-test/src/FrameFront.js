import React from "react"
import * as THREE from 'three'
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const FrameFront = (props) => {
    console.log(props);
    let frame_front;

    frame_front = useLoader(OBJLoader, 'frame2/front.obj').children[0];

    let front_geom, left_geom, right_geom;
    frame_front.traverse(function(child) {
        front_geom = child.geometry;
    });
    front_geom.computeBoundingBox();
    const center = new THREE.Vector3();
    front_geom.boundingBox.getCenter(center);
    console.log(center, front_geom.boundingBox);

    const positions = new Float32Array([0, 0, 0]);
    const points = new THREE.BufferAttribute(positions, 3);
    // const colors = new Float32Array([1, 1, 1]);
    console.log(positions);

    return (
        <>
        <mesh geometry={front_geom} position={props.position} rotation={props.rotation} >
            <meshStandardMaterial attach="material" color={0xff0000} /> 
        </mesh>
        <mesh position={[props.position[0] - 75, props.position[1], props.position[2]]}>
            <boxGeometry args={[5, 5, 5]} />
            <meshStandardMaterial color={'orange'} />
        </mesh> 
        </>
    )
}

export default FrameFront;
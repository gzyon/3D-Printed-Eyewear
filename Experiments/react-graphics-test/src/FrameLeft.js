import React from "react"
import * as THREE from 'three'
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const FrameLeft = (props) => {
    console.log(props);
    let frame_left;

    frame_left = useLoader(OBJLoader, 'frame2/templeL.obj').children[0];

    let front_geom, left_geom, right_geom;
    frame_left.traverse(function(child) {
        left_geom = child.geometry;
    });
    // right_geom.computeBoundingBox();
    // const center = new THREE.Vector3();
    // right_geom.boundingBox.getCenter(center);
    // console.log(center, right_geom.boundingBox);

    return (
        <mesh geometry={left_geom} position={props.position} rotation={props.rotation} >
            <meshStandardMaterial attach="material" color={0xff0000} /> 
        </mesh> 
    )
}

export default FrameLeft;
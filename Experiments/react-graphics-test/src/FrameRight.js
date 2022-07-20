import React from "react"
import * as THREE from 'three'
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const FrameRight = (props) => {
    console.log(props);
    let frame_right;

    frame_right = useLoader(OBJLoader, 'frame2/templeR.obj').children[0];

    let front_geom, left_geom, right_geom;
    frame_right.traverse(function(child) {
        right_geom = child.geometry;
    });
    right_geom.computeBoundingBox();
    const center = new THREE.Vector3();
    right_geom.boundingBox.getCenter(center);
    console.log(center, right_geom.boundingBox);
    const xOffset = (right_geom.boundingBox.min.x - right_geom.boundingBox.max.x) / 2;
    const yOffset = (right_geom.boundingBox.min.y - right_geom.boundingBox.max.y) / 2;
    const zOffset = (right_geom.boundingBox.min.z - right_geom.boundingBox.max.z) / 2;

    const pos = [props.position[0] - xOffset, props.position[1] - center.y, props.position[2] - center.z];
    // console.log("left position", pos)
    return (
        <mesh geometry={right_geom} position={pos} rotation={props.rotation} >
            <meshStandardMaterial attach="material" color={0xff0000} /> 
        </mesh> 
    )
}

export default FrameRight;
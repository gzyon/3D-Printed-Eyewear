import React from "react"
import * as THREE from 'three'
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const Specs = (props) => {
    let frame_front;
    let frame_left;
    let frame_right;

    frame_front = useLoader(OBJLoader, 'frame2/front.obj').children[0];
    frame_left = useLoader(OBJLoader, 'frame2/templeL.obj').children[0];
    frame_right = useLoader(OBJLoader, 'frame2/templeR.obj').children[0];

    console.log(frame_front);
    let front_geom, left_geom, right_geom;
    frame_front.traverse(function(child) {
        front_geom = child.geometry;
    });

    frame_left.traverse(function(child) {
        left_geom = child.geometry;
    });

    frame_right.traverse(function(child) {
        right_geom = child.geometry;
    });

    return (
        <group {...props}>
            <mesh geometry={front_geom}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            <mesh geometry={left_geom}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            <mesh geometry={right_geom}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
        </group>
    )
}

export default Specs;
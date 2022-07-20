import React from "react"
import * as THREE from 'three'
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const Specs = (props) => {
    console.log(props);
    let frame_front;
    let frame_left;
    let frame_right;

    frame_front = useLoader(OBJLoader, 'frame2/front.obj').children[0];
    frame_left = useLoader(OBJLoader, 'frame2/templeL.obj').children[0];
    frame_right = useLoader(OBJLoader, 'frame2/templeR.obj').children[0];

    let front_geom, left_geom, right_geom;
    frame_front.traverse(function(child) {
        front_geom = child.geometry;
    });
    front_geom.computeBoundingBox();
    const center = new THREE.Vector3();
    front_geom.boundingBox.getCenter(center);
    console.log(center, front_geom.boundingBox);

    frame_left.traverse(function(child) {
        left_geom = child.geometry;
    });
    left_geom.computeBoundingBox();
    const rightCenter = new THREE.Vector3();
    left_geom.boundingBox.getCenter(rightCenter);

    frame_right.traverse(function(child) {
        right_geom = child.geometry;
    });
    right_geom.computeBoundingBox();
    const leftCenter = new THREE.Vector3();
    right_geom.boundingBox.getCenter(leftCenter);
    console.log(leftCenter, right_geom.boundingBox);

    const leftArmPosition = [props.leftPosition[0]-leftCenter.y, props.leftPosition[1]-leftCenter.z, props.leftPosition[2]-leftCenter.x];
    const rightArmPosition = [props.rightPosition[0]-rightCenter.y, props.rightPosition[1]-rightCenter.z, props.rightPosition[2]-rightCenter.x];

    return (
        <>
        {/* <group rotation={props.rotation} scale={props.scale} > */}
            <mesh geometry={front_geom} position={props.position} rotation={props.rotation} scale={props.scale}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            <mesh position={[props.position[0]-front_geom.boundingBox.max.y, props.position[1], props.position[2]]}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'orange'} />
            </mesh> 
            <mesh geometry={left_geom} position={rightArmPosition} rotation={props.rotation} scale={props.scale} >
            {/* rotation={[0, 0, -Math.PI/22]} */}
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            <mesh geometry={right_geom} position={leftArmPosition} rotation={props.rotation} scale={props.scale} >
            {/* rotation={[0, 0, Math.PI/15]} */}
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            <mesh position={props.leftPosition}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'orange'} />
            </mesh> 
            {/* <mesh geometry={right_geom} >
            rotation={[0, 0, Math.PI/15]}
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh>  */}
        {/* </group> */}
        </>
    )
}

export default Specs;
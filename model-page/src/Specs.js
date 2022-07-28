import React from "react"
import * as THREE from 'three'
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const Specs = (props) => {
    const frontFrameInfo = props.specsInfo.frontFrame;
    const leftArmInfo = props.specsInfo.leftArm;
    const rightArmInfo = props.specsInfo.rightArm;

    return (
        <>
            {/* <mesh geometry={front_geom} position={noseBridgePos} rotation={[-(leftArmXRotation + rightArmXRotation) / 2, phi / 2, theta / 2]}  scale={frontFrameScale}> */}
            <mesh geometry={frontFrameInfo.geometry} position={frontFrameInfo.position} rotation={frontFrameInfo.rotation}  scale={frontFrameInfo.scale}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh>
            {/* <mesh position={leftHingePos}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'orange'} />
            </mesh> 
            <mesh position={rightHingePos}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'blue'} />
            </mesh>  */}
            {/* <mesh geometry={leftCenter_geom} position={leftCenterRenderPoint} scale={[props.scale, props.scale, props.scale * scaledleftArmLength]} rotation={[-leftArmXRotation, -leftArmYRotation, 0]}> */}
            <mesh geometry={leftArmInfo.centerGeometry} position={leftArmInfo.centerPosition} scale={[1, 1, 1 * leftArmInfo.scale]} rotation={leftArmInfo.centerRotation}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            {/* <mesh geometry={leftEnd_geom} position={leftArmEndRenderPoint} scale={props.scale} rotation={[-leftArmXRotation, 0, 0]}> */}
            <mesh geometry={leftArmInfo.endGeometry} position={leftArmInfo.endPosition} scale={1} rotation={leftArmInfo.endRotation}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh>
            {/* <mesh position={props.rightPosition}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'orange'} />
            </mesh>  */}
            {/* <mesh geometry={rightCenter_geom} position={rightCenterRenderPoint} scale={[props.scale, props.scale, props.scale * scaledRightArmLength]} rotation={[-rightArmXRotation, rightArmYRotation, 0]}> */}
            <mesh geometry={rightArmInfo.centerGeometry} position={rightArmInfo.centerPosition} scale={[1, 1, 1 * rightArmInfo.scale]} rotation={rightArmInfo.centerRotation}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            {/* <mesh geometry={rightEnd_geom} position={rightArmEndRenderPoint} scale={props.scale} rotation={[-rightArmXRotation, 0, 0]}> */}
            <mesh geometry={rightArmInfo.endGeometry} position={rightArmInfo.endPosition} scale={1} rotation={rightArmInfo.endRotation}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh>
            {/* <mesh position={props.leftPosition}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'orange'} />
            </mesh>  */}
        </>
    )
}

export default Specs;
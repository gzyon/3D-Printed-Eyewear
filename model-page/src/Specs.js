import React from "react"
import * as THREE from 'three'
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const Specs = (props) => {
    const frontFrameInfo = props.specsInfo.frontFrame;
    const leftArmInfo = props.specsInfo.leftArm;
    const rightArmInfo = props.specsInfo.rightArm;
    const keyPositions = props.specsInfo.keyPositions;
    const customScale = props.customScale;
    console.log(props)

    const frame = props.specsInfo.specsType;
    let frontFrameScale;
    if (frame == "frame 1") {
        frontFrameScale = [frontFrameInfo.scale, frontFrameInfo.scale * customScale.xScale, frontFrameInfo.scale * customScale.yzScale]
    } 

    return (
        <>
            {/* <mesh geometry={front_geom} position={noseBridgePos} rotation={[-(leftArmXRotation + rightArmXRotation) / 2, phi / 2, theta / 2]}  scale={frontFrameScale}> */}
            <mesh geometry={frontFrameInfo.geometry} position={frontFrameInfo.position} rotation={frontFrameInfo.rotation}  scale={frontFrameScale}>
            {/* <mesh geometry={frontFrameInfo.geometry}> */}
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh>
            <mesh position={keyPositions.leftHinge}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'orange'} />
            </mesh> 
            <mesh position={keyPositions.rightHinge}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'blue'} />
            </mesh> 
            {/* <mesh geometry={leftCenter_geom} position={leftCenterRenderPoint} scale={[props.scale, props.scale, props.scale * scaledleftArmLength]} rotation={[-leftArmXRotation, -leftArmYRotation, 0]}> */}
            <mesh geometry={leftArmInfo.centerGeometry} position={leftArmInfo.centerPosition} scale={leftArmInfo.scale} rotation={leftArmInfo.centerRotation}>
            {/* <mesh geometry={leftArmInfo.centerGeometry} > */}
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            {/* <mesh geometry={leftEnd_geom} position={leftArmEndRenderPoint} scale={props.scale} rotation={[-leftArmXRotation, 0, 0]}> */}
            <mesh geometry={leftArmInfo.endGeometry} position={leftArmInfo.endPosition} scale={1} rotation={leftArmInfo.endRotation}>
            {/* <mesh geometry={leftArmInfo.endGeometry} rotation={leftArmInfo.endRotation}> */}
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh>
            <mesh position={keyPositions.rightPosition}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'blue'} />
            </mesh> 
            {/* <mesh geometry={rightCenter_geom} position={rightCenterRenderPoint} scale={[props.scale, props.scale, props.scale * scaledRightArmLength]} rotation={[-rightArmXRotation, rightArmYRotation, 0]}> */}
            <mesh geometry={rightArmInfo.centerGeometry} position={rightArmInfo.centerPosition} scale={rightArmInfo.scale} rotation={rightArmInfo.centerRotation}>
            {/* <mesh geometry={rightArmInfo.centerGeometry}> */}
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            {/* <mesh geometry={rightEnd_geom} position={rightArmEndRenderPoint} scale={props.scale} rotation={[-rightArmXRotation, 0, 0]}> */}
            <mesh geometry={rightArmInfo.endGeometry} position={rightArmInfo.endPosition} scale={1} rotation={rightArmInfo.endRotation}>
            {/* <mesh geometry={rightArmInfo.endGeometry} rotation={leftArmInfo.endRotation}> */}
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh>
            <mesh position={keyPositions.leftPosition}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'green'} />
            </mesh> 
        </>
    )
}

export default Specs;
import React, { useState } from "react"
import SpecParameters from "../SpecParameters";

const Specs = (props) => {
    console.log(props);
    const specsInfo = SpecParameters(props.specsInfo.frameFront, props.specsInfo.leftArm, props.specsInfo.rightArm);
    const frontFrameInfo = specsInfo.frontFrame;
    const leftArmInfo = specsInfo.leftArm;
    const rightArmInfo = specsInfo.rightArm;
    const keyPositions = specsInfo.keyPositions;
    const customisations = props.customScale;

    let frontFrameScale, leftArmScale, rightArmScale 
    frontFrameScale = [frontFrameInfo.scale, frontFrameInfo.scale * customisations.frontScale[0], frontFrameInfo.scale * customisations.frontScale[1]]
    leftArmScale = [leftArmInfo.scale[0] * customisations.leftScale, leftArmInfo.scale[1], leftArmInfo.scale[2]]
    rightArmScale = [rightArmInfo.scale[0] * customisations.rightScale, rightArmInfo.scale[1], rightArmInfo.scale[2]]

    return (
        <>
            <mesh geometry={frontFrameInfo.geometry} position={frontFrameInfo.position} rotation={frontFrameInfo.rotation}  scale={frontFrameScale}>
            {/* <mesh geometry={frontFrameInfo.geometry}> */}
                <meshStandardMaterial attach="material" color={customisations.frontColor.hex} /> 
            </mesh>
            <mesh position={keyPositions.leftHinge}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'orange'} />
            </mesh> 
            <mesh position={keyPositions.rightHinge}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'blue'} />
            </mesh> 
            <mesh geometry={leftArmInfo.centerGeometry} position={leftArmInfo.centerPosition} scale={leftArmScale} rotation={leftArmInfo.centerRotation}>
            {/* <mesh geometry={leftArmInfo.centerGeometry} > */}
                <meshStandardMaterial attach="material" color={customisations.leftColor.hex} /> 
            </mesh> 
            <mesh geometry={leftArmInfo.endGeometry} position={leftArmInfo.endPosition} scale={1} rotation={leftArmInfo.endRotation}>
            {/* <mesh geometry={leftArmInfo.endGeometry} rotation={leftArmInfo.endRotation}> */}
                <meshStandardMaterial attach="material" color={customisations.leftColor.hex} /> 
            </mesh>
            <mesh position={keyPositions.rightPosition}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'blue'} />
            </mesh> 
            <mesh geometry={rightArmInfo.centerGeometry} position={rightArmInfo.centerPosition} scale={rightArmScale} rotation={rightArmInfo.centerRotation}>
            {/* <mesh geometry={rightArmInfo.centerGeometry}> */}
                <meshStandardMaterial attach="material" color={customisations.rightColor.hex} /> 
            </mesh> 
            <mesh geometry={rightArmInfo.endGeometry} position={rightArmInfo.endPosition} scale={1} rotation={rightArmInfo.endRotation}>
            {/* <mesh geometry={rightArmInfo.endGeometry} rotation={leftArmInfo.endRotation}> */}
                <meshStandardMaterial attach="material" color={customisations.rightColor.hex} /> 
            </mesh>
            <mesh position={keyPositions.leftPosition}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'green'} />
            </mesh> 
        </>
    )
}

export default Specs;
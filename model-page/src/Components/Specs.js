import React from "react"
import SpecParameters from "../SpecParameters";

const Specs = (props) => {
    console.log(props);
    const specsInfo = SpecParameters(props.specsInfo.frameFront, props.specsInfo.leftArm, props.specsInfo.rightArm);
    const frontFrameInfo = specsInfo.frontFrame;
    const leftArmInfo = specsInfo.leftArm;
    const rightArmInfo = specsInfo.rightArm;
    const keyPositions = specsInfo.keyPositions;
    const customScale = props.customScale;

    const frame = specsInfo.specsType;
    let frontFrameScale;
    if (frame === "frame 1") {
        frontFrameScale = [frontFrameInfo.scale, frontFrameInfo.scale * customScale.xScale, frontFrameInfo.scale * customScale.yzScale]
    } 

    return (
        <>
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
            <mesh geometry={leftArmInfo.centerGeometry} position={leftArmInfo.centerPosition} scale={leftArmInfo.scale} rotation={leftArmInfo.centerRotation}>
            {/* <mesh geometry={leftArmInfo.centerGeometry} > */}
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            <mesh geometry={leftArmInfo.endGeometry} position={leftArmInfo.endPosition} scale={1} rotation={leftArmInfo.endRotation}>
            {/* <mesh geometry={leftArmInfo.endGeometry} rotation={leftArmInfo.endRotation}> */}
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh>
            <mesh position={keyPositions.rightPosition}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'blue'} />
            </mesh> 
            <mesh geometry={rightArmInfo.centerGeometry} position={rightArmInfo.centerPosition} scale={rightArmInfo.scale} rotation={rightArmInfo.centerRotation}>
            {/* <mesh geometry={rightArmInfo.centerGeometry}> */}
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
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
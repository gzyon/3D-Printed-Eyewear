import { useLoader } from "@react-three/fiber";
import * as React from "react"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import SpecParameters from "../../SpecParameters";

const Specs = (props) => {
    console.log(props);
    const frontFrame = useLoader(OBJLoader, props.specsInfo.frameFront.frameModel);
    const customisations = props.customScale;
    const scaling = {frontScale: customisations.frontScale, leftScale: customisations.leftScale, rightScale: customisations.rightScale};
    const specsInfo = SpecParameters({frameModel: frontFrame.children[0], position: props.specsInfo.frameFront.position}, props.specsInfo.leftArm, props.specsInfo.rightArm, scaling);
    const frontFrameInfo = specsInfo.frontFrame;
    const leftArmInfo = specsInfo.leftArm;
    const rightArmInfo = specsInfo.rightArm;
    const keyPositions = specsInfo.keyPositions;
    console.log(specsInfo);

    let frontFrameScale, leftArmScale, rightArmScale 
    frontFrameScale = [frontFrameInfo.scale, frontFrameInfo.scale * customisations.frontScale[0], frontFrameInfo.scale * customisations.frontScale[1]]
    leftArmScale = [leftArmInfo.scale[0] * customisations.leftScale, leftArmInfo.scale[1], leftArmInfo.scale[2]]
    rightArmScale = [rightArmInfo.scale[0] * customisations.rightScale, rightArmInfo.scale[1], rightArmInfo.scale[2]]

    return (
        <>
            <mesh position={keyPositions.noseBridgePos}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'blue'} />
            </mesh> 
            <mesh geometry={frontFrameInfo.geometry} position={frontFrameInfo.position} rotation={frontFrameInfo.rotation}  scale={frontFrameScale}>
            {/* <mesh geometry={frontFrameInfo.geometry}> */}
                <meshStandardMaterial attach="material" color={customisations.frontColor.hex} roughness={9} /> 
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
            <mesh geometry={rightArmInfo.centerGeometry} position={rightArmInfo.centerPosition} scale={rightArmScale} rotation={rightArmInfo.centerRotation}>
            {/* <mesh geometry={rightArmInfo.centerGeometry}> */}
                <meshStandardMaterial attach="material" color={customisations.rightColor.hex} /> 
            </mesh> 
            <mesh geometry={rightArmInfo.endGeometry} position={rightArmInfo.endPosition} scale={1} rotation={rightArmInfo.endRotation}>
            {/* <mesh geometry={rightArmInfo.endGeometry} rotation={leftArmInfo.endRotation}> */}
                <meshStandardMaterial attach="material" color={customisations.rightColor.hex} /> 
            </mesh>
        </>
    )
}

export default Specs;
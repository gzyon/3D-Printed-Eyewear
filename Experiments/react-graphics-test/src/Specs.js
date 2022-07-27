import React, {useState, useEffect} from "react"
import * as THREE from 'three'
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const Specs = (props) => {
    console.log(props);
    let frame_front, frame_leftCenter, frame_leftEnd, frame_rightCenter, frame_rightEnd;

    // helper functions
    function getGeometry(object) {
        let geom;
        object.traverse(function(child) {
            if (child.geometry != null) {
                geom = child.geometry;
            }
        });

        return geom;
    }

    function getBoundingBox(geometry) {
        geometry.computeBoundingBox();
        const center = new THREE.Vector3();
        geometry.boundingBox.getCenter(center);

        return geometry.boundingBox, center;
    }

    /**
     * 
     * @param {THREE.BufferGeometry} geometry 
     * @param {Array} rotation 
     */
    function centraliseMesh(geometry, rotation) {
        geometry.computeBoundingBox();
        const center = new THREE.Vector3();
        geometry.boundingBox.getCenter(center);

        geometry.translate(-center.x, -center.y, -center.z);
        geometry.rotateX(rotation[0]);
        geometry.rotateY(rotation[1]);
        geometry.rotateZ(rotation[2]);
        
        geometry.computeBoundingBox();
        return geometry;
    }

    // load models
    frame_front = useLoader(OBJLoader, 'frame2/front.obj').children[0];
    frame_leftCenter = useLoader(OBJLoader, 'frame2/templeL_centre.obj').children[0];
    frame_leftEnd = useLoader(OBJLoader, 'frame2/templeL_end.obj').children[0];
    frame_rightCenter = useLoader(OBJLoader, 'frame2/templeR_centre.obj').children[0];
    frame_rightEnd = useLoader(OBJLoader, 'frame2/templeR_end.obj').children[0];

    


    // frame front
    let front_geom, leftCenter_geom, leftEnd_geom, rightCenter_geom, rightEnd_geom;
    front_geom = centraliseMesh(getGeometry(frame_front), [Math.PI / 2, 0, Math.PI / 2]);
    leftCenter_geom = centraliseMesh(getGeometry(frame_leftCenter), [0, -Math.PI / 4, 0]);
    leftEnd_geom = centraliseMesh(getGeometry(frame_leftEnd), [0, -Math.PI / 4, 0]);
    rightCenter_geom = centraliseMesh(getGeometry(frame_rightCenter), [0, -Math.PI / 4, 0]);
    rightEnd_geom = centraliseMesh(getGeometry(frame_rightEnd), [0, -Math.PI / 4, 0]);
        
    
    
    let frontCenterBox;
    const frontCenter = new THREE.Vector3();
    

    // frame left arm
    let leftCenterBox, leftEndBox;
    const leftCenter = new THREE.Vector3();
    const leftEndCenter = new THREE.Vector3();


    // frame right arm
    let rightCenterBox, rightEndBox;
    const rightCenter = new THREE.Vector3();
    const rightEndCenter = new THREE.Vector3();
    
    // math

    //front frame 
    // rotation
    let y, x, theta;
    
    // console.log(theta);

    // scale
    let frontFrameScale;

    // position
    let noseBridgePos, leftHingePos, rightHingePos;
    
    // left arm 
    // render points
    let leftCenterRenderPoint, leftArmEndRenderPoint;
    //  - rightEndBox.max.x

    // scaling 
    let currentLeftArmLength, scaledleftArmLength;

    // rotation
    let leftArmYRotation, leftArmXRotation;

    // right arm 
    // render points
    let rightCenterRenderPoint, rightArmEndRenderPoint;  
    //  - leftEndBox.max.x

    // scaling
    let currentRightArmLength, scaledRightArmLength;

    // rotation
    let rightArmYRotation, rightArmXRotation;

    useEffect(() => {
        console.log("i should run once only");
        
        // frame front
        frontCenterBox = front_geom.boundingBox;
        frontCenterBox.getCenter(frontCenter);

        // frame left arm
        leftCenterBox = leftCenter_geom.boundingBox;
        leftCenterBox.getCenter(leftCenter);
        leftEndBox = leftEnd_geom.boundingBox;
        leftEndBox.getCenter(leftEndCenter);

        // frame right arm
        rightCenterBox = rightCenter_geom.boundingBox;
        rightCenterBox.getCenter(rightCenter);
        rightEndBox = rightEnd_geom.boundingBox;
        rightEndBox.getCenter(rightEndCenter);

        // math
        // rotation
        y = (props.leftPosition[1] - props.rightPosition[1]);
        x = (props.leftPosition[0] - props.rightPosition[0]);
        theta = Math.atan(y/x);

        // scale
        frontFrameScale = (Math.abs(x /(frontCenterBox.max.z * 2)) * 0.8) / 10;

        // position
        noseBridgePos = [props.position[0], props.position[1] - frontCenterBox.max.y, props.position[2]];
        leftHingePos = [props.position[0] - (frontCenterBox.max.x * frontFrameScale) + 5, (props.position[1]) * frontFrameScale - theta, props.position[2] - (frontCenterBox.max.z * frontFrameScale)];
        rightHingePos = [props.position[0] + (frontCenterBox.max.x * frontFrameScale) - 5, (props.position[1]) * frontFrameScale + theta, props.position[2] - (frontCenterBox.max.z * frontFrameScale)];

        // left arm 
        // render points
        leftCenterRenderPoint = [props.rightPosition[0] - (props.rightPosition[0] - rightHingePos[0]) / 2, props.rightPosition[1] + (props.position[1]-props.rightPosition[1]) / 2, props.rightPosition[2] + ((props.position[2]-props.rightPosition[2]) / 2)];
        leftArmEndRenderPoint = [props.rightPosition[0], props.rightPosition[1] - rightEndBox.max.y, props.rightPosition[2] - rightEndBox.max.z];
        
        // scaling 
        currentLeftArmLength = rightCenterBox.max.z - rightCenterBox.min.z;
        scaledleftArmLength = Math.sqrt(Math.pow(props.position[1]-props.rightPosition[1], 2) + Math.pow(props.position[2]-props.rightPosition[2], 2)) / currentLeftArmLength;

        // rotation
        leftArmYRotation = Math.atan(Math.abs(rightHingePos[0] - props.rightPosition[0]) / Math.abs(rightHingePos[2] - props.rightPosition[2]));
        leftArmXRotation = Math.atan(Math.abs(rightHingePos[1] - props.rightPosition[1]) / Math.abs(rightHingePos[2] - props.rightPosition[2]));

        // right arm 
        // render points
        rightCenterRenderPoint = [props.leftPosition[0] - (props.leftPosition[0] - leftHingePos[0]) / 2, props.leftPosition[1] + (props.position[1]-props.leftPosition[1]) / 2, props.leftPosition[2] + (props.position[2]-props.leftPosition[2]) / 2];
        rightArmEndRenderPoint = [props.leftPosition[0], props.leftPosition[1] - leftEndBox.max.y, props.leftPosition[2] - leftEndBox.max.z];  
        //  - leftEndBox.max.x

        // scaling
        currentRightArmLength = leftCenterBox.max.z - leftCenterBox.min.z;
        scaledRightArmLength = Math.sqrt(Math.pow(props.position[1]-props.leftPosition[1], 2) + Math.pow(props.position[2]-props.leftPosition[2], 2)) / currentRightArmLength;

        // rotation
        rightArmYRotation = Math.atan(Math.abs(leftHingePos[0] - props.leftPosition[0]) / Math.abs(leftHingePos[2] - props.leftPosition[2]));
        rightArmXRotation = Math.atan(Math.abs(leftHingePos[1] - props.leftPosition[1]) / Math.abs(leftHingePos[2] - props.leftPosition[2]));


    }, []);
    console.log(frontFrameScale, theta, noseBridgePos);
    return (
        <group>
            <mesh geometry={front_geom} position={noseBridgePos} rotation={[0, 0, theta/2]}  scale={frontFrameScale}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            <mesh position={leftHingePos}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'orange'} />
            </mesh> 
            <mesh position={rightHingePos}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'blue'} />
            </mesh> 
            <mesh geometry={leftCenter_geom} position={leftCenterRenderPoint} scale={[props.scale, props.scale, props.scale * scaledleftArmLength]} rotation={[-leftArmXRotation, -leftArmYRotation, 0]}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            <mesh geometry={leftEnd_geom} position={leftArmEndRenderPoint} scale={props.scale} >
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh>
            <mesh position={props.rightPosition}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'orange'} />
            </mesh> 
            <mesh geometry={rightCenter_geom} position={rightCenterRenderPoint} scale={[props.scale, props.scale, props.scale * scaledRightArmLength]} rotation={[-rightArmXRotation, rightArmYRotation, 0]}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            <mesh geometry={rightEnd_geom} position={rightArmEndRenderPoint} scale={props.scale}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh>
            <mesh position={props.leftPosition}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'orange'} />
            </mesh> 
        </group>
    )
}

export default Specs;
import React from "react"
import * as THREE from 'three'
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const Specs = (props) => {
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
    let frontCenterBox;
    const frontCenter = new THREE.Vector3();
    frontCenterBox = front_geom.boundingBox;
    frontCenterBox.getCenter(frontCenter);
    const y = props.leftPosition[1] - props.rightPosition[1];
    const x = props.leftPosition[0] - props.rightPosition[0];
    const theta = Math.atan(y/x);

    // frame left arm
    leftCenter_geom = centraliseMesh(getGeometry(frame_leftCenter), [0, -Math.PI / 4, 0]);
    leftEnd_geom = centraliseMesh(getGeometry(frame_leftEnd), [0, -Math.PI / 4, 0]);
    let leftCenterBox, leftEndBox;
    const leftCenter = new THREE.Vector3();
    leftCenterBox = leftCenter_geom.boundingBox;
    leftCenterBox.getCenter(leftCenter);
    const leftEndCenter = new THREE.Vector3();
    leftEndBox = leftEnd_geom.boundingBox;
    leftEndBox.getCenter(leftEndCenter);

    // frame right arm
    rightCenter_geom = centraliseMesh(getGeometry(frame_rightCenter), [0, -Math.PI / 4, 0]);
    rightEnd_geom = centraliseMesh(getGeometry(frame_rightEnd), [0, -Math.PI / 4, 0]);
    let rightCenterBox, rightEndBox;
    const rightCenter = new THREE.Vector3();
    rightCenterBox = rightCenter_geom.boundingBox;
    rightCenterBox.getCenter(rightCenter);
    const rightEndCenter = new THREE.Vector3();
    rightEndBox = rightEnd_geom.boundingBox;
    rightEndBox.getCenter(rightEndCenter);

    // math
    const noseBridgePos = [props.position[0], props.position[1] - frontCenterBox.max.y, props.position[2]];
    const leftHingePos = [props.position[0] - frontCenterBox.max.x, props.position[1], props.position[2] - frontCenterBox.max.z];
    const rightHingePos = [props.position[0] + frontCenterBox.max.x, props.position[1], props.position[2] - frontCenterBox.max.z];

    const leftCenterRenderPoint = [props.rightPosition[0] - (props.rightPosition[0] - rightHingePos[0]) / 2, props.rightPosition[1] + (props.position[1]-props.rightPosition[1]) / 2, props.rightPosition[2] + (props.position[2]-props.rightPosition[2]) / 2];
    const rightCenterRenderPoint = [props.leftPosition[0] - (props.leftPosition[0] - leftHingePos[0]) / 2, props.leftPosition[1] + (props.position[1]-props.leftPosition[1]) / 2, props.leftPosition[2] + (props.position[2]-props.leftPosition[2]) / 2];

    const currentLeftArmLength = leftCenterBox.max.z - leftCenterBox.min.z;
    const scaledleftArmLength = Math.sqrt(Math.pow(props.position[1]-props.rightPosition[1], 2) + Math.pow(props.position[2]-props.rightPosition[2], 2)) / currentLeftArmLength;
    
    const currentRightArmLength = rightCenterBox.max.z - rightCenterBox.min.z;
    const scaledRightArmLength = Math.sqrt(Math.pow(props.position[1]-props.leftPosition[1], 2) + Math.pow(props.position[2]-props.leftPosition[2], 2)) / currentRightArmLength;

    const leftArmEndRenderPoint = [props.rightPosition[0] - rightEndBox.max.x, props.rightPosition[1] - rightEndBox.max.y, props.rightPosition[2] - rightEndBox.max.z];
    const rightArmEndRenderPoint = [props.leftPosition[0] - leftEndBox.max.x, props.leftPosition[1] - leftEndBox.max.y, props.leftPosition[2] - leftEndBox.max.z];   


    return (
        <>
            <mesh geometry={front_geom} position={noseBridgePos} scale={props.scale} rotation={[0, -theta/2, 0]}>
            {/* rotation={[props.rotation[0], props.rotation[1] - (theta/2), props.rotation[2]]} */}
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            <mesh position={leftHingePos}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'orange'} />
            </mesh> 
            <mesh position={rightHingePos}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'orange'} />
            </mesh> 
            <mesh geometry={leftCenter_geom} position={leftCenterRenderPoint} scale={[props.scale, props.scale, props.scale * scaledleftArmLength]}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            <mesh geometry={leftEnd_geom} position={leftArmEndRenderPoint} scale={props.scale}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh>
            <mesh position={props.rightPosition}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'orange'} />
            </mesh> 
            <mesh geometry={rightCenter_geom} position={rightCenterRenderPoint} scale={[props.scale, props.scale, props.scale * scaledRightArmLength]}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh> 
            <mesh geometry={rightEnd_geom} position={rightArmEndRenderPoint} scale={props.scale}>
                <meshStandardMaterial attach="material" color={0xff0000} /> 
            </mesh>
            <mesh position={props.leftPosition}>
                <boxGeometry args={[5, 5, 5]} />
                <meshStandardMaterial color={'orange'} />
            </mesh> 
        </>
    )
}

export default Specs;
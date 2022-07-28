// import { PropTypes } from "prop-types";
import * as THREE from 'three'

function SpecParameters(front, left, right) {

    console.log("calculating parameters");

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
        // geometry.rotateX(rotation[0]);
        // geometry.rotateY(rotation[1]);
        // geometry.rotateZ(rotation[2]);
        
        geometry.computeBoundingBox();
        return geometry;
    }

    function getModelLength(geometry) {
        const geomBox = geometry.boundingBox;
        if (geomBox.max.x > geomBox.max.y && geomBox.max.x > geomBox.max.z) return geomBox.max.x;
        else if (geomBox.max.y > geomBox.max.x && geomBox.max.y > geomBox.max.z) return geomBox.max.y;
        else return geomBox.max.z;
    }

    function getModelWidth(geometry) {
        const geomBox = geometry.boundingBox;
        if (geomBox.max.x < geomBox.max.y && geomBox.max.x < geomBox.max.z) return geomBox.max.x;
        else if (geomBox.max.y < geomBox.max.x && geomBox.max.y < geomBox.max.z) return geomBox.max.y;
        else return geomBox.max.z;
    }

    function getModelHeight(geometry) {
        const geomBox = geometry.boundingBox;
        if ((geomBox.max.x > geomBox.max.y && geomBox.max.x < geomBox.max.z) || (geomBox.max.x < geomBox.max.y && geomBox.max.x > geomBox.max.z)) return geomBox.max.x;
        else if ((geomBox.max.y > geomBox.max.x && geomBox.max.y < geomBox.max.z) || (geomBox.max.y < geomBox.max.x && geomBox.max.y > geomBox.max.z)) return geomBox.max.y;
        else return geomBox.max.z;
    }

    // frame front
    let front_geom, leftCenter_geom, leftEnd_geom, rightCenter_geom, rightEnd_geom;
    front_geom = centraliseMesh(getGeometry(front.frameModel), [-Math.PI / 2, -Math.PI / 2, 0]);
    // front_geom.rotateX(-Math.PI / 2);
    // front_geom.rotateY(-Math.PI / 2);
    // front_geom.computeBoundingBox();
    let frontCenterBox;
    const frontCenter = new THREE.Vector3();
    frontCenterBox = front_geom.boundingBox;
    frontCenterBox.getCenter(frontCenter);
    
    // frame left arm
    leftCenter_geom = centraliseMesh(getGeometry(left.centerFrameModel), [0, -Math.PI / 2, 0]);
    leftEnd_geom = centraliseMesh(getGeometry(left.endFrameModel), [0, -Math.PI / 2, 0]);
    let leftCenterBox, leftEndBox;
    const leftCenter = new THREE.Vector3();
    leftCenterBox = leftCenter_geom.boundingBox;
    leftCenterBox.getCenter(leftCenter);
    const leftEndCenter = new THREE.Vector3();
    leftEndBox = leftEnd_geom.boundingBox;
    leftEndBox.getCenter(leftEndCenter);

    // frame right arm
    rightCenter_geom = centraliseMesh(getGeometry(right.centerFrameModel), [0, -Math.PI / 2, 0]);
    rightEnd_geom = centraliseMesh(getGeometry(right.endFrameModel), [0, -Math.PI / 2, 0]);
    let rightCenterBox, rightEndBox;
    const rightCenter = new THREE.Vector3();
    rightCenterBox = rightCenter_geom.boundingBox;
    rightCenterBox.getCenter(rightCenter);
    const rightEndCenter = new THREE.Vector3();
    rightEndBox = rightEnd_geom.boundingBox;
    rightEndBox.getCenter(rightEndCenter);
    // console.log(rightEndBox, rightEndCenter);
    
    // math

    //front frame 
    let frontFrameInfo = {}
    const frontFrameLength = getModelLength(front_geom);
    const frontFrameWidth = getModelWidth(front_geom);
    const frontFrameHeight = getModelHeight(front_geom);

    // rotation
    const y = (left.position[1] - right.position[1]);
    const x = (left.position[0] - right.position[0]);
    const z = (left.position[2] - right.position[2]);
    const theta = Math.atan(y/x);
    const phi = Math.atan(z/x);

    // scale
    // let frontFrameScale = (Math.abs(x /(frontCenterBox.max.z * 2) * 0.8)) / 10;
    let frontFrameScale = 1;
    // if (frontFrameScale < 0) frontFrameScale *= -1;
    console.log(frontFrameScale);

    // position
    const noseBridgePos = [front.position[0], front.position[1] - frontFrameHeight, front.position[2]];
    const yOffset = (frontFrameLength * frontFrameScale) * Math.sin(theta/2);
    const xOffset = Math.sqrt(Math.pow(frontFrameLength, 2) - Math.pow(yOffset, 2));
    const zOffset = ((frontFrameLength * 2) * frontFrameScale) * Math.sin(phi/2);
    const leftHingePos = [front.position[0] - xOffset + 5, (front.position[1]) * frontFrameScale - yOffset, front.position[2] - (frontFrameWidth * frontFrameScale) + 5 + zOffset];
    const rightHingePos = [front.position[0] + xOffset - 5, (front.position[1]) * frontFrameScale + yOffset, front.position[2] - (frontFrameWidth * frontFrameScale) + 5 + zOffset];

    let keyPositions = {}
    keyPositions.leftHinge = leftHingePos;
    keyPositions.rightHinge = rightHingePos;
    keyPositions.leftPosition = left.position;
    keyPositions.rightPosition = right.position;

    frontFrameInfo.geometry = front_geom;
    frontFrameInfo.position = noseBridgePos;
    frontFrameInfo.scale = frontFrameScale;

    // left arm 
    let leftArmInfo = {};
    let leftArmLength = getModelLength(rightCenter_geom);
    let leftEndLength = getModelLength(rightEnd_geom);
    let leftEndHeight = getModelHeight(rightEnd_geom);

    // rotation
    const leftArmYRotation = Math.atan((Math.abs(rightHingePos[0] - right.position[0])) / (Math.abs(rightHingePos[2] - right.position[2]) - 2.5));
    const leftArmXRotation = Math.atan(Math.abs((rightHingePos[1] - 2.5) - right.position[1]) / Math.abs(rightHingePos[2] - right.position[2]));

    // render points
    const leftCenterRenderPoint = [right.position[0] - (right.position[0] - rightHingePos[0]) / 2, right.position[1] + (rightHingePos[1]-right.position[1]) / 2, right.position[2] + ((rightHingePos[2]-right.position[2]) / 2)];
    const leftArmEndxOffset = (leftEndLength / 2) * Math.tan(leftArmYRotation);
    const leftArmEndRenderPoint = [right.position[0] + leftArmEndxOffset, right.position[1] - leftEndHeight, right.position[2] - leftEndLength];

    // scaling 
    const currentLeftArmLength = leftArmLength * 2;
    const leftArmDiagonalLength = Math.sqrt(Math.pow(rightHingePos[0] + 2.5 - right.position[0], 2) + Math.pow(rightHingePos[2] + 2.5 - right.position[2], 2));
    const scaledleftArmLength = Math.sqrt(Math.pow(rightHingePos[1] + 2.5 - right.position[1], 2) + Math.pow(leftArmDiagonalLength, 2)) / currentLeftArmLength;

    leftArmInfo.centerGeometry = leftCenter_geom;
    leftArmInfo.centerPosition = leftCenterRenderPoint;
    leftArmInfo.endGeometry = leftEnd_geom;
    leftArmInfo.endPosition = leftArmEndRenderPoint;
    leftArmInfo.scale = [scaledleftArmLength, 1, 1];
    leftArmInfo.centerRotation = [0, -Math.PI / 2 - leftArmYRotation, leftArmXRotation];
    leftArmInfo.endRotation = [-leftArmXRotation, -Math.PI / 2, 0];

    // right arm 
    let rightArmInfo = {}
    let rightArmLength = getModelLength(leftCenter_geom);
    let rightEndLength = getModelLength(leftEnd_geom);
    let rightEndHeight = getModelHeight(leftEnd_geom);
    // rotation
    const rightArmYRotation = Math.atan(Math.abs(leftHingePos[0] - left.position[0]) / (Math.abs(leftHingePos[2] - left.position[2]) - 2.5));
    const rightArmXRotation = Math.atan(Math.abs((leftHingePos[1] - 2.5) - left.position[1]) / Math.abs(leftHingePos[2] - left.position[2]));

    // render points
    const rightCenterRenderPoint = [left.position[0] - (left.position[0] - leftHingePos[0]) / 2, left.position[1] + (leftHingePos[1]-left.position[1]) / 2, left.position[2] + (leftHingePos[2]-left.position[2]) / 2 + 2.5]; 
    const rightArmEndxOffset = (leftEndBox.max.y / 2) * Math.tan(rightArmXRotation);
    const rightArmEndRenderPoint = [left.position[0] - rightArmEndxOffset, left.position[1] - rightEndHeight - 2.5, left.position[2] - rightEndLength + 5]; 

    // scaling
    const currentRightArmLength = rightArmLength * 2;
    const rightArmDiagonalLength = Math.sqrt(Math.pow(leftHingePos[0] + 2.5 - left.position[0], 2) + Math.pow(leftHingePos[2] + 2.5 - left.position[2], 2));
    const scaledRightArmLength = Math.sqrt(Math.pow(leftHingePos[1] + 2.5 - left.position[1], 2) + Math.pow(rightArmDiagonalLength, 2)) / currentRightArmLength;

    rightArmInfo.centerGeometry = rightCenter_geom;
    rightArmInfo.centerPosition = rightCenterRenderPoint;
    rightArmInfo.endGeometry = rightEnd_geom;
    rightArmInfo.endPosition = rightArmEndRenderPoint;
    rightArmInfo.scale = [scaledRightArmLength, 1, 1];
    rightArmInfo.centerRotation = [0, -Math.PI / 2 + rightArmYRotation, rightArmXRotation];
    rightArmInfo.endRotation = [-rightArmXRotation, -Math.PI / 2, 0];

    // frontFrameInfo.rotation = [- (-Math.PI / 2 + (leftArmXRotation + rightArmXRotation) / 2), phi / 2, theta / 2];
    frontFrameInfo.rotation = [-(Math.PI / 2 + (leftArmXRotation + rightArmXRotation) / 2), 0, -Math.PI / 2 + phi / 2]

    const specsInfo = {frontFrame: frontFrameInfo, leftArm: leftArmInfo, rightArm: rightArmInfo, keyPositions: keyPositions};

    return specsInfo; 
}

export default SpecParameters;

// SpecParameters.propTypes = 

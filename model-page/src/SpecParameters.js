import * as THREE from 'three'

// all the math
function SpecParameters(front, left, right, scale) {

    console.log("calculating parameters for ", front, left, right, scale);

    // helper functions
    /**
     * 
     * @param {THREE.Mesh} object 
     * @returns 
     */
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
    function centraliseMesh(geometry) {
        geometry.computeBoundingBox();
        const center = new THREE.Vector3();
        geometry.boundingBox.getCenter(center);

        geometry.translate(-center.x, -center.y, -center.z);
        
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

    // nose bridge positions (hardcoded)
    const noseBridgePositions = {"frame 1": [front.position[0], front.position[1] - 5, front.position[2]], "frame 2": [front.position[0], front.position[1] - 7, front.position[2]], "frame 3": [front.position[0], front.position[1] - 7, front.position[2]]};

    // frame front
    let front_geom, leftCenter_geom, leftEnd_geom, rightCenter_geom, rightEnd_geom;
    
    front_geom = centraliseMesh(getGeometry(front.frameModel));
    let frontCenterBox;
    const frontCenter = new THREE.Vector3();
    frontCenterBox = front_geom.boundingBox;
    frontCenterBox.getCenter(frontCenter);
    
    // frame left arm
    leftCenter_geom = centraliseMesh(getGeometry(left.centerFrameModel));
    leftEnd_geom = centraliseMesh(getGeometry(left.endFrameModel));
    let leftCenterBox, leftEndBox;
    const leftCenter = new THREE.Vector3();
    leftCenterBox = leftCenter_geom.boundingBox;
    leftCenterBox.getCenter(leftCenter);
    const leftEndCenter = new THREE.Vector3();
    leftEndBox = leftEnd_geom.boundingBox;
    leftEndBox.getCenter(leftEndCenter);

    // frame right arm
    rightCenter_geom = centraliseMesh(getGeometry(right.centerFrameModel));
    rightEnd_geom = centraliseMesh(getGeometry(right.endFrameModel));
    let rightCenterBox, rightEndBox;
    const rightCenter = new THREE.Vector3();
    rightCenterBox = rightCenter_geom.boundingBox;
    rightCenterBox.getCenter(rightCenter);
    const rightEndCenter = new THREE.Vector3();
    rightEndBox = rightEnd_geom.boundingBox;
    rightEndBox.getCenter(rightEndCenter);
    
    // math
    let leftHingeOffset = 0, rightHingeOffset = 0;
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
    const frontRenderPos = [front.position[0], front.position[1] - frontFrameHeight, front.position[2]];
    const noseBridgePos = [noseBridgePositions[front.frameModel.name][0], noseBridgePositions[front.frameModel.name][1], noseBridgePositions[front.frameModel.name][2] + (leftHingeOffset + rightHingeOffset) / 2];

    const yOffset = (frontFrameLength * frontFrameScale * scale.frontScale[1]) * Math.sin(theta/2);
    const xOffset = Math.sqrt(Math.pow(frontFrameLength * scale.frontScale[0], 2) - Math.pow(yOffset, 2));
    const zOffset = ((frontFrameLength * 2) * frontFrameScale) * Math.sin(phi/2);

    const hingeHeightRatio = (noseBridgePos[1] * scale.frontScale[1]) / (frontFrameHeight);
    let leftHingePos = [noseBridgePos[0] - xOffset + 5, (noseBridgePos[1]) * (scale.frontScale[1]) - yOffset, noseBridgePos[2] - (frontFrameWidth * frontFrameScale) + 5 + zOffset];
    let rightHingePos = [noseBridgePos[0] + xOffset - 5, (noseBridgePos[1]) * (scale.frontScale[1]) + yOffset, noseBridgePos[2] - (frontFrameWidth * frontFrameScale) + 5 + zOffset];

    frontFrameInfo.geometry = front_geom;
    frontFrameInfo.scale = frontFrameScale;

    // left arm 
    let leftArmInfo = {};
    let leftArmLength = getModelLength(rightCenter_geom);
    let leftEndLength = getModelLength(rightEnd_geom);
    let leftEndHeight = getModelHeight(rightEnd_geom);

    // rotation
    let leftArmYRotation = Math.atan((Math.abs(rightHingePos[0] - right.position[0])) / (Math.abs(rightHingePos[2] - right.position[2]) - 2.5));
    let leftArmXRotation = Math.atan(Math.abs((rightHingePos[1] - 2.5) - right.position[1]) / Math.abs(rightHingePos[2] - right.position[2]));

    // scaling 
    const currentLeftArmLength = leftArmLength * 2;
    const leftArmDiagonalLength = Math.sqrt(Math.pow(rightHingePos[0] + 2.5 - right.position[0], 2) + Math.pow(rightHingePos[2] + 2.5 - right.position[2], 2));
    const scaledleftArmLength = Math.sqrt(Math.pow(rightHingePos[1] + 2.5 - right.position[1], 2) + Math.pow(leftArmDiagonalLength, 2)); 
    const leftArmScale = scaledleftArmLength / currentLeftArmLength;
    leftHingeOffset = ((scale.leftScale * scaledleftArmLength) - scaledleftArmLength) * Math.cos(leftArmXRotation);
    rightHingePos[2] += leftHingeOffset / 2;

    // recompute rotation if offset > 0
    leftArmYRotation = Math.atan((Math.abs(rightHingePos[0] - right.position[0])) / (Math.abs(rightHingePos[2] - right.position[2]) - 2.5));
    leftArmXRotation = Math.atan(Math.abs((rightHingePos[1] - 2.5) - right.position[1]) / Math.abs(rightHingePos[2] - right.position[2]));

    // render points
    const leftCenterRenderPoint = [right.position[0] - (right.position[0] - rightHingePos[0]) / 2, right.position[1] + (rightHingePos[1]-right.position[1]) / 2, right.position[2] + ((rightHingePos[2]-right.position[2]) / 2) + leftHingeOffset / 2];
    const leftArmEndxOffset = (leftEndLength / 2) * Math.tan(leftArmYRotation);
    const leftArmEndRenderPoint = [right.position[0] - leftArmEndxOffset, right.position[1] - leftEndHeight, right.position[2] - leftEndLength]; 

    leftArmInfo.centerGeometry = leftCenter_geom;
    leftArmInfo.centerPosition = leftCenterRenderPoint;
    leftArmInfo.endGeometry = leftEnd_geom;
    leftArmInfo.endPosition = leftArmEndRenderPoint;
    leftArmInfo.scale = [leftArmScale, 1, 1];
    // leftArmInfo.centerRotation = [-Math.PI / 2 - leftArmXRotation, 0, -Math.PI / 2 - leftArmYRotation];
    leftArmInfo.centerRotation = [0, -Math.PI / 2 - leftArmYRotation, leftArmXRotation];
    leftArmInfo.endRotation = [-leftArmXRotation, -Math.PI / 2, 0];

    // right arm 
    let rightArmInfo = {}
    let rightArmLength = getModelLength(leftCenter_geom);
    let rightEndLength = getModelLength(leftEnd_geom);
    let rightEndHeight = getModelHeight(leftEnd_geom);
    // rotation
    let rightArmYRotation = Math.atan(Math.abs(leftHingePos[0] - left.position[0]) / (Math.abs(leftHingePos[2] - left.position[2]) - 2.5));
    let rightArmXRotation = Math.atan(Math.abs((leftHingePos[1] - 2.5) - left.position[1]) / Math.abs(leftHingePos[2] - left.position[2]));

    // scaling
    const currentRightArmLength = rightArmLength * 2;
    const rightArmDiagonalLength = Math.sqrt(Math.pow(leftHingePos[0] + 2.5 - left.position[0], 2) + Math.pow(leftHingePos[2] + 2.5 - left.position[2], 2));
    const scaledRightArmLength = Math.sqrt(Math.pow(leftHingePos[1] + 2.5 - left.position[1], 2) + Math.pow(rightArmDiagonalLength, 2));
    const rightArmScale = scaledRightArmLength / currentRightArmLength;
    rightHingeOffset = ((scale.rightScale * scaledRightArmLength) - scaledRightArmLength) * Math.cos(rightArmXRotation);
    leftHingePos[2] += rightHingeOffset / 2;

    rightArmYRotation = Math.atan(Math.abs(leftHingePos[0] - left.position[0]) / (Math.abs(leftHingePos[2] - left.position[2]) - 2.5));
    rightArmXRotation = Math.atan(Math.abs((leftHingePos[1] - 2.5) - left.position[1]) / Math.abs(leftHingePos[2] - left.position[2]));

    // render points
    const rightCenterRenderPoint = [left.position[0] - (left.position[0] - leftHingePos[0]) / 2, left.position[1] + (leftHingePos[1]-left.position[1]) / 2, left.position[2] + (leftHingePos[2]-left.position[2]) / 2 + 2.5 + rightHingeOffset / 2]; 
    const rightArmEndxOffset = (leftEndBox.max.y / 2) * Math.tan(rightArmXRotation);
    const rightArmEndRenderPoint = [left.position[0] - rightArmEndxOffset, left.position[1] - rightEndHeight - 2.5, left.position[2] - rightEndLength]; 

    rightArmInfo.centerGeometry = rightCenter_geom;
    rightArmInfo.centerPosition = rightCenterRenderPoint;
    rightArmInfo.endGeometry = rightEnd_geom;
    rightArmInfo.endPosition = rightArmEndRenderPoint;
    rightArmInfo.scale = [rightArmScale, 1, 1];
    // rightArmInfo.centerRotation = [-Math.PI / 2 - rightArmXRotation, 0, -Math.PI / 2 + rightArmYRotation];
    rightArmInfo.centerRotation = [0, -Math.PI / 2 + rightArmYRotation, rightArmXRotation];
    rightArmInfo.endRotation = [-rightArmXRotation, -Math.PI / 2, 0];

    // frontFrameInfo.rotation = [- (-Math.PI / 2 + (leftArmXRotation + rightArmXRotation) / 2), phi / 2, theta / 2];
    frontFrameInfo.position = [frontRenderPos[0], frontRenderPos[1], frontRenderPos[2] + (rightHingeOffset + leftHingeOffset) / 2];
    const rotationOffset = Math.atan((frontFrameInfo[2] - rightHingePos) / (frontFrameInfo[0] - leftHingePos));
    frontFrameInfo.rotation = [-(Math.PI / 2 + (leftArmXRotation + rightArmXRotation) / 2), 0, -Math.PI / 2 + phi / 2]

    let keyPositions = {}
    keyPositions.noseBridgePos = noseBridgePos;
    keyPositions.leftHinge = leftHingePos;
    keyPositions.rightHinge = rightHingePos;
    keyPositions.leftPosition = left.position;
    keyPositions.rightPosition = right.position;

    const specsInfo = {frontFrame: frontFrameInfo, leftArm: leftArmInfo, rightArm: rightArmInfo, keyPositions: keyPositions};

    return specsInfo; 
}

export default SpecParameters;

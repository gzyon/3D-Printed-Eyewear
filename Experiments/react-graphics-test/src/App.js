import "./App.css";
import React, { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";

// three.js imports
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OrbitControls, PresentationControls, Stage } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { DDSLoader } from "three-stdlib";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import GltfModel from "./GltfModel";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

let scale = 1;
let spec_scale = 0.9;

/**
 * 
 * @param {THREE.Group} object 
 * @returns {THREE.BufferGeometry}
 */
function preprocessMesh(object) {
  var center = new THREE.Vector3;
  object.computeBoundingBox();
  object.boundingBox.getCenter(center);
  object.translate(-1 * center.x, -1 * center.y, -1 * center.z);
  // object.rotateX(theta);
  object.boundingBox.getCenter(center);
  return object;
}

/**
 * @param {THREE.BufferGeometry} geometry 
 * @param {Array} renderedOrigin
 * @param {THREE.BufferGeometry} comparedGeometry
 */
const getEarPositions = (geometry, renderedOrigin, comparedGeometry) => {
  let iteratedPoints = 0;
  let leftEar = new THREE.Vector3(renderedOrigin[0], renderedOrigin[1], renderedOrigin[2]);
  let rightEar = new THREE.Vector3(renderedOrigin[0], renderedOrigin[1], renderedOrigin[2]);
  const positionAttribute = geometry.getAttribute('position');
  const point = new THREE.Vector3();
  console.log(leftEar, rightEar);
  console.log("total points: " + positionAttribute.count);
  for (let i=0; i<positionAttribute.count; i++) {
    point.fromBufferAttribute(positionAttribute, i);
    // if (point.x <= renderedOrigin[0] + comparedGeometry.boundingBox.max.x && point.x >= renderedOrigin[0] + comparedGeometry.boundingBox.min.x) {
    if (point.y <= comparedGeometry.boundingBox.max.y && point.y >= comparedGeometry.boundingBox.min.y) {
      // if (point.z <= renderedOrigin[2] + comparedGeometry.boundingBox.max.z && point.z >= renderedOrigin[2] + comparedGeometry.boundingBox.min.z) {
      iteratedPoints++;
      if (point.x < leftEar.x) leftEar = point;
      else if (point.x > rightEar.x) rightEar = point;
        // }
      // }
    }
  }
  console.log(leftEar, rightEar);
  console.log("num points iterated: " + iteratedPoints);

  // const positions = new Float32Array([leftEar.x, leftEar.y, leftEar.z], [rightEar.x, rightEar.y, rightEar.z]);
  // const points = new THREE.BufferAttribute(positions, 3);

  // return ( 
  //   <points>
  //     <bufferGeometry 
  //       attach="attributes-position"
  //       {...points}
  //     />
  //     <pointsMaterial
  //       size={0.1}
  //       threshold={0.1}
  //       color={0xff00ff}
  //       sizeAttenuation={true}
  //     />
  //   </points>
  // )
}

const Model = (props) => {
  
  const [position, setPosition] = useState([]);
  const [renderSpecs, setRender] = useState(false);
  const [rotation, setRotation] = useState([]);

  // felice
  const feliceMtl = useLoader(MTLLoader, "felice.mtl");
  const feliceColor = useLoader(TextureLoader, "felice_0.png")
  const felice = useLoader(OBJLoader, "felice.obj", (loader) => {
    feliceMtl.preload();
    loader.setMaterials(feliceMtl);
  })
  console.log(felice);
  let felice_geom;
  felice.traverse(function(child) {
    if (child.geometry != undefined) 
      felice_geom = child.geometry;
  });
  felice_geom = preprocessMesh(felice_geom);
  const phi = Math.atan(felice_geom.boundingBox.max.z/felice_geom.boundingBox.max.x);
  console.log("felice geom: ", felice_geom);

  // spectacles
  const specsModel = useLoader(OBJLoader, "Body2.obj");
  let specs_geom;
  specsModel.traverse(function(child) {
    specs_geom = child.geometry;
  });
  specs_geom = preprocessMesh(specs_geom);
  const theta = Math.atan(specs_geom.boundingBox.max.z/specs_geom.boundingBox.max.y);
  // specs_geom.translate(0, 0, specs_geom.boundingBox.min.z);
  console.log(specs_geom.boundingBox);

  // gltf files
  // const gltf = useLoader(GLTFLoader, 'poly.glb')
  // let gltf_geom;
  // console.log(gltf);
  // gltf.scene.traverse(function(child) {
  //   if (child.geometry != null) {
  //     gltf_geom = child.geometry;
  //   }
  // });
  // gltf_geom = preprocessMesh(gltf_geom);
  // console.log("gltf geom", gltf_geom);
  
  function logPointerLocation(event) {
    console.log(event.point);
  } 

  function onClick(event) {
    console.log(event);
    console.log(specs_geom.boundingBox.min.z);
    setPosition([event.point.x, event.point.y , (event.point.z + 1) + (specs_geom.boundingBox.min.y * spec_scale)]);
    setRender(true);
  }

  if (!renderSpecs) {  
    // getEarPositions(felice_geom, position, specs_geom);
    return (
      <mesh onClick={onClick} rotation={[theta, theta/2, 0]} position={[0, 0, 0]} geometry={felice_geom} scale={scale}>
        <meshStandardMaterial
          map={feliceColor} 
        />
      </mesh>
      // <GltfModel onClick={onClick} />
      // <mesh position={[0, 0, 0]} geometry={gltf_geom} >
      //   <meshStandardMaterial attach="material" />
      // </mesh>
    )
  }
  else {
    // getEarPositions(felice_geom, position, specs_geom);
    console.log(`rendering spectacles at positon (${position})`)
    return (
      <>
      <mesh onClick={onClick} rotation={[theta, theta/2, 0]} position={[0, 0, 0]} geometry={felice_geom} scale={scale}>
        <meshStandardMaterial
          map={feliceColor} 
        />
      </mesh> 
      <GltfModel onClick={onClick} />
      <mesh onClick={logPointerLocation} rotation={[-Math.PI / 2 , 0, 0]} position={position} geometry={specs_geom} scale={spec_scale}>
        <meshStandardMaterial attach="material" color={0xff0000} /> {/*change material color here*/}
      </mesh> 
      </>
    )
  }
}

export default function App() {
  return (
    // <Canvas shadows >
    <Canvas camera={ { fov: 90, position: [0, 0, 300] } }>
    {/* <Canvas camera={ { fov: 90, position: [0, 0, 1] } }> */}
      <ambientLight />
      <primitive object={new THREE.AxesHelper(2)} />
      <Suspense fallback={null} >
          <Model />
          <OrbitControls />
      </Suspense>
    </Canvas>
  )
}

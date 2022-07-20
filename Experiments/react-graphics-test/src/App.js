import "./App.css";
import React, { Suspense, useState } from "react";

// three.js imports
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { DDSLoader } from "three-stdlib";
import GltfModel from "./GltfModel";
import Specs from "./Specs";
import FrameFront from "./FrameFront";
import FrameLeft from "./FrameLeft";
import FrameRight from "./FrameRight";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

let scale = 1;
let spec_scale = 1;

/**
 * 
 * @param {THREE.Group} object 
 * @returns {THREE.BufferGeometry}
 */
function removeWhiteSpace(object) {
  var center = new THREE.Vector3;
  object.computeBoundingBox();
  object.boundingBox.getCenter(center);
  object.translate(-1 * center.x, -1 * center.y, -1 * center.z);
  // object.rotateX(theta);
  object.boundingBox.getCenter(center);
  return object;
}

const Model = (props) => {
  
  const [position, setPosition] = useState([]);
  const [leftEar, setLeftEar] = useState([]);
  const [rightEar, setRightEar] = useState([]);
  const [renderSpecs, setRender] = useState(false);
  const [clicks, setClicks] = useState(1);
  const [rotation, setRotation] = useState([]);

  // felice
  const feliceMtl = useLoader(MTLLoader, "felice.mtl");
  const feliceColor = useLoader(TextureLoader, "felice_0.png")
  const felice = useLoader(OBJLoader, "felice.obj", (loader) => {
    feliceMtl.preload();
    loader.setMaterials(feliceMtl);
  })
  let felice_geom;
  felice.traverse(function(child) {
    if (child.geometry != undefined) 
      felice_geom = child.geometry;
  });
  felice_geom = removeWhiteSpace(felice_geom);
  const phi = Math.atan(felice_geom.boundingBox.max.z/felice_geom.boundingBox.max.x);
  // console.log("felice geom: ", felice_geom);

  // spectacles
  const specsModel = useLoader(OBJLoader, "Body2.obj");
  let specs_geom;
  specsModel.traverse(function(child) {
    specs_geom = child.geometry;
  });
  specs_geom = removeWhiteSpace(specs_geom);
  const theta = Math.atan(specs_geom.boundingBox.max.z/specs_geom.boundingBox.max.y);
  // specs_geom.translate(0, 0, specs_geom.boundingBox.min.z);
  // console.log(specs_geom.boundingBox);

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

  function onClick(event) {
    console.log(event);
    setClicks(clicks + 1);
    console.log(clicks);
    // setPosition([event.point.x, event.point.y , (event.point.z + 20) * spec_scale]);
    if (clicks % 3 == 1) {
      setPosition([event.point.x, event.point.y, (event.point.z + 10) * spec_scale]);
    } 
    else if (clicks % 3 == 2) {
      setLeftEar([event.point.x, event.point.y, event.point.z]);
      // setRender(true);
    }
    else if (clicks % 3 == 0) {
      setRightEar([event.point.x, event.point.y, event.point.z]);
      setRender(true);
    }
  }

  if (!renderSpecs) {  
    // getEarPositions(felice_geom, position, specs_geom);
    return (
      // hires artec scan
      // <mesh onClick={onClick} rotation={[theta, theta/2, 0]} position={[0, 0, 0]} geometry={felice_geom} scale={scale}>
      //   <meshStandardMaterial
      //     map={feliceColor} 
      //   />
      // </mesh>

      // lowres polycam scan
      <GltfModel position={[0,-150,0]} onClick={onClick} scale={1250} />
      // <>
      // <primitive object={new THREE.AxesHelper(100)} />
      // <Specs scale={spec_scale} position={[0, 0, 0]} leftPosition={leftEar} rightPosition={rightEar} preprocessor={removeWhiteSpace}/>
      // </>
    )
  }
  else {
    // getEarPositions(felice_geom, position, specs_geom);
    console.log(`rendering spectacles at positon (${position})`)
    return (
      // (-2 + phi/2)
      <>
        <GltfModel position={[0,-150,0]} onClick={onClick} scale={1250} />
        {/* <mesh onClick={onClick} rotation={[theta, theta/2, 0]} position={[0, 0, 0]} geometry={felice_geom} scale={scale}>
          <meshStandardMaterial
            map={feliceColor} 
          />
        </mesh> */}
        <primitive object={new THREE.AxesHelper(100)} />
        {/* <FrameFront position={position} rotation={[-Math.PI / 2, 2 * (-Math.PI / 180), -Math.PI / 2]} scale={spec_scale} />
        <FrameRight position={leftEar} rotation={[-Math.PI / 2, 2 * (-Math.PI / 180), -Math.PI / 2]} scale={spec_scale} /> */}
        <Specs scale={spec_scale} position={position} leftPosition={leftEar} rightPosition={rightEar} preprocessor={removeWhiteSpace}/>
        {/* 2 * (-Math.PI / 180) */}
      </>

      // hires artec scan
      // <>
      // <mesh onClick={onClick} rotation={[theta, theta/2, 0]} position={[0, 0, 0]} geometry={felice_geom} scale={scale}>
      //   <meshStandardMaterial
      //     map={feliceColor} 
      //   />
      // </mesh>

      // old specs model
      // <mesh onClick={logPointerLocation} rotation={[-Math.PI / 2 , 0, 0]} position={position} geometry={specs_geom} scale={spec_scale}>
      //   <meshStandardMaterial attach="material" color={0xff0000} /> 
      // </mesh>
      // </>
    )
  }
}

export default function App() {
  return (
    // <Canvas shadows >
    <Canvas camera={{ position: [0, 0, 400] }}>
      <ambientLight />
      <Suspense fallback={null} >
          <Model />
          <OrbitControls />
      </Suspense>
    </Canvas>
  )
}

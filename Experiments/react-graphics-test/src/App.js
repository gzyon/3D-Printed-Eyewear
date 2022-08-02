import "./App.css";
import React, { Suspense, useState } from "react";
import Slider from '@mui/material/Slider';

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
import { Button, Stack, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import AlignmentButtons from "./AlignmentButtons";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

let scale = 1;
// let spec_scale = 1;
// let renderSpecs = false;

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Model = (props) => {
  
  const [position, setPosition] = useState([]);
  const [leftEar, setLeftEar] = useState([]);
  const [rightEar, setRightEar] = useState([]);
  const [clicks, setClicks] = useState(1);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [spec_scale, setScale] = useState(1);
  const [renderSpecs, setRender] = useState(false);
  // const [camera, setCamera] = useState(new THREE.Vector3);

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

  function onClick(event) {
    console.log(event);
    setClicks(clicks + 1);
    console.log(clicks);
    // setPosition([event.point.x, event.point.y , (event.point.z + 20) * spec_scale]);
    if (clicks % 3 == 1) {
      setPosition([event.point.x, event.point.y, (event.point.z + 5) * spec_scale]);
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

  function getCameraDirection(event) {
    const cameraDirection = new THREE.Vector3();
    event.camera.getWorldDirection(cameraDirection);
    setCamera(cameraDirection);
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
      <>
      {/* <AlignmentButtons /> */}
      <GltfModel position={[0,-150,0]} onClick={onClick} scale={1250} rotation={rotation}/>
      {/* <primitive object={new THREE.AxesHelper(100)} /> */}
      {/* <primitive object={new THREE.AxesHelper(100)} />
      <Specs scale={spec_scale} position={[0, 0, 0]} leftPosition={leftEar} rightPosition={rightEar} preprocessor={removeWhiteSpace}/> */}
      </>
    )
  }
  else {
    // getEarPositions(felice_geom, position, specs_geom);
    // console.log(`rendering spectacles at positon (${position})`);
    // console.log("specs scale: " + spec_scale);
    return (
      <>
        <GltfModel position={[0,-150,0]} scale={1250} />
        {/* <mesh onClick={onClick} rotation={[theta, theta/2, 0]} position={[0, 0, 0]} geometry={felice_geom} scale={scale}>
          <meshStandardMaterial
            map={feliceColor} 
          />
        </mesh> */}
        <primitive object={new THREE.AxesHelper(100)} />
        {/* <FrameFront position={position} rotation={[-Math.PI / 2, 2 * (-Math.PI / 180), -Math.PI / 2]} scale={spec_scale} />
        <FrameRight position={leftEar} rotation={[-Math.PI / 2, 2 * (-Math.PI / 180), -Math.PI / 2]} scale={spec_scale} /> */}
        <Specs group_scale={props.x_value/145} scale={spec_scale} position={position} leftPosition={leftEar} rightPosition={rightEar} preprocessor={removeWhiteSpace}/>
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
  const [x_value, setXValue] = useState(145);
  const [yz_value, setYZValue] = useState(50);
  const changeXValue =(event, value) => {
    setXValue(value);
    console.log(value)
  }
  const changeYZValue =(event, value) => {
    setYZValue(value);
  }
  
  return (
    // <Canvas shadows >
    <div className='viewport'>
      <div className='canvas'>  
        <Canvas camera={{ position: [0, 0, 400] }}>
          <ambientLight />
          <Suspense fallback={null} >
              <Model x_value={x_value} yz_value={yz_value}/>
              <OrbitControls />
          </Suspense>
        </Canvas>
      </div>
      <div className='x_slider'>
        <Slider 
          value={x_value} 
          defaultValue={145}
          onChange={changeXValue} 
          min={136} 
          max={172} 
          valueLabelDisplay="auto"
          />
      </div>
      <div className='yz_slider'>
        <Slider value={yz_value} onChange={changeYZValue}/>
      </div>
    </div>
  )
}

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
import { Button, Stack, Paper, Box, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import AlignmentButtons from "./AlignmentButtons";
import ModelCanvas from "./ModelCanvas";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

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
  const [clicks, setClicks] = useState(1);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [spec_scale, setScale] = useState(1);

  // felice
  // const feliceMtl = useLoader(MTLLoader, "felice.mtl");
  // const feliceColor = useLoader(TextureLoader, "felice_0.png")
  // const felice = useLoader(OBJLoader, "felice.obj", (loader) => {
  //   feliceMtl.preload();
  //   loader.setMaterials(feliceMtl);
  // })
  // let felice_geom;
  // felice.traverse(function(child) {
  //   if (child.geometry != undefined) 
  //     felice_geom = child.geometry;
  // });
  // felice_geom = removeWhiteSpace(felice_geom);
  // const phi = Math.atan(felice_geom.boundingBox.max.z/felice_geom.boundingBox.max.x);
  // console.log("felice geom: ", felice_geom);

  // spectacles
  // const specsModel = useLoader(OBJLoader, "Body2.obj");
  // let specs_geom;
  // specsModel.traverse(function(child) {
  //   specs_geom = child.geometry;
  // });
  // specs_geom = removeWhiteSpace(specs_geom);
  // const theta = Math.atan(specs_geom.boundingBox.max.z/specs_geom.boundingBox.max.y);
  // specs_geom.translate(0, 0, specs_geom.boundingBox.min.z);
  // console.log(specs_geom.boundingBox);

  function onClick(event) {
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
      // props.setRender(true);
    }
  }

  if (!props.render) {  
    return (
      // hires artec scan
      // <mesh onClick={onClick} rotation={[theta, theta/2, 0]} position={[0, 0, 0]} geometry={felice_geom} scale={scale}>
      //   <meshStandardMaterial
      //     map={feliceColor} 
      //   />
      // </mesh>

      // lowres polycam scan
      <GltfModel position={[0,-150,0]} onClick={onClick} scale={1250} rotation={rotation}/>
    )
  }
  else {
    return (
      <>
        <GltfModel position={[0,-150,0]} onClick={onClick} scale={1250} />
        <primitive object={new THREE.AxesHelper(100)} />
        <Specs scale={spec_scale} position={position} leftPosition={leftEar} rightPosition={rightEar} preprocessor={removeWhiteSpace} setScale={setScale} />
      </>
    )
  }
}

export default function App() {
  const [renderSpecs, setRender] = useState(false);

  function confirmRender() {
    console.log("Rendering specs");
    setRender(true);
    
  }

  return (
    <Grid container sx={{width: '100%', height: '100%'}}>
      <Grid item xs={6}>
        <AlignmentButtons />
        <Button onClick={confirmRender} variant="outlined">
          Confirm Frame Positions
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Canvas camera={{ position: [0, 0, 400] }}>
          <ambientLight />
          <Suspense fallback={null}>
            <Model render={renderSpecs}/>
            <OrbitControls />
          </Suspense>
        </Canvas>
      </Grid>
    </Grid>
  )
}

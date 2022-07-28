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
import { Button, Stack, Paper, Box, Grid, Slider } from "@mui/material";
import { styled } from '@mui/material/styles';
import AlignmentButtons from "./AlignmentButtons";
import SpecParameters from "./SpecParameters";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

/**
 * 
 * @param {THREE.Group} object 
 * @returns {THREE.BufferGeometry}
 */
function removeWhiteSpace(object) {
  let center = new THREE.Vector3;
  object.computeBoundingBox();
  object.boundingBox.getCenter(center);
  object.translate(-1 * center.x, -1 * center.y, -1 * center.z);
  // object.rotateX(theta);
  object.boundingBox.getCenter(center);
  return object;
}

let position, leftEar, rightEar;
const Model = (props) => {
  // const [position, setPosition] = useState([]);
  // const [leftEar, setLeftEar] = useState([]);
  // const [rightEar, setRightEar] = useState([]);
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
    console.log(props.clicks);
    if (props.clicks <= 3) 
      props.setClicks(props.clicks + 1);
    // props.clicks += 1;
    // setPosition([event.point.x, event.point.y , (event.point.z + 20) * spec_scale]);
    if (props.clicks == 1) {
      props.positions.setFront([event.point.x, event.point.y, (event.point.z + 5) * spec_scale]);
      // position = [event.point.x, event.point.y, (event.point.z + 5) * spec_scale];
      // console.log(event.point.x, event.point.y, (event.point.z + 5) * spec_scale);
    } 
    else if (props.clicks == 2) {
      props.positions.setLeft([event.point.x, event.point.y, event.point.z]);
      // leftEar = [event.point.x, event.point.y, event.point.z];
      // console.log(event.point.x, event.point.y, event.point.z);
      // setRender(true);
    }
    else if (props.clicks == 3) {
      props.positions.setRight([event.point.x, event.point.y, event.point.z]);
      // rightEar = [event.point.x, event.point.y, event.point.z];
      // console.log(event.point.x, event.point.y, event.point.z);
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
    console.log(props.specsInfo)
    return (
      <>
        <GltfModel position={[0,-150,0]} onClick={onClick} scale={1250} />
        <primitive object={new THREE.AxesHelper(100)} />
        <Specs specsInfo={props.specsInfo} />
      </>
    )
  }
}

export default function App() {
  const [renderSpecs, setRender] = useState(false);
  const [clicks, setClicks] = useState(1);
  const [position, setPosition] = useState([]);
  const [leftEar, setLeftEar] = useState([]);
  const [rightEar, setRightEar] = useState([]);
  const [specsInfo, setSpecsInfo] = useState({});

  const [x_value, setXValue] = useState(145);
  const [yz_value, setYZValue] = useState(50);

  const changeXValue =(event, value) => {
    setXValue(value);
    console.log(value)
  }
  const changeYZValue =(event, value) => {
    setYZValue(value);
  }

  // load models
  let frame_front, frame_leftCenter, frame_leftEnd, frame_rightCenter, frame_rightEnd;
  frame_front = useLoader(OBJLoader, 'frame2/front.obj').children[0];
  frame_leftCenter = useLoader(OBJLoader, 'frame2/templeL_centre.obj').children[0];
  frame_leftEnd = useLoader(OBJLoader, 'frame2/templeL_end.obj').children[0];
  frame_rightCenter = useLoader(OBJLoader, 'frame2/templeR_centre.obj').children[0];
  frame_rightEnd = useLoader(OBJLoader, 'frame2/templeR_end.obj').children[0];

  // let specsInfo = {}
  function confirmRender() {
    console.log("Rendering specs");
    const frameFront = {frameModel: frame_front, position: position};
    const leftArm = {centerFrameModel: frame_leftCenter, endFrameModel: frame_rightCenter, position: leftEar};
    const rightArm = {centerFrameModel: frame_rightCenter, endFrameModel: frame_rightEnd, position: rightEar};
    setSpecsInfo(SpecParameters(frameFront, leftArm, rightArm));
    // console.log(specsInfo);
    setRender(true);
    
  }

  function resetClicks() {
    setClicks(1);
    setRender(false);
  }

  return (
    <Grid container sx={{width: '100%', height: '100%'}}>
      <Grid item xs={6}>
        <AlignmentButtons />
        <Button onClick={confirmRender} variant="outlined">
          Confirm Frame Positions
        </Button>
        <Button onClick={resetClicks} variant="outlined">
          Reset Frame Positions
        </Button>
        <Slider 
          value={x_value} 
          defaultValue={145}
          onChange={changeXValue} 
          min={136} 
          max={172} 
          valueLabelDisplay="auto"
          />
      </Grid>
      <Grid item xs={6}>
        <Canvas camera={{ position: [0, 0, 400] }}>
          <ambientLight />
          <Suspense fallback={null}>
            <Model render={renderSpecs} clicks={clicks} setClicks={setClicks} positions={{setFront: setPosition, setLeft: setLeftEar, setRight: setRightEar}} specsInfo={specsInfo}/>
            <OrbitControls />
          </Suspense>
        </Canvas>
      </Grid>
    </Grid>
  )
}

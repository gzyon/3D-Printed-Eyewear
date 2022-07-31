import React, { useState } from "react";
import GltfModel from "./GltfModel";
import Specs from "./Specs";
import * as THREE from "three";

const Model = (props) => {
    const [rotation, setRotation] = useState([0, 0, 0]);
    const [spec_scale, setScale] = useState(1);
  
    function onClick(event) {
      console.log(props.clicks);
      if (props.clicks <= 3) 
        props.setClicks(props.clicks + 1);
      if (props.clicks == 1) {
        props.positions.setFront([event.point.x, event.point.y, (event.point.z)]);
      } 
      else if (props.clicks == 2) {
        props.positions.setLeft([event.point.x, event.point.y, event.point.z]);
      }
      else if (props.clicks == 3) {
        props.positions.setRight([event.point.x, event.point.y, event.point.z]);
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
        // <Specs specsInfo={props.specsInfo} />
      )
    }
    else {
      console.log(props.specsInfo)
      return (
        <>
          <GltfModel position={[0,-150,0]} onClick={onClick} scale={1250} />
          <primitive object={new THREE.AxesHelper(100)} />
          <Specs specsInfo={props.specsInfo} customScale={props.customScale} />
        </>
      )
    }
  }

  export default Model;
import "./App.css";
import React, { Component, Suspense, useEffect, useState } from "react";

// three.js imports
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { PresentationControls, Stage } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { DDSLoader } from "three-stdlib";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const Model = (props) => {
  
  const [clicks, setClicks] = useState(0);
  const [position, setPosition] = useState(new THREE.Vector3());
  const [leftEye, setLeftEye] = useState(new THREE.Vector3());
  const [rightEye, setRightEye] = useState(new THREE.Vector3());
  const [renderSpecs, setRender] = useState(false);

  const feliceMtl = useLoader(MTLLoader, "felice.mtl");
  const feliceColor = useLoader(TextureLoader, "felice_0.png")
  const felice = useLoader(OBJLoader, "felice.obj", (loader) => {
    feliceMtl.preload();
    loader.setMaterials(feliceMtl);
  })

  // spectacles
  const specs = useLoader(OBJLoader, "Body2.obj");
  let specs_geom;
  specs.traverse( function(child) {
    if (child.geometry !== undefined) {
      specs_geom = child.geometry;
    }
  })

  function onClick(event) {
    console.log(event);
    // if (clicks === 0) {
    //   setClicks(clicks + 1);
    //   setLeftEye(event.intersections[0].point);
    //   console.log("Set left eye position:", leftEye);
    // } else if (clicks === 1) {
    //   setClicks(0);
    //   setRightEye(event.intersections[0].point);
    //   console.log("Set right eye position:", rightEye);
    //   setPosition((leftEye.add(rightEye)).divideScalar(2));
    //   setRender(true);
    //   alert(`Middle between left and right eye: (${position.x}, ${position.y}, ${position.z})`)
    // } 
    // console.log(`clicked ${clicks} times`);
    // setPosition(event.intersections[0].point);
    const intersection = event.intersections[0].point.transformDirection(event.camera.matrixWorld);
    setPosition(intersection);
    // alert(`User clicked (${intersection.x}, ${intersection.y}, ${intersection.z}), rendering specs at position (${position.x}, ${position.y}, ${position.z})`);
    setRender(true);
  }

  function logPointerLocation(event) {
    console.log(event.point);
  } 

  if (!renderSpecs) {
    return (
      <>
      <mesh onClick={onClick}>
        <primitive object={felice} {...props} />
        <meshStandardMaterial
          map={feliceColor} 
        />
      </ mesh>
      </>
    )
  } 
  else {
    alert(`rendering spectacles at positon (${position.x}, ${position.y}, ${position.z})`)
    return (
      <>
      <mesh onClick={onClick} position={[0, 0, 0]}>
        <primitive object={felice} {...props} />
        <meshStandardMaterial
          map={feliceColor} 
        />
      </mesh>
      <mesh position={position} scale={0.5} rotation={[-Math.PI / 2, 0, 0]} geometry={specs_geom}>
        <meshStandardMaterial attach="material" color={0xff0000} /> {/*change material color here*/}
      </mesh> 
      </>
    )
  }
}

export default function App() {
  return (
    <Canvas shadows >
      <Suspense fallback={null}>
      <color attach="background"  />
        <PresentationControls speed={1.5} polar={[-0.1, Math.PI / 4]}>
          <Stage environment={null} intensity={1} contactShadow={false} shadowBias={-0.0015}>
            <Model scale={0.5} />
          </Stage>
        </PresentationControls>
      </Suspense>
    </Canvas>
  )
}

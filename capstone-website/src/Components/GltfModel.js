/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from 'three'

export default function GltfModel({ ...props }) {
  // console.log(props);
  const group = useRef();
  const { nodes, materials } = useGLTF("/dharmesh.glb");
  // console.log(nodes, materials);
  const rotatedGeometry = nodes.mesh_0.geometry;
  // console.log(rotatedGeometry.boundingBox);
  const angle = Math.tan(rotatedGeometry.boundingBox.max.z / rotatedGeometry.boundingBox.max.x)
  // }
  return (
    // <group ref={group} dispose={null} {...props}>
      <mesh 
        {...props}
        rotation={[0, Math.PI + angle /2, 0]}
        castShadow
        receiveShadow
        geometry={rotatedGeometry}
        material={nodes.mesh_0.material}
      />
    // </group>
  );
}

useGLTF.preload("/poly.glb");
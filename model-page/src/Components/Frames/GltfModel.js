/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as React from "react";
import { useGLTF } from "@react-three/drei";

export default function GltfModel({ ...props }) {
  console.log(props);
  // const group = useRef();
  const { nodes, materials } = useGLTF("/fib.glb");
  console.log(nodes, materials)
  const rotatedGeometry = nodes.mesh_0.geometry;
  rotatedGeometry.computeVertexNormals();
  const mat = nodes.mesh_0.material;
  mat.flatShading = false;

  return (
    // <group ref={group} dispose={null} {...props}>
      <mesh 
        position={props.position}
        onClick={props.onClick}
        scale={props.scale}
        // {...props}
        rotation={[0, props.rotation, 0]}
        castShadow
        receiveShadow
        geometry={rotatedGeometry}
        material={nodes.mesh_0.material}
      />
    // </group>
  );
}

useGLTF.preload("/fib.glb");
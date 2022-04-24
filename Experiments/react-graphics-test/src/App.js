import "./App.css";
import React, { Component, Suspense } from "react";

// three.js imports
// import * as THREE from "three";
// import { Canvas } from "@react-three/fiber";
// import { useLoader } from "@react-three/fiber";
// import { Environment, OrbitControls } from "@react-three/drei";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
// import { TextureLoader } from 'three/src/loaders/TextureLoader'
// import { DDSLoader } from "three-stdlib";

// babylon.js imports
import '@babylonjs/inspector';
import { Engine, Scene, Model } from 'react-babylonjs';
import { Vector3, Color3 } from '@babylonjs/core';
import { ActionManager, SetValueAction } from '@babylonjs/core/Actions';
// import ScaledModelWithProgress from '../ScaledModelWithProgress';

// three.js

// THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

// const Scene = () => {
//   const materials = useLoader(MTLLoader, "yoshi.mtl");
//   const colorMap = useLoader(TextureLoader, 'yoshi_0.png')
//   const obj = useLoader(OBJLoader, "yoshi.obj", (loader) => {
//     materials.preload();
//     loader.setMaterials(materials);
//   });

//   console.log(obj);
//   return (
//   <>
//       <ambientLight intensity={0.2} />
//       <directionalLight />
//       <mesh>
//         {/* Width and height segments for displacementMap */}
//         <primitive object={obj} scale={0.5} />
//         <meshStandardMaterial
//           map={colorMap}
//         />
//       </mesh>
//     </>
//   )
// };

// export default function App() {
//   return (
//     <div className="App">
//       <Canvas>
//         <Suspense fallback={null}>
//           <Scene />
//           <OrbitControls autoRotate />
//           <Environment preset="sunset" background />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }

// babylonjs
export default { title: "Models" };
class WithModel extends Component {
  constructor() {
    super();

    this.state = {
      avocadoYPos: -1.5,
      avocadoScaling: 3.0,
    };

    this.moveAvocadoUp = this.moveAvocadoUp.bind(this);
    this.moveAvocadoDown = this.moveAvocadoDown.bind(this);
    this.increaseAvocadoSize = this.increaseAvocadoSize.bind(this);
    this.decreaseAvocadoSize = this.decreaseAvocadoSize.bind(this);
    this.onModelLoaded = this.onModelLoaded.bind(this);
  }

  moveAvocadoDown() {
    this.setState((state) => ({
      ...state,
      avocadoYPos: state.avocadoYPos - 0.5,
    }));
  }

  moveAvocadoUp() {
    this.setState((state) => ({
      ...state,
      avocadoYPos: state.avocadoYPos + 0.5,
    }));
  }

  increaseAvocadoSize() {
    this.setState((state) => ({
      ...state,
      avocadoScaling: state.avocadoScaling + 0.1,
    }));
  }

  decreaseAvocadoSize() {
    this.setState((state) => ({
      ...state,
      avocadoScaling: state.avocadoScaling - 0.1,
    }));
  }

  onModelLoaded = (model, sceneContext) => {
    let mesh = model.meshes[1];
    mesh.actionManager = new ActionManager(mesh._scene);
    mesh.actionManager.registerAction(
      new SetValueAction(
        ActionManager.OnPointerOverTrigger,
        mesh.material,
        "wireframe",
        true
      )
    );
    mesh.actionManager.registerAction(
      new SetValueAction(
        ActionManager.OnPointerOutTrigger,
        mesh.material,
        "wireframe",
        false
      )
    );
  };

  render() {
    let baseUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/'
    return (
      <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
        <Scene>
          <arcRotateCamera
            name="camera1"
            alpha={Math.PI / 2}
            beta={Math.PI / 2}
            radius={9.0}
            target={Vector3.Zero()}
            minZ={0.001}
          />
          <hemisphericLight
            name="light1"
            intensity={0.7}
            direction={Vector3.Up()}
          />

          {/* <ScaledModelWithProgress
            rootUrl={`${baseUrl}BoomBox/glTF/`}
            sceneFilename="BoomBox.gltf"
            scaleTo={3}
            progressBarColor={Color3.FromInts(255, 165, 0)}
            center={new Vector3(2.5, 0, 0)}
            onModelLoaded={this.onModelLoaded}
          /> */}

          <Suspense
            fallback={
              <boxnp
                name="fallback"
                position={new Vector3(-2.5, this.state.avocadoYPos, 0)}
              />
            }
          >
            <Model
              rootUrl={`${baseUrl}Avocado/glTF/`}
              sceneFilename="Avocado.gltf"
              scaleToDimension={this.state.avocadoScaling}
              position={new Vector3(-2.5, this.state.avocadoYPos, 0)}
            />
          </Suspense>
        </Scene>
      </Engine>
    );
  }
}

export const ModelStory = () => (
  <div style={{ flex: 1, display: "flex" }}>
    <WithModel />
  </div>
);

ModelStory.story = {
  name: "3D-Model",
};

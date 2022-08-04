import "./App.css";

// three.js imports
import * as THREE from "three";
import { DDSLoader } from "three-stdlib";
import ModelPage from "./Pages/ModelPage";
import CaseCustomisation from "./Pages/CaseCustomisation";

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

export default function App() {
  return(
    <></>
    // <CaseCustomisation />
  )
}

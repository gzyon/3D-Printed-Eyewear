import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useColor } from "react-color-palette";
import CaseModels from "../Components/Casing/CaseModels";
import CustomisationOptions from "../Components/Casing/CustomisationOptions";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const CaseCustomisation = (props) => {
    
    let caseCover1, caseCover2, baseCase;
    caseCover1 = useLoader(OBJLoader, "coverv2 linear.obj").children[0];
    caseCover2 = useLoader(OBJLoader, "cover v2 smooth.obj").children[0];
    baseCase = useLoader(OBJLoader, "base v3.obj").children[0];

    /**
     * 
     * @param {THREE.Mesh} object 
     * @returns 
     */
     function getGeometry(object) {
        let geom;
        object.traverse(function(child) {
            if (child.geometry != null) {
                geom = child.geometry;
            }
        });
        return geom;
    }

    /**
     * 
     * @param {THREE.BufferGeometry} geometry 
     * @param {Array} rotation 
     */
    function centraliseMesh(geometry) {
        geometry.computeBoundingBox();
        const center = new THREE.Vector3();
        geometry.boundingBox.getCenter(center);
        geometry.translate(-center.x, -center.y, -center.z);
        geometry.computeBoundingBox();
        return geometry;
    }

    let caseCover1geom, caseCover2geom, baseCaseGeom;
    caseCover1geom = centraliseMesh(getGeometry(caseCover1));
    caseCover2geom = centraliseMesh(getGeometry(caseCover2));
    baseCaseGeom = centraliseMesh(getGeometry(baseCase));

    const [caseComponent, setComponent] = useState(0);
    const [caseCoverColor, setCoverColor] = useColor("hex", "#ff0000");
    const [baseCaseColor, setBaseColor] = useColor("hex", "#ff0000");
    const [caseCover, setCase] = useState(caseCover1geom);
    const [coverMetalness, setCoverM] = useState(0);
    const [baseCaseMetalness, setBaseM] = useState(0);


    const changeComponent = (event, newValue) => {
        setComponent(newValue);
    } 

    function changeCase(event) {
        console.log(event);
        if (event.target.value === "Case 1") setCase(caseCover1geom);
        else if (event.target.value === "Case 2") setCase(caseCover2geom);
    }

    function adjustCoverMetalness(event, value) {
        setCoverM(value);
    }

    function adjustBaseMetalness(event, value) {
        setBaseM(value);
    }

    const variables = {caseComponent: caseComponent, caseCoverColor: caseCoverColor, baseCaseColor: baseCaseColor, coverMetalness: coverMetalness, baseCaseMetalness: baseCaseMetalness};
    const stateFunctions = {setComponent: changeComponent, setCoverColor: setCoverColor, setBaseColor: setBaseColor, changeCase: changeCase, adjustCoverMetalness: adjustCoverMetalness, adjustBaseMetalness: adjustBaseMetalness};

    return (
        <>
            <Grid container sx={{height: '100%', width: '90%'}} spacing={4} margin={3} >
                <Grid item xs={6}>
                    <CaseModels caseCoverColor={caseCoverColor} baseCaseColor={baseCaseColor} baseCase={baseCaseGeom} caseCover={caseCover} coverMetalness={coverMetalness} baseCaseMetalness={baseCaseMetalness} />
                </Grid>
                <Grid item xs={6}>
                    <CustomisationOptions variables={variables} stateFunctions={stateFunctions} />
                </Grid>
            </Grid>
        </>
    )
}

export default CaseCustomisation;
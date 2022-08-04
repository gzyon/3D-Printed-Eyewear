
import * as React from "react";
import { Box, Typography } from "@mui/material";
import ThreeScene from "../ThreeScene";

const CaseModels = (props) => {

    const modelInfo = [
        {
            title: 'Case Cover', 
            geometry: props.caseCover,
            color: props.caseCoverColor.hex,
            scale: 0.05,
            metalness: props.coverMetalness
        },
        {
            title: 'Base Case', 
            geometry: props.baseCase,
            color: props.baseCaseColor.hex,
            scale: 0.05,
            metalness: props.baseCaseMetalness
        },
    ];

    let models;
    for (let i=0; i<modelInfo.length; i++) {
        modelInfo[i].mesh = (
            <mesh geometry={modelInfo[i].geometry} scale={modelInfo[i].scale}>
                <meshStandardMaterial attach="material" color={modelInfo[i].color} metalness={modelInfo[i].metalness} /> 
            </mesh>
        )
        console.log(modelInfo[i]);
    }

    models = modelInfo.map((model) => (
        <>
            <Typography align="center">
                {model.title}
            </Typography>
            <Box sx={{border: 1}}>
                <ThreeScene model={model.mesh} />
            </Box>
        </>
    ))

    return(
        <Box sx={{height: '100%'}}>
            {models}
        </Box>
    )
}

export default CaseModels;
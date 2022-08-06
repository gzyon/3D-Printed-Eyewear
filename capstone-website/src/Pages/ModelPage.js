import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { Stack, Grid, Typography, Box } from "@mui/material";
import PositioningPanel from "../Components/Frames/Positioning/PositioningPanel";
import CustomisationPanel from "../Components/Frames/Customisation/CustomisationPanel";

import React, { Suspense, useState, useEffect } from "react";
import {
    useLocation
  } from "react-router-dom";
import Model from "../Components/Frames/Model";
import { useColor } from "react-color-palette";
import ThreeScene from "../Components/ThreeScene";

// main page displaying everything including models + customisation features
const ModelPage = (props) => {

    let location = useLocation();
    const weightPredictions = location.state;
    // console.log(weightPredictions['lower']);

    // positioning info
    const [renderSpecs, setRender] = useState(false);
    const [clicks, setClicks] = useState(1);
    const [position, setPosition] = useState([]);
    const [leftEar, setLeftEar] = useState([]);
    const [rightEar, setRightEar] = useState([]);
    const [rotation, setRotation] = useState(0);

    // customisation info
    const [x_value, setXValue] = useState(1);
    const [yz_value, setYZValue] = useState(1);
    const [leftLength, setLeftLength] = useState(1);
    const [rightLength, setRightLength] = useState(1);
    const [color, setColor] = useColor("hex", "#ff0000");
    const [leftColor, setLeftColor] = useColor("hex", "#ff0000");
    const [rightColor, setRightColor] = useColor("hex", "#ff0000");
    const [component, setComponent] = useState(0);
    const [frameMetalness, setMetalness] = useState([0, 0, 0]);
    const [wireframeStatus, setWireframe] = useState(false);

    // load models
    let frame1_front, frame_leftCenter, frame_leftEnd, frame_rightCenter, frame_rightEnd, frame2_front, frame3_front;
    frame_leftCenter = useLoader(OBJLoader, 'frame2/templeL_centre.obj').children[0];
    frame_leftEnd = useLoader(OBJLoader, 'frame2/templeL_end.obj').children[0];
    frame_rightCenter = useLoader(OBJLoader, 'frame2/templeR_centre.obj').children[0];
    frame_rightEnd = useLoader(OBJLoader, 'frame2/templeR_end.obj').children[0];

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState("https://storage.googleapis.com/download/storage/v1/b/olive-eyewear-and-wellness-bucket/o/frame1.obj?generation=1659432676012813&alt=media");

    // frame information
    const [frameid, setFrameId] = useState(1);
    const [frameFront, setFrame] = useState({frameModel: items});
    const [frameWeight, setFrameWeight] = useState(16.8);
    const front = {frameId: frameid, frameModel: items.mediaLink, position: position};
    const leftArm = {centerFrameModel: frame_leftCenter, endFrameModel: frame_leftEnd, position: leftEar};
    const rightArm = {centerFrameModel: frame_rightCenter, endFrameModel: frame_rightEnd, position: rightEar};
    const customisations = {frontScale: [x_value, yz_value], frontColor: color, leftScale: leftLength, leftColor: leftColor, rightScale: rightLength, rightColor: rightColor, metalness: frameMetalness, wireframeStatus: wireframeStatus};

    // customisation functions
    const changeXValue =(event, value) => {
        setXValue(value);
        console.log(value)
    }
    
    const changeYZValue =(event, value) => {
        setYZValue(value);
    }

    const changeLeftLength = (event, value) => {
        setLeftLength(value);
    }

    const changeRightLength = (event, value) => {
        setRightLength(value);
    }

    const handleComponentChange = (event, newValue) => {
        setComponent(newValue);
    };

    const adjustMetalness = (event, value) => {
        if (component === 0) setMetalness([value, frameMetalness[1], frameMetalness[2]]);
        else if (component === 1) setMetalness([frameMetalness[0], value, frameMetalness[2]]);
        else if (component === 2) setMetalness([frameMetalness[0], frameMetalness[1], value]);
    }

    const handleWireframe = (event) => {
        setWireframe(event.target.checked);
    }

    // render functions
    function confirmRender() {
        console.log("Rendering specs at: " + front.position);
        setRender(true);
    }

    function resetClicks() {
        setClicks(1);
        setPosition([]);
        setLeftEar([]);
        setRightEar([]);
        setRender(false);
    }

    // props to customise spectacles
    const specs = {
        eventFunctions: {changeXValue: changeXValue, changeYZValue: changeYZValue, changeFrame: changeFrame, setFrame: setFrame, setColor: setColor, setComponent: handleComponentChange, changeLeftLength: changeLeftLength, changeRightLength: changeRightLength, setLeftColor: setLeftColor, setRightColor: setRightColor, setMetalness: adjustMetalness, setWireframe: handleWireframe},
        scaling: {xVal: x_value, yzVal: yz_value, component: component, leftLength: leftLength, rightLength: rightLength, leftColor: leftColor, rightColor: rightColor, color: color, metalness: frameMetalness},
        frontFrames: {design1: frame1_front, design2: frame2_front, design3: frame3_front}
    }

    // props to render head model
    const modelProps = {
        variables: {render: renderSpecs, clicks: clicks, frameFront: frameFront, leftArm: leftArm, rightArm: rightArm},
        functions: {setFront: setPosition, setLeft: setLeftEar, setRight: setRightEar, setFrame: setFrame, setClicks: setClicks},
        specCustomisations: customisations
    }

    const faceSpecModel = (
        <Model modelProps={modelProps} specsInfo={{frameFront: front, leftArm: leftArm, rightArm: rightArm, component: component}} rotation={rotation} setFrameWeight={setFrameWeight} />
    )

    useEffect(() => {
        fetch("http://localhost:8001/frame/"+frameid)
            .then(res => res.json())
            .then(
                (result) => {
                setIsLoaded(true);
                setItems(result);
                console.log("here is the result" + result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                setIsLoaded(true);
                setError(error);
                }
            )
        },[frameid])

        

    function changeFrame(event) {
        console.log(event);
        if (event.target.value === "Frame 1") setFrameId(1);
        else if (event.target.value === "Frame 2") setFrameId(2);
        else if (event.target.value === "Frame 3") setFrameId(3);
    }

    if (!renderSpecs) {
        return (
            <Grid container sx={{height: '90%', width: '90%'}} margin={3} >
                <Grid item xs={8}>
                    <Box sx={{height: '90%', width: '90%'}} margin={3}>
                        <ThreeScene position={[0, 0, 300]} model={faceSpecModel} />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    {/* <Stack spacing={2}> */}
                        <PositioningPanel confirmRender={confirmRender} resetClicks={resetClicks} setRotation={setRotation} rotation={rotation} />
                    {/* </Stack> */}
                </Grid>
            </Grid>
        )
    }
    else {
        return (
            <Grid container sx={{height: '90%', width: '90%'}} margin={3}>
                <Grid item xs={8}>
                    <Box sx={{height: '80%', width: '90%'}} margin={3}>                    
                        <ThreeScene position={[0, 0, 300]} model={faceSpecModel} /> 
                    </Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 20 }} m={3} align="center">
                        Frame Weight Comfort Rating: {frameWeight < weightPredictions['upper'] && frameWeight > weightPredictions['lower'] ? "Comfortable" : "Not Comfortable"}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{height: '80%'}}>
                        <CustomisationPanel specDetails={specs} resetClicks={resetClicks} />
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default ModelPage;
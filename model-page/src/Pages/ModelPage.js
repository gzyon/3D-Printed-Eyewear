import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { Stack, Grid, Typography, Box } from "@mui/material";
import PositioningPanel from "../Components/Frames/Positioning/PositioningPanel";
import CustomisationPanel from "../Components/Frames/Customisation/CustomisationPanel";

import React, { Suspense, useState } from "react";
import Model from "../Components/Frames/Model";
import { useColor } from "react-color-palette";
import ThreeScene from "../Components/ThreeScene";

// main page displaying everything including models + customisation features
const ModelPage = (props) => {
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
    frame1_front = useLoader(OBJLoader, 'frame2/front.obj').children[0];
    frame2_front = useLoader(OBJLoader, '145frame2.obj').children[0];
    frame3_front = useLoader(OBJLoader, "frame3.obj").children[0];
    frame1_front.name = "frame 1";
    frame2_front.name = "frame 2";
    frame3_front.name = "frame 3";

    // frame_leftCenter = useLoader(OBJLoader, 'templeL_spring_bent.obj').children[0];
    frame_leftCenter = useLoader(OBJLoader, 'frame2/templeL_centre.obj').children[0];
    frame_leftEnd = useLoader(OBJLoader, 'frame2/templeL_end.obj').children[0];
    // frame_rightCenter = useLoader(OBJLoader, 'templeR_spring_bent.obj').children[0];
    frame_rightCenter = useLoader(OBJLoader, 'frame2/templeR_centre.obj').children[0];
    frame_rightEnd = useLoader(OBJLoader, 'frame2/templeR_end.obj').children[0];

    // frame information
    const [frameFront, setFrame] = useState({frameModel: frame1_front});
    const front = {frameModel: frameFront.frameModel, position: position};
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

    const adjustMetalness = (event, value) => {
        if (component === 0) {
            console.log("setting front frame metalness value to " + value);
            setMetalness([value, frameMetalness[1], frameMetalness[2]]);
        }
        else if (component === 1) {
            console.log("setting front frame metalness value to " + value);
            setMetalness([frameMetalness[0], value, frameMetalness[2]]);
        }
        else if (component === 2) {
            console.log("setting front frame metalness value to " + value);
            setMetalness([frameMetalness[0], frameMetalness[1], value]);
        }
    }

    const handleWireframe = (event) => {
        console.log(event.target.checked);
        setWireframe(event.target.checked);
    }

    const handleComponentChange = (event, newValue) => {
        setComponent(newValue);
    };

    function changeFrame(event) {
        console.log(event);
        if (event.target.value === "Frame 1") setFrame({frameModel: frame1_front});
        else if (event.target.value === "Frame 2") setFrame({frameModel: frame2_front});
        else if (event.target.value === "Frame 3") setFrame({frameModel: frame3_front});
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
        <Model modelProps={modelProps} specsInfo={{frameFront: front, leftArm: leftArm, rightArm: rightArm, component: component}} rotation={rotation} />
    )

    if (!renderSpecs) {
        return (
            <Grid container sx={{height: '90%', width: '90%'}} margin={3} >
                <Grid item xs={8}>
                    <Box sx={{height: '80%', width: '90%'}} margin={3}>
                        <ThreeScene position={[0, 0, 300]} model={faceSpecModel} />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Stack spacing={2}>
                        <PositioningPanel confirmRender={confirmRender} resetClicks={resetClicks} setRotation={setRotation} rotation={rotation} />
                    </Stack>
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
                        Frame Weight Comfort Rating: 8/10
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
import { Canvas, render, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { Stack, Grid } from "@mui/material";
import SpecParameters from "./SpecParameters";
import PositioningPanel from "./Components/Positioning/PositioningPanel";
import CustomisationPanel from "./Components/Customisation/CustomisationPanel";

import React, { Suspense, useState } from "react";
import Model from "./Components/Model";

const ModelPage = (props) => {
    // positioning info
    const [renderSpecs, setRender] = useState(false);
    const [clicks, setClicks] = useState(1);
    const [position, setPosition] = useState([]);
    const [leftEar, setLeftEar] = useState([]);
    const [rightEar, setRightEar] = useState([]);

    // customisation info
    const [x_value, setXValue] = useState(1);
    const [yz_value, setYZValue] = useState(1);
    // const []

    // specs calculations
    const [specsInfo, setSpecsInfo] = useState({});

    // customisation functions
    const changeXValue =(event, value) => {
        setXValue(value);
        console.log(value)
    }
    const changeYZValue =(event, value) => {
        setYZValue(value);
    }

    // load models
    let frame1_front, frame_leftCenter, frame_leftEnd, frame_rightCenter, frame_rightEnd, frame2_front, frame3_front;
    frame1_front = useLoader(OBJLoader, 'frame2/front.obj').children[0];
    frame2_front = useLoader(OBJLoader, '145frame2.obj').children[0];
    frame3_front = useLoader(OBJLoader, "frame3.obj").children[0];

    frame_leftCenter = useLoader(OBJLoader, 'frame2/templeL_centre.obj').children[0];
    frame_leftEnd = useLoader(OBJLoader, 'frame2/templeL_end.obj').children[0];
    frame_rightCenter = useLoader(OBJLoader, 'frame2/templeR_centre.obj').children[0];
    frame_rightEnd = useLoader(OBJLoader, 'frame2/templeR_end.obj').children[0];

    // 
    function confirmRender() {
        console.log("Rendering specs");
        const frameFront = {frameModel: frame1_front, position: position};
        const leftArm = {centerFrameModel: frame_leftCenter, endFrameModel: frame_leftEnd, position: leftEar};
        const rightArm = {centerFrameModel: frame_rightCenter, endFrameModel: frame_rightEnd, position: rightEar};
        setSpecsInfo(SpecParameters(frameFront, leftArm, rightArm));
        setRender(true);
    }

    function resetClicks() {
        setClicks(1);
        setPosition([]);
        setLeftEar([]);
        setRightEar([]);
        setRender(false);
    }

    if (!renderSpecs) {
        return (
            <Grid container sx={{height: '100%'}}>
                <Grid item xs={8}>
                    <Canvas camera={{ position: [0, 0, 600] }}>
                        <ambientLight />
                        <Suspense fallback={null}>
                        <Model render={renderSpecs} clicks={clicks} setClicks={setClicks} positions={{setFront: setPosition, setLeft: setLeftEar, setRight: setRightEar}} specsInfo={specsInfo} customScale={{xScale: x_value, yzScale: yz_value}}/>
                        {/* <Frame2 geometry={frame2_front} /> */}
                        <OrbitControls />
                        </Suspense>
                    </Canvas>
                    </Grid>
                    <Grid item xs={4}>
                    <Stack spacing={2}>
                        <PositioningPanel confirmRender={confirmRender} resetClicks={resetClicks} />
                    </Stack>
                </Grid>
            </Grid>
        )
    }
    else {
        return (
            <Grid container sx={{height: '100%'}}>
                <Grid item xs={8}>
                    <Canvas camera={{ position: [0, 0, 600] }}>
                    <ambientLight />
                    <Model render={renderSpecs} clicks={clicks} setClicks={setClicks} positions={{setFront: setPosition, setLeft: setLeftEar, setRight: setRightEar}} specsInfo={specsInfo} customScale={{xScale: x_value, yzScale: yz_value}}/>
                    {/* <Frame2 geometry={frame2_front} /> */}
                    <OrbitControls />
                    </Canvas>
                </Grid>
                <Grid item xs={4}>
                    <CustomisationPanel xVal={x_value} changeXValue={changeXValue} yzVal={yz_value} changeYZValue={changeYZValue} resetClicks={resetClicks} />
                </Grid>
            </Grid>
        )
    }
}

export default ModelPage;
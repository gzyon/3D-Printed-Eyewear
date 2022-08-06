import { Button, Grid, Stack } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import FrameSelection from "./FrameSelection";
import ScalingOptions from "./ScalingOptions";

const CustomisationPanel = (props) => {

    console.log(props);

    const specScaling = props.specDetails.scaling;
    const specFrames = props.specDetails.frontFrames;
    const eventFunctions = props.specDetails.eventFunctions;

    const customisedValues = {xVal: specScaling.xVal, yzVal: specScaling.yzVal, leftLength: specScaling.leftLength, rightLength: specScaling.rightLength, frontColor: specScaling.color, leftColor: specScaling.leftColor, rightColor: specScaling.rightColor, component: specScaling.component, metalness: specScaling.metalness};

    const setStateFunc = {changeXValue: eventFunctions.changeXValue, changeYZValue: eventFunctions.changeYZValue, setComponent: eventFunctions.setComponent, changeLeftLength: eventFunctions.changeLeftLength, changeRightLength: eventFunctions.changeRightLength, changeColor: eventFunctions.setColor, changeLeftColor: eventFunctions.setLeftColor, changeRightColor: eventFunctions.setRightColor, setMetalness: eventFunctions.setMetalness, setWireframe: eventFunctions.setWireframe};
    const navigate = useNavigate();

    function onClick() {
        console.log("next step")
        navigate("/case");
    }

    return ( 
        <Stack spacing={2} padding={2}>
            <FrameSelection updateFrames={eventFunctions.changeFrame} />
            <ScalingOptions customisedValues={customisedValues} setStateFunc={setStateFunc}/>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Button onClick={props.resetClicks} variant="outlined">
                        Reset Frame Positions
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={onClick} variant="outlined">
                        Next Step: Case Customisation
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default CustomisationPanel;
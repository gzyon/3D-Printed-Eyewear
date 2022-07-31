import { Button, Slider, Stack, Typography } from "@mui/material";
import * as React from "react";
import FrameSelection from "./FrameSelection";
import ScalingOptions from "./ScalingOptions";
import SpecColour from "./SpecColour";

const CustomisationPanel = (props) => {

    const specScaling = props.specDetails.scaling;
    const specFrames = props.specDetails.frontFrames;
    const eventFunctions = props.specDetails.eventFunctions;

    return (
        <Stack spacing={2} padding={2}>
            <FrameSelection updateFrames={eventFunctions.changeFrame} />
            <ScalingOptions xVal={specScaling.xVal} changeXValue={eventFunctions.changeXValue} yzVal={specScaling.yzVal} changeYZValue={eventFunctions.changeYZValue} />\
            <SpecColour />
            <Button onClick={props.resetClicks} variant="outlined">
                Reset Frame Positions
            </Button>
        </Stack>
    )
}

export default CustomisationPanel;
import { Button, Slider, Stack, Typography } from "@mui/material";
import * as React from "react";
import FrameSelection from "./FrameSelection";
import ScalingOptions from "./ScalingOptions";
import SpecColour from "./SpecColour";

const CustomisationPanel = (props) => {
    return (
        <Stack spacing={2} padding={2}>
            <FrameSelection />
            <ScalingOptions xVal={props.xVal} changeXValue={props.changeXValue} yzVal={props.yzVal} changeYZValue={props.changeYZValue} />\
            <SpecColour />
            <Button onClick={props.resetClicks} variant="outlined">
                Reset Frame Positions
            </Button>
        </Stack>
    )
}

export default CustomisationPanel;
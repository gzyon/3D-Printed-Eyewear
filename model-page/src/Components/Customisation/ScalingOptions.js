import { Slider, Typography } from "@mui/material";
import * as React from "react";

const ScalingOptions = (props) => {
    return (
        <>
        <Typography align='center' color="white">
            Horizontal Scaling (Front)
        </Typography>
        <Slider 
            value={props.xVal} 
            defaultValue={1}
            onChange={props.changeXValue} 
            min={0} 
            max={5} 
            step={0.01}
            valueLabelDisplay="auto"
        />
        <Typography align='center' color="white">
            Vertical Scaling (Front)
        </Typography>
        <Slider 
            value={props.yzVal} 
            onChange={props.changeYZValue}
            defaultValue={1}
            min={0} 
            max={5} 
            step={0.01}
            valueLabelDisplay="auto"
        />
        <Typography align='center' color="white">
            Length of Left Arm
        </Typography>
        <Slider 
            value={props.yzVal} 
            onChange={props.changeYZValue}
            defaultValue={1}
            min={0} 
            max={5} 
            step={0.01}
            valueLabelDisplay="auto"
        />
        <Typography align='center' color="white">
            Length of Right Arm
        </Typography>
        <Slider 
            value={props.yzVal} 
            onChange={props.changeYZValue}
            defaultValue={1}
            min={0} 
            max={5} 
            step={0.01}
            valueLabelDisplay="auto"
        />
        </>
    )
}

export default ScalingOptions;
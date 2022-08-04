import { Typography } from "@mui/material";
import * as React from "react";
import { ColorPicker } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const ComponentColour = (props) => {

    console.log(props);

    return (
        <>
        <Typography align='center' >
            Component Colour
        </Typography>
        <ColorPicker width={456} height={200}
            color={props.color}
            onChange={props.changeColor} hideHSV dark
        />
        </>
    )
}

export default ComponentColour;
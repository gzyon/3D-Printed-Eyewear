import { Typography } from "@mui/material";
import * as React from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const SpecColour = (props) => {

    console.log(props);

    return (
        <>
        <Typography align='center' color="white">
            Front Frame Colour
        </Typography>
        <ColorPicker width={456} height={228}
            color={props.color}
            onChange={props.changeColor} hideHSV dark
        />
        </>
    )
}

export default SpecColour;
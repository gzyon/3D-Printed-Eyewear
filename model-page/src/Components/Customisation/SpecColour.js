import { Typography } from "@mui/material";
import * as React from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const SpecColour = (props) => {
    const [color, setColor] = useColor("hex", "#121212");

    return (
        <>
        <Typography align='center' color="white">
            Front Frame Colour
        </Typography>
        <ColorPicker width={456} height={228}
            color={color}
            onChange={setColor} hideHSV dark
        />
        </>
    )
}

export default SpecColour;
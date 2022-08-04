import { Button, Divider, Grid, Typography } from "@mui/material";
import * as React from "react";
import AlignmentButtons from "./AlignmentButtons";

const PositioningPanel = (props) => {
    return(
        <>
        <AlignmentButtons setRotation={props.setRotation} rotation={props.rotation} />
        <Divider variant="middle" />
        <Typography align='center' >
            2. Positioning the frames (Click on the points located between the eyebrows and just before the ears)
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Button onClick={props.confirmRender} variant="outlined">
                    Confirm Frame Positions
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={props.resetClicks} variant="outlined">
                    Reset Frame Positions
                </Button>
            </Grid>
        </Grid>
        </>
    )
}

export default PositioningPanel;
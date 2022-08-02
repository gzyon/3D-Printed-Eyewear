import { Button, Grid } from "@mui/material";
import * as React from "react";
import AlignmentButtons from "./AlignmentButtons";

const PositioningPanel = (props) => {
    return(
        <>
        <AlignmentButtons />
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
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import * as React from "react";

const FrameSelection = (props) => {
    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <Typography align='center' >
                        Frame Selection:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Frame Selection</InputLabel>
                            <Select
                            defaultValue={"Frame 1"}
                            // value={props.frame}
                            label="Frame Selection"
                            onChange={props.updateFrames}
                            >
                                <MenuItem value={"Frame 1"}>Frame 1</MenuItem>
                                <MenuItem value={"Frame 2"}>Frame 2</MenuItem>
                                <MenuItem value={"Frame 3"}>Frame 3</MenuItem>
                            </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container>
                {/* frame images */}
            </Grid>
        </>
    )
}

export default FrameSelection;
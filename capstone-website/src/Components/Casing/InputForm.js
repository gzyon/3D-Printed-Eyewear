import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";

const InputForm = (props) => {
    return (
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography align="center">
                        Enter the text you want engraved on the casing:
                    </Typography>
                    <TextField
                    alignContent="center"
                    label="Engraved Text"
                    placeholder="Oliver"
                    multiline
                    variant="filled"
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography align="center">
                        Select the design of case cover:
                    </Typography>
                    <FormControl fullWidth>
                        <InputLabel>Case Cover</InputLabel>
                            <Select
                            defaultValue={"Frame 1"}
                            // value={props.frame}
                            label="Case Cover"
                            onChange={props.changeCase}
                            >
                                <MenuItem value={"Case 1"}>Case 1</MenuItem>
                                <MenuItem value={"Case 2"}>Case 2</MenuItem>
                            </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Button>
                Submit Customisations
            </Button>
      </Box>
    )
}

export default InputForm;
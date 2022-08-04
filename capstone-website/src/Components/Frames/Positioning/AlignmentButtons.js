import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Slider, Typography } from '@mui/material';

const AlignmentButtons = (props) => {

    const handleChange = (event, newValue) => {
        props.setRotation(newValue);
    }
    
    return (
    <>
        <Box sx={{ width: '100%' }} alignItems="center" justifyContent="center">
            <Stack spacing={2}>
                <Typography align='center' >
                    1. Face Direction (Select the direction that the face mesh is facing)
                </Typography>
                <Slider 
                    value={props.rotation} 
                    onChange={handleChange}
                    defaultValue={0}
                    min={-Math.PI} 
                    max={Math.PI} 
                    step={0.01}
                    valueLabelDisplay="auto"
                />
            </Stack>
        </Box>
    </>
    );
}

export default AlignmentButtons;
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button, Grid, Typography } from '@mui/material';

const AlignmentButtons = (props) => {
    
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));
    
    return (
    <>
        <Box sx={{ width: '100%' }} alignItems="center" justifyContent="center">
            <Stack spacing={2}>
                <Typography align='center' color="white">
                    1. Face Direction (Select the direction that the face mesh is facing)
                </Typography>
                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                    <Grid item sx={4}>
                        <Button onClick={() => {props.setRotation([1, 0, "perpendicular"])}} variant='outlined'>Left</Button>
                    </Grid>
                    <Grid item sx={4}>
                        <Button onClick={() => {props.setRotation([-1, 0, "perpendicular"])}} variant='outlined'>Right</Button>
                    </Grid>
                    <Grid item sx={4}>
                        <Button onClick={() => {props.setRotation([-1, -1, "diagonal"])}} variant='outlined'>Back Left</Button>
                    </Grid>
                    <Grid item sx={4}>
                        <Button onClick={() => {props.setRotation([1, 1, "diagonal"])}} variant='outlined'>Back Right</Button>
                    </Grid>
                    <Grid item sx={4}>
                        <Button onClick={() => {props.setRotation([0, 1, "diagonal"])}} variant='outlined'>Front Left</Button>
                    </Grid>
                    <Grid item sx={4}>
                        <Button onClick={() => {props.setRotation([0, -1, "diagonal"])}} variant='outlined'>Front Right</Button>
                    </Grid>
                </Grid>
                {/* <Button margin={5} variant="contained">Align Head Rotation</Button> */}
            </Stack>
        </Box>
    </>
    );
}

export default AlignmentButtons;
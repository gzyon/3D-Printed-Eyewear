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
                    Face Direction
                </Typography>
                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                    <Grid item sx={6}>
                        <Button variant='outlined'>Left</Button>
                    </Grid>
                    <Grid item sx={6}>
                        <Button variant='outlined'>Right</Button>
                    </Grid>
                </Grid>
                <Typography align='center' color="white">
                    Alignment
                </Typography>
                <Grid container alignItems="center" justifyContent="center" spacing={1}>
                    <Grid item sx={4}>
                        <Button variant='outlined'>Perpendicular</Button>
                    </Grid>
                    <Grid item sx={4}>
                        <Button variant='outlined'>Diagonally Left</Button>
                    </Grid>
                    <Grid item sx={4}>
                        <Button variant='outlined'>Diagonally Right</Button>
                    </Grid>
                </Grid>
                <Button margin={5} variant="contained">Recenter</Button>
            </Stack>
        </Box>
    </>
    );
}

export default AlignmentButtons;
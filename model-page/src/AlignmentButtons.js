import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';

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
        <Box sx={{ width: '50%', height:'50%' }} justifyContent="flex-end">
            <Stack spacing={2}>
                <Typography align='center' color="white">
                    Face Direction
                </Typography>
                <Item>
                    <Button>Left</Button>
                    <Button>Right</Button>
                </Item>
                <Typography align='center' color="white">
                    Alignment
                </Typography>
                <Item>
                    <Button>Perpendicular</Button>
                    <Button>Diagonally Left</Button>
                    <Button>Diagonally Right</Button>
                </Item>
                <Button margin={5} variant="outlined">Recenter</Button>
            </Stack>
        </Box>
    </>
    );
}

export default AlignmentButtons;
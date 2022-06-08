import { Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { styled } from '@mui/material'
import { Paper } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import Header from '../Components/Header'
import Abc from '@mui/icons-material/Abc'
import { Button } from '@mui/material'
import { Divider } from '@mui/material'
import { List } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemText } from '@mui/material'

const HomePage = () => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }))

    return (
        <>
            <Header />

            <Box display="flex" justifyContent="center">
                <Box
                    sx={{ width: 0.8, border: 1, m: 3 }}
                    display="flex"
                    justifyContent="center"
                >
                    <Grid container spacing={2} columns={16}>
                        <Grid
                            item
                            xs={8}
                            display="flex"
                            justifyContent={'right'}
                            alignItems="center"
                        >
                            <Box>
                                <Typography variant="h6" component="div" m={1}>
                                    Product summary that accentuates how our product would provide
                                    better comfort
                                </Typography>
                                <Button m={1}>Try It Now</Button>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={8}
                            display="flex"
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Abc fontSize="large" /> {/* replace with own image later */}
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Divider variant="middle" />

            <Typography
                variant="h5"
                component="div"
                m={3}
                display="flex"
                justifyContent="center"
            >
                Summary of what we want to achieve: Comfort, Customisability,
                Convenience
            </Typography>
            <Typography
                variant="h6"
                component="div"
                m={2}
                display="flex"
                justifyContent="center"
            >
                Description of current problems faced by our user and the motivation of
                why our product is needed
            </Typography>

            <Divider variant="middle" />

            <Box m={3} display="flex" justifyContent="center">
                <Grid sx={{ width: 0.8, m: 2 }} spacing={3} container>
                    <Grid
                        item
                        xs
                        display="flex"
                        justifyContent={'left'}
                        alignItems="center"
                    >
                        <Typography>Thing 1</Typography>
                    </Grid>
                    {/* <Grid item xs> */}
                    <Divider orientation="vertical" variant="middle" flexItem />
                    {/* </Grid> */}
                    <Grid
                        item
                        xs
                        display="flex"
                        justifyContent={'center'}
                        alignItems="center"
                    >
                        <Abc fontSize="large" /> {/* replace with own image later */}
                    </Grid>
                </Grid>
            </Box>

            <Box m={3} display="flex" justifyContent="center">
                <Grid sx={{ width: 0.8, m: 2 }} spacing={3} container>
                    <Grid
                        item
                        xs
                        display="flex"
                        justifyContent={'left'}
                        alignItems="center"
                    >
                        <Abc fontSize="large" /> {/* replace with own image later */}
                    </Grid>
                    {/* <Grid item xs> */}
                    <Divider orientation="vertical" variant="middle" flexItem />
                    {/* </Grid> */}
                    <Grid
                        item
                        xs
                        display="flex"
                        justifyContent={'center'}
                        alignItems="center"
                    >
                        <Typography>Thing 2</Typography>
                    </Grid>
                </Grid>
            </Box>

            <Box m={3} display="flex" justifyContent="center">
                <Grid sx={{ width: 0.8, m: 2 }} spacing={3} container>
                    <Grid item xs display="flex" justifyContent={'left'}>
                        <Typography>Thing 3</Typography>
                    </Grid>
                    {/* <Grid item xs> */}
                    <Divider orientation="vertical" variant="middle" flexItem />
                    {/* </Grid> */}
                    <Grid
                        item
                        xs
                        display="flex"
                        justifyContent={'center'}
                        alignItems="center"
                    >
                        <Abc fontSize="large" /> {/* replace with own image later */}
                    </Grid>
                </Grid>
            </Box>

            <Divider variant="middle" />

            <Typography display="flex" justifyContent={'center'} m={2}>
                Here's How It Works!
            </Typography>
            <Box
                sx={{ m: 3 }}
                display="flex"
                justifyContent="center"
            // alignItems="center"
            >
                <List sx={{ display: 'list-item' }}>
                    <ListItem>
                        <ListItemText
                            primary="Scan Your Face"
                            secondary="Short description of scanning process"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Select Your Favourite Frame Design"
                            secondary="Short description of virtual try-on"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Receive Your New Frame"
                            secondary="Short description of production and home delivery"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Fine Tuning of Frame"
                            secondary="Short description of how to adjust intricate pieces"
                        />
                    </ListItem>
                </List>
            </Box>

            <Divider variant="middle" />

            <Typography variant="h5" display="flex" justifyContent={'center'} m={2}>
                Items That You Need
            </Typography>
            <Box m={3} display="flex" justifyContent="center">
                <Grid sx={{ width: 0.8, m: 2 }} spacing={3} container>
                    <Grid item xs display="flex" justifyContent={'center'}>
                        <Box display="flex" justifyContent={'center'}>
                            <Typography variant="h5" display="flex" justifyContent={'center'}>
                                Computer
                            </Typography>
                            <Typography variant="h6" display="flex" justifyContent={'center'}>
                                Thing 3
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs display="flex" justifyContent={'center'}>
                        <Box>
                            <Typography variant="h5" display="flex" justifyContent={'center'}>
                                Smartphone
                            </Typography>
                            <Typography variant="h6" display="flex" justifyContent={'center'}>
                                Version of iPhone?
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs display="flex" justifyContent={'center'}>
                        <Box>
                            <Typography variant="h5" display="flex" justifyContent={'center'}>
                                Credit Card
                            </Typography>
                            <Typography variant="h6" display="flex" justifyContent={'center'}>
                                Or any other reference object
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default HomePage

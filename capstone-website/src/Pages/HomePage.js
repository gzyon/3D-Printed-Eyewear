import { Typography, Grid, styled, Paper, Box, Button, Divider, List, ListItem, ListItemText, Container } from '@mui/material'
import React from 'react'
import Header from '../Components/Header/Header'
import Abc from '@mui/icons-material/Abc'
import './HomePage.css';

import landingImage from '../assets/images/landing.png'
import DescItem from '../Components/DescItem/DescItem'

// icons
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';


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
            <Container>
                {/* <Box display="flex" justifyContent="center"> */}
                    {/* <Box
                        sx={{ width: 0.8, border: 1, m: 3 }}
                        display="flex"
                        justifyContent="center"
                    > */}
                        <Grid container spacing={2} columns={16} py={30}>
                            <Grid
                                item
                                xs={8}
                                display="flex"
                                justifyContent={'left'}
                                alignItems="center"
                            >
                                <Box>
                                    <Typography variant="h3" component="h1" m={1}>
                                        Introduce Your Product Quickly & Effectively
                                    </Typography>
                                    <Typography variant="body1" component="body1">
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
    mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                                    </Typography>
                                    <Grid columns={2} mt={4}>
                                        <Button m={1}>Purchase Now</Button>
                                        <Button m={1}>Learn More</Button>
                                    </Grid>

                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={8}
                                display="flex"
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <img src={landingImage} /> 
                                {/* <Abc fontSize="large" /> replace with own image later */}
                            </Grid>
                        </Grid>
                    {/* </Box> */}
                {/* </Box> */}

                <Divider variant="middle" />

                <Grid container spacing={2} columns={16} py={30}>
                            <Grid
                                item
                                xs={8}
                                display="flex"
                                justifyContent={'left'}
                                alignItems="center"
                            >
                                <Box>
                                    <Typography variant="h3" component="h1" m={1}>
                                        Light, Fast & Powerful
                                    </Typography>
                                    <Typography variant="body1" component="body1">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                                    </Typography>
                                    <Grid columns={2} mt={4}>
                                        <DescItem title='Convenience'
                                            content=' Lorem ipsum dolor sit amet, consectetuer adipisc'
                                            icon={<AccessAlarmOutlinedIcon fontSize='large'/>}
                                         />
                                        <DescItem title='Comfort' content='lorem ipsum'
                                            icon={<AccessAlarmOutlinedIcon fontSize='large'/>}
                                        />
                                    </Grid>

                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={8}
                                display="flex"
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <img src={landingImage} /> 
                                {/* <Abc fontSize="large" /> replace with own image later */}
                            </Grid>
                        </Grid>
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
            </Container>
        </>
    )
}

export default HomePage

import { Typography, Grid, styled, Paper, Box, Button, Divider, List, ListItem, ListItemText, Container, BottomNavigation } from '@mui/material'
import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Abc from '@mui/icons-material/Abc'
import './HomePage.css';

import landingImage from '../assets/images/landing.png'
import DescItem from '../Components/DescItem/DescItem'

//styles
import { StylesProvider } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles'

// icons
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';

const { palette } = createTheme();
const { augmentColor } = palette;

const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "#4E542C"
                }
                
            }
        },
        MuiIcon:{
            styleOverrides: {
                root: {
                    color: "#4E542C"
                }
                
            }
        }
    },
    palette:{
        darkGreen: createColor("#4E542C"),
        lightGreen: createColor("#EAE79B")
    }
})

const HomePage = () => {
    

    return (
        <>
            <Header />
            <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
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
                                    <Typography variant="h3" component="h1" color="#14140A">
                                        <b>Introduce Your Product Quickly & Effectively</b>
                                    </Typography>
                                    <Typography variant="body1" component="body1" color="darkGreen">
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
    mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                                    </Typography>
                                    <Grid columns={2} mt={4}>
                                        <Button m={2} variant="contained" color="darkGreen">Purchase Now</Button>
                                        <Button sx={
                                            {
                                                margin: '8px 30px',
                                                color: "#4E542C"
                                            }
                                        } color="darkGreen">Learn More</Button>
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
                                <img src={landingImage} className="bigPic"/> 
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
                                    <Typography variant="h3" component="h1" color="#14140A">
                                        <b>Light, Fast & Powerful</b>
                                    </Typography>
                                    <Typography variant="body1" component="body1" color="darkGreen">
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
    mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                                    </Typography>
                                    <Grid container columns={2} mt={4} direction='column' display='-webkit-inline-box'>
                                        <Grid item m='32px 32px 32px 0px' maxWidth='200px' minWidth='200px'>
                                            <DescItem title='Convenience'
                                                content=' Lorem ipsum dolor sit amet, consectetuer adipisc'
                                                icon={<AccessAlarmOutlinedIcon fontSize='large' color="darkGreen"/>}
                                            />
                                         </Grid>
                                        <Grid item m='32px 32px 32px 0px' maxWidth='200px' minWidth='200px'>
                                        <DescItem title='Comfort' content='lorem ipsum'
                                            icon={<AccessAlarmOutlinedIcon fontSize='large' color="darkGreen"/>}
                                        />
                                        </Grid>
                                        <Grid item m='32px 32px 32px 0px' maxWidth='200px' minWidth='200px'>
                                        <DescItem title='Customisability' content='lorem ipsum'
                                            icon={<AccessAlarmOutlinedIcon fontSize='large' color="darkGreen"/>}
                                        />
                                        </Grid>
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
                                <img src={landingImage} className="bigPic"/>  
                                {/* <Abc fontSize="large" /> replace with own image later */}
                            </Grid>
                        </Grid>
                <Typography
                    variant="h6"
                    component="div"
                    m={2}
                    display="flex"
                    justifyContent="center"
                    align='center'
                >
                    <b>Description of current problems faced by our user and the motivation of
                    why our product is needed</b>
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
                            <img src={landingImage} className='smallPic'/>  {/* replace with own image later */}
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
                            <img src={landingImage} className='smallPic'/>  {/* replace with own image later */}
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
                            <img src={landingImage} className='smallPic'/>  {/* replace with own image later */}
                        </Grid>
                    </Grid>
                </Box>

                <Divider variant="middle" />

                <Typography fontSize={25} display="flex" justifyContent={'center'} m={2}>
                    <b>Here's How It Works!</b>
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
                                disableTypography
                                primary={<Typography fontSize={20} type="body1" style={{ color: '#4E542C' }}><b>1. Scan Your Face</b></Typography>}
                                secondary={<Typography fontSize={15} type="body2" style={{ color: '#4E542C' }}>Short description of scanning process</Typography>}
                                
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                disableTypography
                                primary={<Typography fontSize={20} type="body1" style={{ color: '#4E542C' }}><b>2. Select Your Favourite Frame Design</b></Typography>}
                                secondary={<Typography fontSize={15} type="body2" style={{ color: '#4E542C' }}>Short description of virtual try-on</Typography>}
                                
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                disableTypography
                                primary={<Typography fontSize={20} type="body1" style={{ color: '#4E542C' }}><b>3. Receive Your New Frame</b></Typography>}
                                secondary={<Typography fontSize={15} type="body2" style={{ color: '#4E542C' }}>Short description of production and home delivery</Typography>}
                                
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                disableTypography
                                primary={<Typography fontSize={20} type="body1" style={{ color: '#4E542C' }}><b>4. Fine Tuning of Frame</b></Typography>}
                                secondary={<Typography fontSize={15} type="body2" style={{ color: '#4E542C' }}>Short description of how to adjust intricate pieces</Typography>}
                                
                            />
                        </ListItem>
                    </List>
                </Box>

                <Box p="30px" sx={{backgroundColor: '#EAE79B'}}>
                <Divider variant="middle"/>
                    <Footer/>                
                </Box>
            </Container>
            </ThemeProvider>
            </StylesProvider>
        </>
    )
}

export default HomePage

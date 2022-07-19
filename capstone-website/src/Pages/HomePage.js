import { Typography, Grid, styled, Paper, Box, Button, Divider, List, ListItem, ListItemText, Container, BottomNavigation } from '@mui/material'
import React from 'react'
import {useRef} from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Abc from '@mui/icons-material/Abc'
import './HomePage.css';

import landingImage from '../assets/images/landing.png'
import DescItem from '../Components/DescItem/DescItem'

//styles
import { StylesProvider } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles'

// icons
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

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



const HomePage = (props) => {

    const ref = useRef(null);

    const handleClick = () => {
        ref.current?.scrollIntoView({behavior: 'smooth'});
    };

    return (
        <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
        <React.Fragment>
        <CssBaseline />
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
                                    <Typography variant="h3" component="h1" color="#14140A">
                                        <b>Customisable, Ergonomic eyewear</b>
                                    </Typography>
                                    <Typography variant="body1" component="body1" color="darkGreen">
                                        Here at Olive Eyecare and Wellness, we are invested in the comfort and aesthetics of our customers' eyewear. We believe that eyewear can be both stylish and comfortable at the same time. With our unique 3D rendering technology and state-of-the-art AI, we will generate eyewear most suited for our customers.
                                    </Typography>
                                    <Grid columns={2} mt={4}>
                                        <Button m={2} variant="contained" color="darkGreen">Purchase Now</Button>
                                        <Button sx={
                                            {
                                                margin: '8px 30px',
                                                color: "#4E542C"
                                            }
                                        } color="darkGreen" onClick={handleClick}>Learn More</Button>
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
                                justifyContent={'center'}
                                alignItems={'center'}
                            >
                                <img src={landingImage} className="bigPic"/>  
                                {/* <Abc fontSize="large" /> replace with own image later */}
                            </Grid>
                            <Grid
                                item
                                xs={8}
                                display="flex"
                                justifyContent={'left'}
                                alignItems="center"
                                ref={ref}
                            >
                                <Box>
                                    <Typography variant="h3" component="h1" color="#14140A" >
                                        <b> Comfort, Convenience & Customisable</b>
                                    </Typography>
                                    <Typography variant="body1" component="body1" color="darkGreen">
                                        In order to optimise the <b>3Cs</b> of eyewear, we utilised state-of-the-art technology that allows us to generate the best fitting eyewear for the users, based on their demographics. In addition, users are able to visualise the eyewear immediately on the 3D render of their faces and based on their style and preferences they can freely customise the eyewear.
                                    </Typography>
                                    <Grid container columns={2} spacing={2} mt={4} direction='column' display='-webkit-inline-box'>
                                        <Grid item xs={1}>
                                            <DescItem title='Comfort'
                                                content='Using AI technology, we are able to generate the best fit for the user based on their demographic information.'
                                                icon={<AutoAwesomeIcon fontSize='large' color="darkGreen"/>}
                                            />
                                         </Grid>
                                        <Grid item xs={1}>
                                        <DescItem title='Convenience' 
                                            content='Customising and generation of the eyewear is done entirely online.'
                                            icon={<AccessAlarmOutlinedIcon fontSize='large' color="darkGreen"/>}
                                        />
                                        </Grid>
                                        <Grid item xs={1}>
                                        <DescItem title='Customisability' 
                                            content='Users can select amongst the large variety of colours, material and design of their desired eyewear. Further personalisation like engraving and custom design is also an option in our 3D printed eyewear.'
                                            icon={<TuneIcon fontSize='large' color="darkGreen"/>}
                                        />
                                        </Grid>
                                    </Grid>

                                </Box>
                            </Grid>
                        </Grid>
                <Typography
                    variant="h4"
                    component="div"
                    m={2}
                    display="flex"
                    justifyContent="center"
                    align='center'
                >
                    <b>What do we aim to solve?</b>
                </Typography>

                <Divider variant="middle" />

                <Box m={3} display="flex" justifyContent="center">
                    <Grid sx={{ width: 0.8, m: 2}} spacing={3} container>
                        <Grid
                            item
                            xs
                            display="flex"
                            justifyContent={'left'}
                            alignItems="center"
                            paddingRight={3}
                        >
                            <Typography variant='h5'>
                                <b>Facial Asymmetry</b>
                                <br></br>
                                <br></br>
                                <Typography>Almost everyone has some degree of asymmetry on our face. However, other factors like injury, aging and smoking can contribute to more obvious asymmetry in our faces. These asymmetry result in the fast-fashion eyewear to not rest perfectly on our facial contours and hence result in discomfort.</Typography>
                            </Typography>
                            
                            
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
                            justifyContent={'right'}
                            alignItems="center"
                            paddingRight={3}
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
                            paddingLeft={3}
                        >
                            <Typography variant='h5'>
                                <b>Representation of Comfort</b>
                                <br></br>
                                <br></br>
                                <Typography>While comfort is deeply personal to each and every person. Using Big Data and AI technology, we are able to draw hidden insights that perhaps one's preference in comfort may not be as unique as we may think it is. Depending on one's previous eyewear weight and size and the user's demographic, we are able to predict the comfortability factor of a current design at a particular dimension.</Typography>
                            </Typography>
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
                                secondary={<Typography fontSize={15} type="body2" style={{ color: '#4E542C' }}>Download photogrammetry app <a href='https://poly.cam/'>Polycam</a> and take a 3d scan of your face. Upload the file <a>here</a>.
                                </Typography>}
                                
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                disableTypography
                                primary={<Typography fontSize={20} type="body1" style={{ color: '#4E542C' }}><b>2. Select Your Favourite Frame Design</b></Typography>}
                                secondary={<Typography fontSize={15} type="body2" style={{ color: '#4E542C' }}>Select your favourite colour, material and design. See how it looks on the 3D render.</Typography>}
                                
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                disableTypography
                                primary={<Typography fontSize={20} type="body1" style={{ color: '#4E542C' }}><b>3. Receive Your New Frame</b></Typography>}
                                secondary={<Typography fontSize={15} type="body2" style={{ color: '#4E542C' }}>The glasses will be sent for 3D printing and it will be delivered to your doorstep.</Typography>}
                                
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                disableTypography
                                primary={<Typography fontSize={20} type="body1" style={{ color: '#4E542C' }}><b>4. Fine Tuning of Frame</b></Typography>}
                                secondary={<Typography fontSize={15} type="body2" style={{ color: '#4E542C' }}>Come down to the store to fine tune the intricate parts like the nose piece if it is not perfectly comfortable.</Typography>}
                                
                            />
                        </ListItem>
                    </List>
                </Box>
            </Container>
            <Box p="30px" sx={{backgroundColor: '#4E542C'}}>
                <Divider sx={{ bgcolor: "#EAE79B" }} variant="middle"/>
                    <Footer/>                
            </Box>
        </React.Fragment>
        </ThemeProvider>
        </StylesProvider>
    )
}

export default HomePage

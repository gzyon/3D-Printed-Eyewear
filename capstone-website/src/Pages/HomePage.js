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
import glasses_landing from '../assets/images/glasses_landing.png'
import DescItem from '../Components/DescItem/DescItem'
import DescItemLargeLeft from '../Components/DescItemLarge/DescItemLargeLeft'
import DescItemLargeRight from '../Components/DescItemLarge/DescItemLargeRight'

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
                    color: "#000000"
                }
                
            }
        },
        MuiIcon:{
            styleOverrides: {
                root: {
                    color: "#4E542C"
                }
                
            }
        },
        MuiDivider:{
            styleOverrides:{
                root:{
                    background: "#2e2e2e"
                }
            }
        }
    },
    palette:{
        darkGreen: createColor("#4E542C"),
        lightGreen: createColor("#EAE79B"),
        white:createColor("#FFFFFF")
    }
})



const HomePage = (props) => {

    const ref = useRef(null);

    const handleClick = () => {
        ref.current?.scrollIntoView({behavior: 'smooth'});
    };

    const [isVisible, setVisible] = React.useState(true);
    const domRef = React.useRef();
    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
        return () => observer.unobserve(domRef.current);
    }, []);

    return (
        <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
        <React.Fragment>
        <CssBaseline />
            <Header />
            <Grid container>
                {/* Segment 1: Main product selling page */}
                <Grid item container columns={16} py={10}>
                    <Grid sx={{backgroundColor:'#000000'}} item xs={8} display="flex" justifyContent={'left'} alignItems="center" className={`fade-in-bottom-section ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
                        <Box sx={{backgroundColor:'#000000', padding:"20px"}}>
                            <Typography variant="h4" color="#FFFFFF">
                                <b>Customisable, Ergonomic eyewear</b>
                            </Typography>
                            
                            <Typography variant="body2" color="#FFFFFF" >
                                Here at Olive Eyecare and Wellness, we are invested in the comfort and aesthetics of our customers' eyewear. We believe that eyewear can be both stylish and comfortable at the same time. With our unique 3D rendering technology and state-of-the-art AI, we will generate eyewear most suited for our customers.
                            </Typography>
                            
                            <Grid columns={2} mt={4}>
                                <Button sx={{width:"100px", padding:0.5 ,margin: '4px 10px',color: "white"}} size="small" variant="contained" color="white" href="/upload">Try Now</Button>
                                <Button sx={{width:"100px", padding:0.5 ,margin: '4px 10px',color: "white"}} color="white" size="small" onClick={handleClick}>Learn More</Button>
                            </Grid>
                        </Box>
                    </Grid>

                    <Grid item xs={8} display="flex" justifyContent={'center'} alignItems={'center'} sx={{padding:"10px"}}>
                        <img src={glasses_landing} className={`fade-in-right-section ${isVisible ? 'is-visible' : ''}`} ref={domRef}/>
                    </Grid>
                </Grid>

                <Divider variant="middle" />

                {/* Segment 2: User step details */}

                <Grid item container spacing={2} columns={3} px={5} py={30} >
                    <Grid item xs={1} className={`fade-in-left-section1 ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
                        <DescItem title='Comfort'
                            content='Using AI technology, we are able to generate the best fit for the user based on their demographic information.'
                            icon={<AutoAwesomeIcon fontSize='large' color="darkGreen"/>}
                        />
                    </Grid>
                    <Grid item xs={1} className={`fade-in-left-section2 ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
                        <DescItem title='Convenience' 
                            content='Customising and generation of the eyewear is done entirely online.'
                            icon={<AccessAlarmOutlinedIcon fontSize='large' color="darkGreen"/>}
                        />
                    </Grid>
                    <Grid item xs={1} className={`fade-in-left-section3 ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
                        <DescItem title='Customisability' 
                            content='Users can select amongst the large variety of colours, material and design of their desired eyewear. Further personalisation like engraving and custom design is also an option in our 3D printed eyewear.'
                            icon={<TuneIcon fontSize='large' color="darkGreen"/>}
                        />
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

                {/* Segment 3: MVPs */}
                <DescItemLargeLeft title="Facial Asymmetry" content="Almost everyone has some degree of asymmetry on our face. However, other factors like injury, aging and smoking can contribute to more obvious asymmetry in our faces. These asymmetry result in the fast-fashion eyewear to not rest perfectly on our facial contours and hence result in discomfort." image={landingImage}/>
                
                <DescItemLargeRight 
                title="Representation of Comfort" 
                content="While comfort is deeply personal to each and every person. Using Big Data and AI technology, we are able to draw hidden insights that perhaps one's preference in comfort may not be as unique as we may think it is. Depending on one's previous eyewear weight and size and the user's demographic, we are able to predict the comfortability factor of a current design at a particular dimension." 
                image={landingImage}/>

                <Divider variant="middle" />

                {/* Segment 4: Additional details */}

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
            </Grid>
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

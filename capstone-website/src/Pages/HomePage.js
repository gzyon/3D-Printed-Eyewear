import { Typography, Grid,Box, Button, Divider} from '@mui/material'
import React from 'react'
import {useRef} from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import CssBaseline from '@mui/material/CssBaseline';
import './HomePage.css';
// import { sizing } from '@material-ui/system';

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

// import { Storage } from '@google-cloud/storage';

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
        white:createColor("#FFFFFF"),
        black:createColor("#000000")
    }
})

async function downloadIntoMemory(storage, bucketName, fileName) {
    // Downloads the file into a buffer in memory.
    const contents = await storage.bucket(bucketName).file(fileName).download();
  
    console.log(
      `Contents of gs://${bucketName}/${fileName} are ${contents.toString()}.`
    );
  
    return contents;
  }



const HomePage = (props) => {

    
    const bucketName = "olive-eyewear-and-wellness-bucket"
    const fileName = "frame1.obj"
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
                <Grid item container columns={5} py={5}>
                    <Grid sx={{backgroundColor:'#000000', height: '80vh'}} item md={3} display="flex" justifyContent={'left'} alignItems="center" ref={domRef}>
                        <Box sx={{backgroundColor:'#000000', padding:"100px", width:"45vw"}}>
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

                    <Grid item md={2} display="flex" justifyContent={'center'} alignItems={'center'} sx={{padding:"10px", margin:"200px 0px 0px -100px", display: { xs: 'none', md: 'block' }}}>
                        <img src={glasses_landing} height={280}/>
                    </Grid>
                </Grid>

                {/* Segment 2: User step details */}

                <Grid item container spacing={8} columns={4} px={5} py={5} sx={{height:"80vh"}} alignContent="center">
                    <Grid item md={1} className={`fade-in-left-section1 ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
                        <DescItem title='User Step 1'
                            content='Using AI technology, we are able to generate the best fit for the user based on their demographic information.'
                            icon={<AutoAwesomeIcon fontSize='large' color="black"/>}
                        />
                    </Grid>
                    <Grid item md={1} className={`fade-in-left-section2 ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
                        <DescItem title='User Step 2' 
                            content='Customising and generation of the eyewear is done entirely online.'
                            icon={<AccessAlarmOutlinedIcon fontSize='large' color="black"/>}
                        />
                    </Grid>
                    <Grid item md={1} className={`fade-in-left-section3 ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
                        <DescItem title='User Step 3' 
                            content='Users can select amongst the large variety of colours, material and design of their desired eyewear. Further personalisation like engraving and custom design is also an option in our 3D printed eyewear.'
                            icon={<TuneIcon fontSize='large' color="black"/>}
                        />
                    </Grid>
                    <Grid item md={1} className={`fade-in-left-section3 ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
                        <DescItem title='User Step 4' 
                            content='Users can select amongst the large variety of colours, material and design of their desired eyewear. Further personalisation like engraving and custom design is also an option in our 3D printed eyewear.'
                            icon={<TuneIcon fontSize='large' color="black"/>}
                        />
                    </Grid>
                </Grid>
                {/* <Grid item container justifyContent="center" align='center' >
                    <Grid item>
                        <Typography
                            variant="h4"
                            component="div"
                            m={2}
                            display="flex"
                        >
                            <b>What do we aim to solve?</b>
                        </Typography>
                    </Grid>


                    {/* Segment 3: MVPs */}
                    {/* <Grid item>
                        <DescItemLargeLeft title="Facial Asymmetry" content="Almost everyone has some degree of asymmetry on our face. However, other factors like injury, aging and smoking can contribute to more obvious asymmetry in our faces. These asymmetry result in the fast-fashion eyewear to not rest perfectly on our facial contours and hence result in discomfort." image={landingImage}/>
                        
                        <DescItemLargeRight 
                        title="Representation of Comfort" 
                        content="While comfort is deeply personal to each and every person. Using Big Data and AI technology, we are able to draw hidden insights that perhaps one's preference in comfort may not be as unique as we may think it is. Depending on one's previous eyewear weight and size and the user's demographic, we are able to predict the comfortability factor of a current design at a particular dimension." 
                        image={landingImage}/>
                    </Grid>
                </Grid> */}


                {/* Segment 4: Additional details */}
                <Grid item container py={5}>
                    <Grid sx={{backgroundColor:'#000000'}} item display="flex" justifyContent={'left'} alignItems="center" ref={domRef}>
                        <Box sx={{backgroundColor:'#000000', padding:"100px"}}>
                            <Typography variant="h4" color="#FFFFFF">
                                <b>Customisable, Ergonomic eyewear</b>
                            </Typography>
                            
                            <Typography variant="body2" color="#FFFFFF" >
                                Some random content here!!
                                 we are invested in the comfort and aesthetics of our customers' eyewear. We believe that eyewear can be both stylish and comfortable at the same time. With our unique 3D rendering technology and state-of-the-art AI, we will generate eyewear most suited for our customers.
                            </Typography>
                            
                        </Box>
                    </Grid>
                </Grid>

                <Grid item container justifyContent="center" align='center' >
                    <Grid item>
                        <Typography
                            variant="h4"
                            component="div"
                            m={2}
                            display="flex"
                        >
                            <b>What do we aim to solve?</b>
                        </Typography>
                    </Grid>


                    {/* Segment 3: MVPs */}
                    <Grid item>
                        <DescItemLargeLeft title="Facial Asymmetry" content="Almost everyone has some degree of asymmetry on our face. However, other factors like injury, aging and smoking can contribute to more obvious asymmetry in our faces. These asymmetry result in the fast-fashion eyewear to not rest perfectly on our facial contours and hence result in discomfort." image={landingImage}/>
                        
                        <DescItemLargeRight 
                        title="Representation of Comfort" 
                        content="While comfort is deeply personal to each and every person. Using Big Data and AI technology, we are able to draw hidden insights that perhaps one's preference in comfort may not be as unique as we may think it is. Depending on one's previous eyewear weight and size and the user's demographic, we are able to predict the comfortability factor of a current design at a particular dimension." 
                        image={landingImage}/>
                    </Grid>
                </Grid>
                
            </Grid>
            <Box p="30px" sx={{backgroundColor: '#000000'}}>
                <Divider sx={{ bgcolor: "#FFFFFF" }} variant="middle"/>
                    <Footer/>                
            </Box>
        </React.Fragment>
        </ThemeProvider>
        </StylesProvider>
    )
}

export default HomePage

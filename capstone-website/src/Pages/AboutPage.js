import { Typography, Grid, styled, Paper, Box, Button, Divider, List, ListItem, ListItemText, Container, BottomNavigation } from '@mui/material'
import React from 'react'
import HeaderAbout from '../Components/Header/HeaderAbout'
import Footer from '../Components/Footer/Footer'
import Abc from '@mui/icons-material/Abc'

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
        darkGreen: createColor("#4E542C")
    }
})

const AboutPage = () => {
    

    return (
        <>
            <HeaderAbout />
            <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
            <Container>
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
                            <b>About the company</b>
                        </Typography>
                        <Typography variant="body1" component="body1" color="darkGreen">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                        </Typography>
                        <Grid columns={2} mt={4}>
                            <Button m={2} variant="contained" color="darkGreen">Purchase Now</Button>
                            
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
                </Container>
            </ThemeProvider>
            </StylesProvider>                
        </>
    )
}

export default AboutPage
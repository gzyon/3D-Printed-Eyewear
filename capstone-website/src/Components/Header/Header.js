import React from "react";
import { AppBar } from "@mui/material";
import { IconButton } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material"
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import './Header.css';


import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';

// import { ThemeProvider } from 'styled-components';
import { StylesProvider } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles'

//logo
import logo from './logo.png'



const theme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fffdf6',
                    color: '#4E542C'
                }
                
            }
        }
    }
})

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  
  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

const Header = (props) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar>
                    <Box
                        component="img"
                        sx={{
                        height: 64,
                        pr: 2
                        }}
                        alt="Your logo."
                        src={logo}
                    />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <b>Olive Eyecare and Wellness</b>
                        </Typography>
                            <Button color="inherit" href="/about">About Us</Button>
                            <Button color="inherit" href="/contact">Contact Us</Button>
                    </Toolbar>
                </AppBar>
                </ElevationScroll>
            </ThemeProvider>
            </StylesProvider>
        </Box>
    )
}

export default Header;
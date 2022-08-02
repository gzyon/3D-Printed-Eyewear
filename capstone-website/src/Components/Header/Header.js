import React from "react";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import './Header.css';


import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';

// import { ThemeProvider } from 'styled-components';
import { StylesProvider } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles'

//logo
import logo from '../../assets/images/olivelogo.png'

const theme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    color: '#000000'
                }
                
            }
        }
    }
})

function ElevationScroll(props) {
    const { children, window } = props;

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
                    <Box display='flex' flexGrow={1} sx={{ height: 40, pr: 2 }}>
                        <img src={logo} alt="My logo"/>
                    </Box>
                    <div >
                        <Button color="inherit" href="/about">About Us</Button>
                        <Button color="inherit" href="/contact">Contact Us</Button>
                    </div>
                    </Toolbar>
                </AppBar>
                </ElevationScroll>
            </ThemeProvider>
            </StylesProvider>
        </Box>
    )
}

export default Header;
import React from "react";
import { AppBar } from "@mui/material";
import { IconButton } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material"
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import './Header.css';

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

const HeaderAbout = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                <AppBar position="static" className="Appbar">
                    <Toolbar>
                        <Box display='flex' flexGrow={1} sx={{ height: 40, pr: 2 }}>
                            <img src={logo} alt="My logo"/>
                        </Box>
                        <div >
                                <Button color="inherit" href="/">Home</Button>
                                <Button color="inherit" href="/contact">Contact Us</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            </StylesProvider>
        </Box>
    )
}

export default HeaderAbout;
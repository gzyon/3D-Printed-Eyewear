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

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                <AppBar position="static" className="Appbar">
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
            </ThemeProvider>
            </StylesProvider>
        </Box>
    )
}

export default Header;
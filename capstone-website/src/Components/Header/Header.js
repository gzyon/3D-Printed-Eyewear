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

// const theme = {
//     colors: {
//       primary: '#FFFDF6',
//       textLight: '#F3F4F7',
//     },
//   };

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
                        <MenuIcon sx={{ mr: 2 }}/> {/*replace with own logo later on */}
                        {/* </IconButton> */}
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <b>Olive Eyecare and Wellness</b>
                        </Typography>
                            <Button color="inherit">About Us</Button>
                            <Button color="inherit">How It Works</Button>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            </StylesProvider>
        </Box>
    )
}

export default Header;
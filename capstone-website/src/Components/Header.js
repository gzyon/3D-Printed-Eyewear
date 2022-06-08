import React from "react";
import { AppBar } from "@mui/material";
import { IconButton } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Box } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material"
import { Typography } from "@mui/material";
import { Button } from "@mui/material";

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                {/* <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                > */}
                <MenuIcon sx={{ mr: 2 }}/> {/*replace with own logo later on */}
                {/* </IconButton> */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Olive Eyecare and Wellness
                </Typography>
                    <Button color="inherit">About Us</Button>
                    <Button color="inherit">How It Works</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;
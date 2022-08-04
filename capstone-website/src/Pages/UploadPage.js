import {Container} from '@mui/material'
import React, {useState} from 'react'
import HeaderAbout from '../Components/Header/HeaderAbout'
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Rating,
    TextField,
    Typography,
  } from "@mui/material";

//styles
import { StylesProvider } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { FileUploader } from '../Components/FileUploader/FileUploader';

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

const UploadPage = () => {
    const [files, setFiles] = useState([]);
    const onSuccess = (savedFiles) => {
        setFiles(savedFiles)
    };

    return (
        <>
            <HeaderAbout />
            <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                
                <Container sx={{margin:"20px"}}>
                    <FileUploader onSuccess={onSuccess}/>
                </Container>
            </ThemeProvider>
            </StylesProvider>                
        </>
    )
}

export default UploadPage

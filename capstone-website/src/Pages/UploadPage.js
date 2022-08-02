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
                <form>
                <FormGroup
                    sx={{
                    padding: 2,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "primary.main",
                    }}
                >
                    <TextField
                    sx={{ paddingBottom: 2 }}
                    name="specs"
                    variant="outlined"
                    placeholder="Specs..."
                    onChange={handleTextFieldChange}
                    />
                    <FormLabel component="legend">Product</FormLabel>
                    <FormGroup row sx={{ paddingBottom: 2 }} >
                    <FormControlLabel
                        control={<Checkbox name="laptop" value="laptop" onChange={handleCheckboxChange}/>}
                        label="Laptop"
                    />
                    <FormControlLabel
                        control={<Checkbox name="headset" value="headset" onChange={handleCheckboxChange}/>}
                        label="Head Set"
                    />
                    </FormGroup>
                    <Typography component="legend">Review</Typography>
                    <Rating name={reviewName} sx={{ paddingBottom: 2 }} onChange={(event, value) => handleRatingChange(value, reviewName)}/>
                    <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
                </FormGroup>
                </form>
                <Container sx={{margin:"20px"}}>
                    <FileUploader onSuccess={onSuccess}/>
                </Container>
            </ThemeProvider>
            </StylesProvider>                
        </>
    )
}

export default UploadPage

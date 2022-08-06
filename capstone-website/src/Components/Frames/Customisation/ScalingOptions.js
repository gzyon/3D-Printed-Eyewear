import { Box, FormControlLabel, Grid, Slider, Switch, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
import PropTypes from 'prop-types';
import SpecColour from "../../ComponentColour";

const ScalingOptions = (props) => {
    console.log(props);
    
    const customisableValues = props.customisedValues;
    const setStateFunc = props.setStateFunc;

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
      
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const sharedOptions = (
        <>
        <Typography align='center' >
            Metalness 
        </Typography>
        <Slider 
            value={props.xVal} 
            defaultValue={1}
            onChange={props.changeXValue} 
            min={0} 
            max={1} 
            step={0.01}
            valueLabelDisplay="auto"
        />
        </>
    )

    return (
        <>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={customisableValues.component} onChange={setStateFunc.setComponent} variant="fullWidth">
                    <Tab label="Front Frame" {...a11yProps(0)} />
                    <Tab label="Left Arm" {...a11yProps(1)} />
                    <Tab label="Right Arm" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={customisableValues.component} index={0}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography align='center' >
                                Frame Wideness
                        </Typography>
                        <Slider 
                            value={customisableValues.xVal} 
                            defaultValue={1}
                            onChange={setStateFunc.changeXValue} 
                            min={0.9} 
                            max={1.15} 
                            step={0.005}
                            valueLabelDisplay="auto"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align='center'>
                            Frame Height
                        </Typography>
                        <Slider 
                            value={customisableValues.yzVal} 
                            onChange={setStateFunc.changeYZValue}
                            defaultValue={1}
                            min={0.9} 
                            max={1.15} 
                            step={0.005}
                            valueLabelDisplay="auto"
                        />
                    </Grid>
                </Grid>
                <SpecColour changeColor={setStateFunc.changeColor} color={customisableValues.frontColor}/>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography align='center' >
                            Metalness 
                        </Typography>
                        <Slider 
                            value={customisableValues.metalness[0]} 
                            defaultValue={0}
                            onChange={setStateFunc.setMetalness} 
                            min={0} 
                            max={1} 
                            step={0.01}
                            valueLabelDisplay="auto"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel control={<Switch/>} onChange={setStateFunc.setWireframe} label="Generative Design" />
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={customisableValues.component} index={1}>
                <Typography align='center' >
                    Length of Arm
                </Typography>
                <Slider 
                    value={customisableValues.leftLength} 
                    onChange={setStateFunc.changeLeftLength}
                    defaultValue={1}
                    min={1} 
                    max={1.1} 
                    step={0.005}
                    valueLabelDisplay="auto"
                />
                <SpecColour changeColor={setStateFunc.changeLeftColor} color={customisableValues.leftColor}/>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography align='center' >
                            Metalness 
                        </Typography>
                        <Slider 
                            value={customisableValues.metalness[1]} 
                            defaultValue={0}
                            onChange={setStateFunc.setMetalness} 
                            min={0} 
                            max={1} 
                            step={0.01}
                            valueLabelDisplay="auto"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel control={<Switch/>} onChange={setStateFunc.setWireframe} label="Generative Design" />
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={customisableValues.component} index={2}>
            <Typography align='center' >
                    Length of Arm
                </Typography>
                <Slider 
                    value={customisableValues.rightLength} 
                    onChange={setStateFunc.changeRightLength}
                    defaultValue={1}
                    min={1} 
                    max={1.1} 
                    step={0.005}
                    valueLabelDisplay="auto"
                />
                <SpecColour changeColor={setStateFunc.changeRightColor} color={customisableValues.rightColor}/>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography align='center' >
                            Metalness 
                        </Typography>
                        <Slider 
                            value={customisableValues.metalness[2]} 
                            defaultValue={0}
                            onChange={setStateFunc.setMetalness} 
                            min={0} 
                            max={1} 
                            step={0.01}
                            valueLabelDisplay="auto"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel control={<Switch/>} onChange={setStateFunc.setWireframe} label="Generative Design" />
                    </Grid>
                </Grid>
            </TabPanel>
        </Box>
        </>
    )
}

export default ScalingOptions;
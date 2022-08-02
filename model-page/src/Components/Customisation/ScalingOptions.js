import { Box, Slider, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
import PropTypes from 'prop-types';
import SpecColour from "./SpecColour";

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
                    <Typography align='center' sx={{ color: 'white' }}>{children}</Typography>
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
        <Typography align='center' color="white">
            Metalness 
        </Typography>
        <Slider 
            value={props.xVal} 
            defaultValue={1}
            onChange={props.changeXValue} 
            min={0.5} 
            max={2} 
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
                    <Tab sx={{color: "white"}} label="Front Frame" {...a11yProps(0)} />
                    <Tab sx={{color: "white"}} label="Left Arm" {...a11yProps(1)} />
                    <Tab sx={{color: "white"}} label="Right Arm" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={customisableValues.component} index={0}>
                <Typography align='center' color="white">
                    Horizontal Scaling 
                </Typography>
                <Slider 
                    value={customisableValues.xVal} 
                    defaultValue={1}
                    onChange={setStateFunc.changeXValue} 
                    min={0.5} 
                    max={2} 
                    step={0.005}
                    valueLabelDisplay="auto"
                />
                <Typography align='center' color="white">
                    Vertical Scaling 
                </Typography>
                <Slider 
                    value={customisableValues.yzVal} 
                    onChange={setStateFunc.changeYZValue}
                    defaultValue={1}
                    min={0.5} 
                    max={2} 
                    step={0.005}
                    valueLabelDisplay="auto"
                />
                <SpecColour changeColor={setStateFunc.changeColor} color={customisableValues.frontColor}/>
                {sharedOptions}
            </TabPanel>
            <TabPanel value={customisableValues.component} index={1}>
                <Typography align='center' color="white">
                    Length of Arm
                </Typography>
                <Slider 
                    value={customisableValues.leftLength} 
                    onChange={setStateFunc.changeLeftLength}
                    defaultValue={1}
                    min={0.5} 
                    max={2} 
                    step={0.005}
                    valueLabelDisplay="auto"
                />
                <SpecColour changeColor={setStateFunc.changeLeftColor} color={customisableValues.leftColor}/>
                {sharedOptions}
            </TabPanel>
            <TabPanel value={customisableValues.component} index={2}>
            <Typography align='center' color="white">
                    Length of Arm
                </Typography>
                <Slider 
                    value={customisableValues.rightLength} 
                    onChange={setStateFunc.changeRightLength}
                    defaultValue={1}
                    min={0} 
                    max={2} 
                    step={0.005}
                    valueLabelDisplay="auto"
                />
                <SpecColour changeColor={setStateFunc.changeRightColor} color={customisableValues.rightColor}/>
                {sharedOptions}
            </TabPanel>
        </Box>
        </>
    )
}

export default ScalingOptions;
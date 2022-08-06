import { Box, Button, Slider, Tab, Tabs, TextField, Typography } from "@mui/material";
import * as React from "react";
import PropTypes from 'prop-types';
import ComponentColour from "../ComponentColour";
import InputForm from "./InputForm";
import { useNavigate } from "react-router-dom";

const CustomisationOptions = (props) => {
    const variables = props.variables;
    const stateFunctions = props.stateFunctions;
    console.log(props);

    const nav = useNavigate();

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
                <Box sx={{ p: 3 }} alignContent="center" justifyContent={"center"}>
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

    function onClick() {
        console.log("woop");
        nav("/success");
    }

    const tabInfo = [
        {
            tabValue: variables.caseComponent, 
            index: 0,
            changeColor: stateFunctions.setCoverColor,
            color: variables.caseCoverColor,
            scale: 0.05,
            metalness: variables.coverMetalness,
            onChange: stateFunctions.adjustCoverMetalness
        },
        {
            tabValue: variables.caseComponent, 
            index: 1,
            changeColor: stateFunctions.setBaseColor,
            color: variables.baseCaseColor,
            scale: 0.05,
            metalness: variables.baseCaseMetalness,
            onChange: stateFunctions.adjustBaseMetalness
        },
    ];

    const customisations = tabInfo.map((tab) => (
        <TabPanel value={tab.tabValue} index={tab.index}>
            <ComponentColour changeColor={tab.changeColor} color={tab.color}/>
            <Typography align='center' >
                Metalness 
            </Typography>
            <Slider 
                value={tab.metalness} 
                defaultValue={1}
                onChange={tab.onChange} 
                min={0} 
                max={1} 
                step={0.01}
                valueLabelDisplay="auto"
            />
        </TabPanel>
    ))

    return (
        <> 
            <InputForm changeCase={stateFunctions.changeCase} />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={variables.caseComponent} onChange={stateFunctions.setComponent} variant="fullWidth">
                    <Tab label="Case Cover" {...a11yProps(0)} />
                    <Tab label="Base Case" {...a11yProps(1)} />
                </Tabs>
            </Box>   
            {customisations}
            <Button onClick={onClick} align="center" variant="outlined" >
                Submit Customisations
            </Button>
        </>
    )
}

export default CustomisationOptions;
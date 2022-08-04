import React from 'react'
import { Typography, Box } from '@mui/material'
const DescItem = ({ title, content, icon }) => {
    return (
        <Box py={3}>
            {icon}
            <Typography variant='h6' component='h6'>
                <b>{title}</b>
            </Typography>
            <Typography variant='body2' sx={
                {
                    color: "#000000"
                }
            }>
                {content} 
            </Typography>
        </Box>
    )
}

export default DescItem
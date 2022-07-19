import React from 'react'
import { Typography, Box } from '@mui/material'
const DescItem = ({ title, content, icon }) => {
    return (
        <Box py={3}>
            {icon}
            <Typography variant='h6' component='h6'>
                <b>{title}</b>
            </Typography>
            <Typography variant='body2' component='body2' sx={
                {
                    color: "#918E41"
                }
            }>
                {content} 
            </Typography>
        </Box>
    )
}

export default DescItem
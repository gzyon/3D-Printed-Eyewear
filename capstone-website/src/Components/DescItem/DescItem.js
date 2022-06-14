import React from 'react'
import { Typography, Box } from '@mui/material'
const DescItem = ({ title, content, icon }) => {
    return (
        <Box py={4}>
            {icon}
            <Typography variant='h6' component='h6'>
                {title}
            </Typography>
            <Typography variant='body2' component='body2'>
                {content} 
            </Typography>
        </Box>
    )
}

export default DescItem
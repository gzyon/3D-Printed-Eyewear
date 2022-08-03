import React from 'react'
import { Typography, Box, Grid, Divider } from '@mui/material'
const DescItemLargeLeft = ({ title, content, image }) => {

    const [isVisible, setVisible] = React.useState(true);
    const domRef = React.useRef();
    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
        return () => observer.unobserve(domRef.current);
    }, []);

    return (
        <Box m={3} display="flex" justifyContent="center">
            <Grid sx={{ width: 0.8, m: 2}} spacing={3} container>
                <Grid
                    item
                    xs
                    display="flex"
                    justifyContent={'left'}
                    alignItems="center"
                    paddingRight={3}
                    
                >
                    <Typography variant='h5' className={`fade-in-bottom-section ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
                        <b>{title}</b>
                        <br></br>
                        <br></br>
                        <Typography>{content}</Typography>
                    </Typography>
                    
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid
                    item
                    xs
                    display="flex"
                    justifyContent={'center'}
                    alignItems="center"
                >
                    <img src={image} className={`fade-in-right-section-small ${isVisible ? 'is-visible' : ''}`} ref={domRef}/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DescItemLargeLeft
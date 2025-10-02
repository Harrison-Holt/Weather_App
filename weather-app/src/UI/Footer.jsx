import { Box, Typography } from '@mui/material'; 

function Footer() {

    return (
        <>
        <Box sx={{ bgcolor:'primary.main', p: 2 }}> 
            <Typography variant='body1' sx={{ textAlign: 'center', color: 'text.secondary'}}>&copy; 2025 Weather App.</Typography>
        </Box>
        </>
    ); 
}

export default Footer; 
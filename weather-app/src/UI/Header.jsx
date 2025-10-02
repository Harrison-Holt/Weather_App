import { AppBar, Toolbar, Typography } from '@mui/material'; 

function Header() {
    return (
        <>
        <AppBar position='static'>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h5'>Weather App</Typography>
            </Toolbar>
        </AppBar>
        </>
    ); 
}

export default Header; 
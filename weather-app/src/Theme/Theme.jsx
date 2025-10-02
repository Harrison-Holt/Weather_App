import { createTheme } from '@mui/material/styles'; 

const theme = createTheme({

    palette: {
        background: {
            default: '#FFFFF0'
        },
        primary: {
            main: '#2196F3'
        }, 
        secondary: {
            main: '#085174'
        }, 
        success: {
            main: '#4CAF50'
        },
        error: {
            main: '#E53935'
        },
        warning: {
            main: '#FFC107'
        },
        info: {
            main: '#E0F7FA'
        }, 
        text: {
            primary: '#333', 
            secondary: '#fff'
        }, 
    },

    typography: {
        fontFamily: 'Open Sans', 

        h1: {
            fontFamily: 'Raleway'
        }, 
        h2: {
            fontFamily: 'Raleway'
        }, 
        h3: {
            fontFamily: 'Raleway'
        }, 
        h4: {
            fontFamily: 'Raleway'
        }, 
        h5: {
            fontFamily: 'Raleway'
        }, 
        h6: {
            fontFamily: 'Raleway'
        }, 
    }
}); 

export default theme; 
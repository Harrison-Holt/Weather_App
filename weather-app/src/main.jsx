import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import theme from './Theme/Theme.jsx'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { WeatherProvider } from './Context/WeatherContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </ThemeProvider>
  </StrictMode>,
)

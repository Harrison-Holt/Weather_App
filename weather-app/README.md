# Weather App ☀️🌧️

A simple weather forecast application built with **React**, **Vite**, and **Material UI (MUI)**.  
It allows users to search for a city and view the **current weather** as well as a **7-day forecast** using the [WeatherAPI](https://www.weatherapi.com/).

## Features ✨

- 🔍 Search weather by city name  
- 🌡️ Display current temperature, condition, and humidity  
- 📅 7-day forecast with icons and daily highs/lows  
- ⚠️ Error handling for invalid or empty city inputs  
- 💾 LocalStorage support to persist last searched weather data  
- 🎨 Clean and responsive UI built with Material UI (MUI)  

## Tech Stack 🛠️

- **React 18** – Frontend library for building the UI  
- **Vite** – Fast build tool and dev server  
- **Material UI (MUI)** – Component library for responsive design  
- **WeatherAPI** – External API for real-time weather and forecasts  
- **LocalStorage** – Browser storage for persisting last searched results  

## Concepts Practiced 📚

This project helped reinforce several core React and frontend development concepts:

- **React Hooks**
  - `useState` for managing input, city, weather data, and error states  
  - `useEffect` for fetching weather data when the city changes  

- **API Integration**
  - Fetching real-time and 7-day forecast data from [WeatherAPI](https://www.weatherapi.com/)  
  - Handling async/await and error states during API requests  

- **Component-Based Architecture**
  - Breaking down UI into reusable components:
    - `Form` for user input
    - `CurrentWeather` for displaying current weather conditions
    - `Forecast` for rendering 7-day forecast cards  

- **LocalStorage**
  - Saving the last fetched weather data for persistence across page refreshes  

- **Material-UI (MUI)**
  - Using prebuilt components (`Card`, `Typography`, `Box`, `Button`, `TextField`, `Container`)  
  - Applying layout props like `flex`, `gap`, `justifyContent`, `alignItems` for responsive design  

- **Error Handling**
  - Graceful fallback messaging for invalid or failed city lookups  

- **Clean UI Design**
  - Using a color palette and typography choices for readability and consistency  
  - Responsive layout ensuring forecasts display in a single row

## Installation ⚙️

1. **Clone the repository**  
   ```bash
   git clone https://github.com/Harrison-Holt/Weather-App.git
   cd weather-app
   
2. **Install dependencies**
  ```bash
 npm install
  ```
4. **Set up environment variables**
  Create a .env file in the project root
  Add your WeatherAPI key:
  ```bash
  VITE_WEATHER_API_KEY=your_api_key_here
  ```

4. **Run the development server**
```bash
npm run dev
```
5. **Open the app in your browser at:**
```bash
http://localhost:5173/
```
## Final Notes ✨

This project was built as a supporting portfolio piece to demonstrate React fundamentals, API integration, and UI design using Material-UI.  

It reflects my growth as a developer — from managing state and effects, to breaking components into smaller parts, to adding persistence with localStorage.  
I’m proud of how far this app has come, and I look forward to continuing to refine my skills with larger projects and more advanced concepts like TypeScript and Next.js. 🚀

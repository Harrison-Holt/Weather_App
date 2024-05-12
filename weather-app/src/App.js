import React from 'react'; 
import './App.css';
import Footer from './UI/Footer.js'; 
import Header from './UI/Header.js'; 
import Homepage from './Pages/Homepage.js'; 

function App() {
  return (
    <div>
     <Header />
     <Homepage />
     <Footer />
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import SellPhone from './pages/SellPhone';
import './App.css';

function App() {
    // Debug logging for Vercel
    console.log('🔧 App component loaded');
    console.log('🔧 Environment variables:', {
        scriptURL: process.env.REACT_APP_GOOGLE_SCRIPT_URL,
        nodeEnv: process.env.NODE_ENV
    });

    return (
        <HelmetProvider>
            <Router>
                <div className="App">
                    <Header />
                    <main role="main">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/sell-phone" element={<SellPhone />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App;
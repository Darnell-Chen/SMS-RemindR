import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import AboutUs from './components/Home/Accordian/AboutUs';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={
                        <>
                            <Home />
                            <AboutUs />
                        </>
                    }/>
            </Routes>
        </Router>
    )
}

export default App;
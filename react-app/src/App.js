import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import AboutUs from './components/Home/Accordian/AboutUs';
import NavBar from './components/navbar';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route exact path="/" element={
                    <>
                        <Home />
                        <AboutUs />
                    </>
                } />

                <Route exact path="/dashboard" element={
                    <>
                        <Dashboard />
                    </>
                } />
            </Routes>
        </Router>
    );
}

export default App;
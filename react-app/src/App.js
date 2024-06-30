import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import AboutUs from './components/Home/Accordian/AboutUs';
import NavBar from './components/navbar';
import Dashboard from './components/Dashboard/Dashboard';

// mui documentatio suggests placing the datetime providers at the top of parent tree for rendering
// I'll just place it in App.js since it's what they did
// https://mui.com/x/react-date-pickers/getting-started/
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Dashboard />
                        </LocalizationProvider>

                    </>
                } />
            </Routes>
        </Router>
    );
}

export default App;
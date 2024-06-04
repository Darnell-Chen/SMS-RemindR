import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavBar from './components/navbar';
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('nav-root'));
const body = ReactDOM.createRoot(document.getElementById('body-root'));
// for now, we don't render anything in react
root.render(
    <NavBar/>
);

body.render(
  <App/>
)

import React from 'react';
import { render } from "react-dom";
import './index.css';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import UploadPage from './Pages/UploadPage'
import reportWebVitals from './reportWebVitals';

//routers
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const root = document.getElementById('root');
render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/about" element={<AboutPage />}></Route>
        
        <Route path="/contact" element={<ContactPage />}></Route>
          
        <Route path="/upload" element={<UploadPage />}></Route>

        <Route path="/" element={<HomePage />}></Route>

      </Routes>
    </Router>
  </React.StrictMode>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

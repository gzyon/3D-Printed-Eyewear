import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import ModelPage from './Pages/ModelPage';
import UploadPage from './Pages/UploadPage'
import reportWebVitals from './reportWebVitals';

//routers
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import CaseCustomisation from './Pages/CaseCustomisation';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/model" element={<ModelPage />}></Route>

        <Route path="/about" element={<AboutPage />}></Route>
        
        <Route path="/contact" element={<ContactPage />}></Route>
          
        <Route path="/upload" element={<UploadPage />}></Route>

        <Route path="/case" element={<CaseCustomisation />}></Route>

        <Route path="/" element={<HomePage />}></Route>

      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import UploadPage from './Pages/UploadPage'
//routers
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        

          <Routes>
            <Route path="/about" element={<AboutPage />}></Route>
            
            <Route path="/contact" element={<ContactPage />}></Route>
              
            <Route path="/upload" element={<UploadPage />}></Route>

            <Route path="/" element={<HomePage />}></Route>

          </Routes>
    </Router>
  );
}

export default App;

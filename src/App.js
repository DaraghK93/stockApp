import './App.css';
import {BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import {useState} from 'react';
import Header from './components/layout/Header/header'
import Footer from './components/layout/Footer/footer'
import RegistrationPage from './screens/registration/registrationScreen'
import LoginPage from './screens/login/loginscreen'



function App() {
  return (
    
    <Router> 
      <Header />
      <Routes>
        <Route path="/register" element={<RegistrationPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}
export default App
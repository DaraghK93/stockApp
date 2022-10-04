import './App.css';
import { API } from 'aws-amplify';
import {BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import {useState} from 'react';
import Header from './components/layout/Header/header';
import Footer from './components/layout/Footer/footer';
import RegistrationPage from './screens/registration/registrationScreen'


function App() {
  return (
    
    <Router> 
      <Header />
      <Routes>
        <Route path="/register" element={<RegistrationPage/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
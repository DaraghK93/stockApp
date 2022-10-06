import './App.css';
import {BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import {useState} from 'react';
import Header from './components/layout/Header/header'
import Footer from './components/layout/Footer/footer'
<<<<<<< HEAD
import StockDiscoveryPage from './screens/stockDiscovery/stockDiscoveryScreen';
=======
import RegistrationPage from './screens/registration/registrationScreen'
import LoginPage from './screens/login/loginscreen'
>>>>>>> 1fc69ed521bf748b2548d60e9cf82c019be7b67e



function App() {
  return (
    
    <Router> 
      <Header />
      <Routes>
<<<<<<< HEAD
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/stockdiscovery" element={<StockDiscoveryPage/>}/>
=======
        <Route path="/register" element={<RegistrationPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
>>>>>>> 1fc69ed521bf748b2548d60e9cf82c019be7b67e
      </Routes>
      <Footer />
    </Router>
  );
}
export default App
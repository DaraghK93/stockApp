import './App.css';
import {BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import Header from './components/layout/Header/header'
import Footer from './components/layout/Footer/footer'
import StockDiscoveryPage from './screens/stockDiscovery/stockDiscoveryScreen';
import RegistrationPage from './screens/registration/registrationScreen'
import LoginPage from './screens/login/loginscreen'



function App() {
  return (
    
    <Router> 
      <Header />
      <Routes>
      <Route path="/stockdiscovery" element={<StockDiscoveryPage/>}/>
        <Route path="/register" element={<RegistrationPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}
export default App
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './components/layout/Header/header'
import Footer from './components/layout/Footer/footer'
import RegistrationPage from './screens/registration/registrationScreen'
import LoginPage from './screens/login/loginscreen'
import StockDiscoveryPage from './screens/stockDiscovery/stockDiscoveryScreen';



function App() {
  return (
    
    <Router> 
      <Header />
      <Routes>
        <Route path='/' element={<RegistrationPage/>}/>
        <Route path="/register" element={<RegistrationPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/stockdiscovery" element={<StockDiscoveryPage/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}
export default App
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/header';
import RegistrationPage from './screens/registration/registrationScreen';
import LoginPage from './screens/login/loginscreen';
import StockDiscoveryPage from './screens/stockDiscovery/stockDiscoveryScreen';
import StockPage from './screens/stockpage/StockPage';
import OrderConfirmationPage from './screens/orderConfirmation/orderConfirmation';
import NotFound from './screens/errorScreens/notFound';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path='/' element={<RegistrationPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/login' element={<LoginPage />} />

        <Route path='/stockdiscovery/' element={<StockDiscoveryPage />} />
        <Route path='/search/stock/:keyword' element={<StockDiscoveryPage/>}/>

        <Route path='/stock/:symbol' element={<StockPage />} />
        <Route path='/stock/:symbol/confirmorder' element={<OrderConfirmationPage />} />
      </Routes>
    </Router>
  );
}
export default App;

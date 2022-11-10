import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header/header';
import RegistrationPage from './screens/registration/registrationScreen';
import LoginPage from './screens/login/loginscreen';
import StockDiscoveryPage from './screens/stockDiscovery/stockDiscoveryScreen';
import StockPage from './screens/stockpage/StockPage';
import OrderConfirmationPage from './screens/orderConfirmation/orderConfirmation';
import NotFound from './screens/errorScreens/notFound';
import MyPortfolios from './screens/myPortfolios/myPortfolios';
import CreatePortfolio from './screens/createPortfolio/createPortfolio';
import HomeScreen from './screens/home/homeScreen';
import GameScreen from './screens/gameScreen/gameScreen';
import PortfolioPage from './screens/portfolio/portfolio';

/// Redux ///
import { useSelector } from 'react-redux';

function App() {
  /// Get the user state from redux, will be used to see if user is logged in  
  const user = useSelector((state) => state.user)
  const { userInfo } = user;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path='/'
          element={userInfo ? <Navigate to="/stockdiscovery" /> : <HomeScreen />} />

        <Route path='/register'
          element={userInfo ? <Navigate to="/stockdiscovery" /> : <RegistrationPage />} />

        <Route path='/login'
          element={userInfo ? <Navigate to="/stockdiscovery" /> : <LoginPage />} />

        <Route path='/stockdiscovery/'
          element={userInfo ? <StockDiscoveryPage /> : <Navigate to="/" />} />

        <Route path='/search/stock/:keyword'
          element={userInfo ? <StockDiscoveryPage /> : <Navigate to="/" />} />

        <Route path='/stock/:symbol'
          element={userInfo ? <StockPage /> : <Navigate to="/" />} />

        <Route path='/game'
          element={userInfo ? <GameScreen/> : <Navigate to="/"/>} />
        

        <Route path="/stock/:symbol/confirmorder"
          element={userInfo ? <OrderConfirmationPage /> : <Navigate to="/" />} />

        <Route path='/myportfolios'
          element={userInfo ? <MyPortfolios /> : <Navigate to="/" />} />

        <Route path='/createportfolio'
          element={userInfo ? <CreatePortfolio /> : <Navigate to="/" />} />

        <Route path='/portfolio'
          element={userInfo ? <PortfolioPage /> : <Navigate to="/" />} />


      </Routes>
    </Router>
  );
}

export default App;

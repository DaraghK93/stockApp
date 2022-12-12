import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header/header';
import RegistrationPage from './screens/registration/registrationScreen';
import LoginPage from './screens/login/loginscreen';
import StockDiscoveryPage from './screens/stockDiscovery/stockDiscoveryScreen';
import StockPage from './screens/stockpage/StockPage';
import OrderConfirmationPage from './screens/orderConfirmation/orderConfirmation';
import NotFound from './screens/errorScreens/notFound';
import HomeScreen from './screens/home/homeScreen';
import GameScreen from './screens/gameScreen/gameScreen';
import CreateGameScreen from './screens/createGameScreen/CreateGameScreen';
import RequestResetPassword from './screens/resetPassword/requestResetPassword'
import ResetPage from './screens/resetPassword/resetPassword'
import FAQsPage from './screens/faqs/faqs'
import IndividualGameScreen from './screens/individualGameScreen/IndividualGameScreen';
import UserSettingsPage from './screens/userSettingsScreen/UserSettingsPage'
import WelcomePage from './screens/welcomeScreen/welcomePage';

/// React ///
import { useEffect } from 'react';

/// Redux ///
import { useSelector,useDispatch } from 'react-redux';
import {verifyJWT} from './actions/userActions';
import LoadingSpinner from './components/widgets/LoadingSpinner/LoadingSpinner';
import {updateActivePortfolios} from './actions/portfolioActions';

function App() {
  /// Get the user state from redux, will be used to see if user is logged in  
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { userInfo } = user;
  /// validJWT state is used for validating the JWT token 
  const validJWT = useSelector((state) => state.validJWT)
  const {loading} = validJWT;

   useEffect(() => {
        /// If the user is logged in 
        if (userInfo){
          /// Need to check the valididty of the usersInfo token  
          dispatch(verifyJWT(userInfo.token))  
          /// Set the active portfolio state 
          dispatch(updateActivePortfolios(userInfo.token))   
        }
    },[dispatch,userInfo])


  /// loading is from the validJWT redux state 
  return (
    <>
    {loading ? <LoadingSpinner/>
    :
    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path='/'
          element={userInfo ? <Navigate to="/stockdiscovery" /> : <HomeScreen />} />

        <Route path='/register'
          element={userInfo ? <Navigate to="/welcome" /> : <RegistrationPage />} />

        <Route path='/login'
          element={userInfo ? <Navigate to="/game" /> : <LoginPage />} />

        <Route path='/stockdiscovery/'
          element={userInfo ? <StockDiscoveryPage /> : <Navigate to="/" />} />

        <Route path='/search/stock/:keyword'
          element={userInfo ? <StockDiscoveryPage /> : <Navigate to="/" />} />

        <Route path='/stock/:symbol'
          element={userInfo ? <StockPage /> : <Navigate to="/" />} />

        <Route path='/game'
          element={userInfo ? <GameScreen /> : <Navigate to="/" />} />

        <Route path='/game/creategame'
          element={userInfo ? <CreateGameScreen /> : <Navigate to="/" />} />

        <Route path='/game/:gameId'
          element={userInfo ? <IndividualGameScreen /> : <Navigate to="/" />} />

        <Route path="/stock/:symbol/confirmorder"
          element={userInfo ? <OrderConfirmationPage /> : <Navigate to="/" />} />
        
        <Route path='/faqs'
          element={userInfo ? <FAQsPage /> : <Navigate to="/" />} />

        <Route path='/welcome'
          element={userInfo ? <WelcomePage /> : <Navigate to="/" />} />

        <Route path='/auth/recover' element={ <RequestResetPassword/> } />
        
        <Route path='/auth/reset/:token' element={ <ResetPage/> } />

        <Route path='/settings'
          element={userInfo ? <UserSettingsPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
    }
    </>
  );
}

export default App;

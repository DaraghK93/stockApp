import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './components/layout/Header/header'
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
    </Router>
  );
}
export default App
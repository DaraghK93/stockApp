import './App.css';
// import { API } from 'aws-amplify';
import {BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
// import {useState} from 'react';
import {useState} from 'react';
import Header from './components/Header/header'
import LoginPage from './screens/login/loginscreen'
import Footer from './components/layout/Footer/footer'



function App() {
  return (
    
    <Router> 
            <Header />
      <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
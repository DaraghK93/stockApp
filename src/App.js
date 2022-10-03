import './App.css';
// import { API } from 'aws-amplify';
import {BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
// import {useState} from 'react';

import LoginPage from './screens/login/loginscreen';

function App() {
  return (
    <Router> 
      <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}
export default App;

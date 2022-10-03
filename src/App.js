import './App.css';
import { API } from 'aws-amplify';
import {BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import {useState} from 'react';
import Header from './components/layout/Header/header';
import Footer from './components/layout/Footer/footer';



function App() {
  return (
    
    <Router> 
      <Header />
      <Footer />
    </Router>
  );
}
export default App;
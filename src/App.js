import './App.css';
import { API } from 'aws-amplify';
import {BrowserRouter as Router,Routes,Route,Navigate, BrowserRouter } from 'react-router-dom'
import {useState} from 'react';
import Header from './components/Header/header';



function App() {
  return (
    
    <Router> 
      <Header />
      
    </Router>
  );
}
export default App;
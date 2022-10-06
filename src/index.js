import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify} from 'aws-amplify';
import awsExports from './aws-exports';
import { Provider } from 'react-redux';/// Redux ///
import store from './store'
import '../node_modules/bootstrap/dist/css/bootstrap.css';

const feather = require('feather-icons')

// Configure amplify/// 
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

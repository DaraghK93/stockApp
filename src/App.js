import './App.css';
import { API } from 'aws-amplify';
import {useState} from 'react';


const apiName = 'stockapi'
const myInit = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {  // OPTIONAL
        name: 'param',
    },
};

function App() {
  const [stock, setStock] = useState([])


  function getStocks(e){
    e.preventDefault();
    API
      .get(apiName,'/stock', myInit)
      .then(response => {
        console.log(response)
        setStock(response.data.success)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="App">
      <h1>Stock Application</h1> 
      <button onClick={getStocks}>
        Make a GET request to stocks
      </button>
      <p>{stock}</p>
    </div>
  );
}

export default App;

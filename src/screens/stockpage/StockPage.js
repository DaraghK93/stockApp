/// Individual Stock Page ///
// Route:
//  <URL>/stock....
// Description:
//  This screen contains the components rendered to the user when they click on an individual stock 

import { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import StockPriceChart from "../../components/stockVisualisationComponents/StockPriceChart/StockPriceChart";
import StockESGChart from "../../components/stockVisualisationComponents/StockESGChart/StockESGChart";

/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";



function StockPage() {

    const [loading, setLoading] = useState(true);
    const [stock, setStock] = useState('');
    const [error, setError] = useState("");

    useEffect(() => {
        /// getStock ///
        // Description:
        //  Makes a GET request to the backend route /stock/
        // this currently is only retrieving one hard coded stock. I will sort out the rest of this later
        const getStocks = async () => {
            try {
                // Request is being sent set loading true 
                setLoading(true);
                // Set the path 
                let path = '/api/stock/MMM'
                // Send the request with API package
                const res = await API.get(APIName, path)
                // Set the state for the stocks and loading to false 
                setStock(res[0]);
                setLoading(false);
            } catch (error) {
                // Log the error 
                console.log(error);
                // Set the error message to be displayed on the page 
                setError(error.response.data.errormessage);
                setLoading(false);
            }
        }
        getStocks();
    }, [])

    return (

        <>
            <Container>
                <h1>{stock.longname}</h1>
                <h2>{stock.symbol}</h2>
                <h1>${stock.currentprice}</h1>
                <h4>+$50 (25%)</h4>
                <br></br>
                <StockPriceChart />

                <p>Filter By: <button>Day</button> <button>Month</button> <button>Year</button> <button>5 Years</button></p>
                <br></br>
                <StockESGChart />
            </Container>


        </>
    )
};


export default StockPage;
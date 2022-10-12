/// Individual Stock Page ///
// Route:
//  <URL>/stock....
// Description:
//  This screen contains the components rendered to the user when they click on an individual stock 

import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import StockPriceChart from "../../components/stockVisualisationComponents/ChartTypes/PriceChart/PriceChart";
import ChartCard from '../../components/stockVisualisationComponents/ChartCard/ChartCard';


/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";

function StockPage() {

    const [loading, setLoading] = useState(true);
    const [stock, setStock] = useState('');
    const [error, setError] = useState("");

    useEffect(() => {
        /// getStockInfo ///
        // Description:
        //  Makes a GET request to the backend route /stock/:symbol
        const getStockInfo = async () => {
            try {
                // Request is being sent set loading true 
                setLoading(true);
                // get the symbol from the url string, use regex to extract
                const symbol = window.location.href.replace(/[^A-Z]/g, '');
                // Set the path 
                let path = `/api/stock/${symbol}`
                // Send the request with API package
                const res = await API.get(APIName, path)
                // Set the state for the stock and loading to false 
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
        getStockInfo();
    }, [])

    return (

        <>
            <Container>
                <Row>
                    <Col className="stockInfoCol">
                        <img src={stock.logo} className="img-fluid" alt="Company Logo" />
                        <h1>{stock.longname}</h1>
                        <h2>{stock.symbol}</h2>
                        <h2>$200 </h2>
                        <h4>+$50 (25%)</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <StockPriceChart />
                    </Col>
                </Row>
                <Row lg={3} md={2} xs={1}>
                <Col sm md={8} className="stockInfoCol">
                        <ChartCard title={"ESG Rating"} />
                    </Col>
                    <Col sm md={8} className="stockInfoCol">
                        <ChartCard title={"News Sentiment"} />
                    </Col>
                    <Col sm md={8} className="stockInfoCol">
                        <ChartCard title={"Twitter Sentiment"} />
                    </Col>
                </Row>
            </Container>
        </>
    )
};


export default StockPage;
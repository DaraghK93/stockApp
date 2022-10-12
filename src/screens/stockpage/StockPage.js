/// Individual Stock Page ///
// Route:
//  <URL>/stock/:symbol
// Description:
//  This screen contains the components rendered to the user when they click on an individual stock 

import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import StockPriceChart from "../../components/stockVisualisationComponents/ChartTypes/PriceChart/PriceChart";
import ChartCard from '../../components/stockVisualisationComponents/ChartCard/ChartCard';
import PlainCard from '../../components/stockVisualisationComponents/PlainCard/PlainCard';

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
                // get the symbol from the url string, use regex to extract capital letters only
                const symbol = window.location.href.replace(/[^A-Z]/g, '');
                // Set the path and use symbol to get single stock
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
                    <PlainCard 
                    longname={stock.longname}
                    symbol={stock.symbol}
                    logo={stock.logo}
                    info={stock.longbusinesssummary}
                    />
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
                <Row>
                    <Col sm md={8} className="stockInfoCol">
                    </Col>
                </Row>
            </Container>
        </>
    )
};


export default StockPage;
/// Individual Stock Page ///
// Route:
//  <URL>/stock....
// Description:
//  This screen contains the components rendered to the user when they click on an individual stock 

import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import StockPriceChart from "../../components/stockVisualisationComponents/ChartTypes/AreaChartViz/AreaChartViz";
import ChartCard from '../../components/stockVisualisationComponents/ChartCard/ChartCard';

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
                <Row sm>
                    <Col style={{ marginBottom: "10px" }}>
                        <h1>{stock.longname}</h1>
                        <h2>{stock.symbol}</h2>
                        <h2>$200</h2>
                        <h4>+$50 (25%)</h4>
                    </Col>
                </Row>
                <Row lg md xs>
                    <Col style={{ marginBottom: "10px" }}>
                        <StockPriceChart />
                    </Col>
                </Row>
                <Row lg={3} md={2} xs={1}>
                    <Col sm md={4} style={{ marginBottom: "10px" }}>
                        <ChartCard title={"ESG Rating"} />
                    </Col>
                    <Col sm md={4} style={{ marginBottom: "10px" }}>
                        <ChartCard title={"News Sentiment"} />
                    </Col>
                    <Col sm md={4} style={{ marginBottom: "10px" }}>
                        <ChartCard title={"Twitter Sentiment"} />
                    </Col>
                </Row>
            </Container>
        </>
    )
};


export default StockPage;
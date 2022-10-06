/// Stock Discovery Screen ///
// Route:
//  <URL>/stockdiscovery
// Description:
//  This screen contains the components rendered to the user when they click "Explore stocks"

import { Container, Card, Row, Col } from 'react-bootstrap';
import TickerCard from '../../components/stockDiscoveryComponents/tickercard/Tickercard';
import StockSearchBar from '../../components/stockDiscoveryComponents/stockSearchBar/StockSearchBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert';

function StockDiscoveryPage() {

    const [loading, setLoading] = useState(true);
    const [stocks, setStock] = useState('');
    const [error, setError] = useState("");


    useEffect(() => {
        /// getStocks ///
        // Description:
        //  Makes a GET request to the backend route /stock/ 
        const getStocks = async () => {
            try {
                // Request is being sent set loading true 
                setLoading(true);

                let stockRequest = {
                    method: 'get',
                    url: `http://localhost:3000/api/stock`
                }
                // Send the request with axios
                const res = await axios(stockRequest);
                // Set the state for the stocks and loading to false 

                setStock(res.data);
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
            {loading ? <LoadingSpinner /> : error ? <MessageAlert variant='danger'>{error}</MessageAlert> :
                <Container>
                    <h1>Stock Discovery Page</h1>
                    <h2> Search/ Filter stocks</h2>
                    <StockSearchBar />
                    <br />
                    <h2>Suggested Stocks</h2>
                    <h2>Top Movers</h2>
                    <h2>Compare Stocks</h2>

                    <Card.Body>
                        <Card.Title><h2>All Stocks</h2></Card.Title>
                        {stocks.length > 0 ? (
                            <Row md={4} xs={1}>
                                {stocks.map((stockObj) => (
                                    <Col className="py-2" key={stockObj._id}>
                                        <TickerCard stock={stockObj} />
                                    </Col>
                                ))}
                            </Row>)
                            : <Card.Text>
                                Error Loading stocks
                            </Card.Text>}
                    </Card.Body>
                </Container>
            }
        </>
    )
}

export default StockDiscoveryPage;
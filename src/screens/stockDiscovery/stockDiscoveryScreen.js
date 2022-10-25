/// Stock Discovery Screen ///
// Route:
//  <URL>/stockdiscovery
// Description:
//  This screen contains the components rendered to the user when they click "Explore stocks"

import { Container, Row, Col } from 'react-bootstrap';
import TickerCard from '../../components/stockDiscoveryComponents/tickercard/Tickercard';
import StockSearchBar from '../../components/stockDiscoveryComponents/stockSearchBar/StockSearchBar';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert';
import { useParams } from 'react-router-dom';
/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";
import StockSideScrollMenu from '../../components/stockDiscoveryComponents/stockSideScrollMenu/stockSideScrollMenu';

function StockDiscoveryPage() {

    const [loading, setLoading] = useState(true);
    const [stocks, setStock] = useState('');
    const [error, setError] = useState("");

    let { category, keyword } = useParams()

    useEffect(() => {
        /// getStocks ///
        // Description:
        //  Makes a GET request to the backend route /stock/ 
        const getStocks = async () => {
            try {
                // Request is being sent set loading true 
                setLoading(true);
                // Set the path 
                let path = `/api/stock?category=${category}&keyword=${keyword}`
                // Send the request with API package
                const res = await API.get(APIName, path)
                // Set the state for the stocks and loading to false 
                setStock(res)
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
    }, [category, keyword])


    return (
        // check if category param is summary, then bring them to main page with stock discover
        // in side scrolling ribbons
        // if not then brings them to all stocks page. this will change when search is implemented
        <>
            {loading ? <LoadingSpinner /> : error ? <MessageAlert variant='danger'>{error}</MessageAlert> :
                category === "summary" ?
                    <Container>
                        <h1>Stock Discovery Page</h1>
                        <StockSearchBar />

                        <Row md={1} xs={1} style={{paddingLeft:"0.625rem", paddingRight:"0.625rem"}}>
                            <h3 className="stockdiscoveryRow">Companies That Are Good For The Environment</h3>
                            <StockSideScrollMenu data={stocks[0].topEnvironment} />
                            <h3 className="stockdiscoveryRow">Companies That Are Good For The Environment</h3>
                            <StockSideScrollMenu data={stocks[0].topSocial} />
                            <h3 className="stockdiscoveryRow">Companies That Are Good For The Environment</h3>

                            <StockSideScrollMenu data={stocks[0].topGovernance} />

                        </Row>
                    </Container> :

                    <Container>
                        <h1>Stock Discovery Page</h1>
                        <h2>Showing results for :"{keyword}"</h2>
                        <StockSearchBar />
                        <Row md={4} xs={1}>
                            {stocks.map((stockObj) => (
                                <Col className="py-2" key={stockObj._id}>
                                    <TickerCard stock={stockObj} />
                                </Col>
                            ))}
                        </Row>
                    </Container>

            }
        </>
    )
}
export default StockDiscoveryPage;
import LoadingSpinner from "../../components/widgets/LoadingSpinner/LoadingSpinner";
import MessageAlert from "../../components/widgets/MessageAlert/MessageAlert";
import { Container, Row, Col } from "react-bootstrap";
import BottomStickyButton from "../../components/widgets/BottomStickyButton/BottomStickyButton";
import { useState, useEffect } from 'react';
/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";


function OrderConfirmationPage() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [stock, setStock] = useState('');

    useEffect(() => {
        /// getStockInfo ///
        // Description:
        //  Makes a GET request to the backend route /stock/:symbol
        const getStockInfo = async () => {
            try {
                // Request is being sent set loading true   
                setLoading(true);
                // get the symbol from the url string, use regex to extract capital letters only
                // const symbol = window.location.href.replace(/[^A-Z]/g, '');
                // Set the path and use symbol to get single stock

                // let path = `/api/stock/${symbol}`

                let path = `/api/stock/MSFT`
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
            {loading ? <LoadingSpinner /> : error ? <MessageAlert variant='danger'>{error}</MessageAlert> :
                <Container>
                    <Row>
                        <Col className="col-md-3 col-sm-3 col-3">
                            <img src={stock.logo} className="img-fluid" alt="Company Logo" style={{ width: "100%", paddingTop: "1.25rem" }} />
                        </Col>
                        <Col className="stockInfoCol col-md-4 col-sm-8 col-5">
                            <dl className='infoList'>
                                <dt>
                                    <h1>
                                        {stock.longname}</h1>
                                </dt>
                                <dt>{stock.symbol}</dt>
                                <dt style={{ fontSize: "150%" }}>${stock.daily_change.currentprice}</dt>
                            </dl>
                        </Col>
                    </Row>
                    <Row>
                        <h5>Buy//Sell</h5>
                        <h5>Order Type</h5>
                        <h5>Quantity</h5>
                        <h5>New Portfolio Balance</h5>
                        <h5>Order Summary</h5>
                    </Row>
                    <BottomStickyButton text="Confirm Order"></BottomStickyButton>
                </Container>
            }
        </>
    )
}

export default OrderConfirmationPage;
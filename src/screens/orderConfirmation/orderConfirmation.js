import LoadingSpinner from "../../components/widgets/LoadingSpinner/LoadingSpinner";
import MessageAlert from "../../components/widgets/MessageAlert/MessageAlert";
import { Container, Row, Col } from "react-bootstrap";
import BottomStickyButton from "../../components/widgets/BottomStickyButton/BottomStickyButton";
import { useState, useEffect } from 'react';
import QuantitySelect from "../../components/confirmOrderComponents/QuantitySelect";
import OrderType from "../../components/confirmOrderComponents/OrderType";
import BuyOrSellButton from "../../components/confirmOrderComponents/BuyOrSellButton";
/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";


function OrderConfirmationPage() {

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
                setStock(res)
                setLoading(false)
            } catch (error) {
                // Set the error message to be displayed on the page 
                setError(error.response.data.errormessage)
                setLoading(false)
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
                        <Col className="stockInfoCol col-md-4 col-sm-8 col-6">
                            <dl className='infoList'>
                                <dt>
                                    <h1>
                                        {stock.longname}
                                    </h1>
                                </dt>
                                <dt>{stock.symbol}</dt>
                                <dt style={{ fontSize: "150%" }}>${stock.daily_change.currentprice}</dt>
                            </dl>
                        </Col>
                    </Row>
                    <Row xl={3} lg={2} md={2} xs={1}>
                        <Col style={{ marginBottom: "0.625rem" }}>
                            <BuyOrSellButton />
                        </Col>
                        <Col style={{ marginBottom: "0.625rem" }}>
                            <OrderType />
                        </Col>
                        <Col style={{ marginBottom: "0.625rem" }}>
                            <QuantitySelect portfolioBalance={2000} stockPrice={stock.daily_change.currentprice} />
                        </Col>
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
import LoadingSpinner from "../../components/widgets/LoadingSpinner/LoadingSpinner";
import MessageAlert from "../../components/widgets/MessageAlert/MessageAlert";
import { Container, Row, Col } from "react-bootstrap";
import BottomStickyButton from "../../components/widgets/BottomStickyButton/BottomStickyButton";
import { useState, useEffect } from 'react';
import QuantitySelect from "../../components/confirmOrderComponents/QuantitySelect";
import OrderType from "../../components/confirmOrderComponents/OrderType";
import BalanceComponent from "../../components/confirmOrderComponents/balanceComponent";
import OrderSummary from "../../components/confirmOrderComponents/OrderSummary";
import LimitQuantitySelect from "../../components/confirmOrderComponents/LimitQuantitySelect";
import LimitPriceSelect from "../../components/confirmOrderComponents/LimitPriceSelect";
import PortfolioSelectionDropdown from "../../components/portfolioComponents/portfolioSelectionDropdown/portfolioSelectionDropdown";

/// Redux ///
import {useSelector} from 'react-redux';

/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";


function OrderConfirmationPage() {

    const portfolioBalance = 2000
    const [loading, setLoading] = useState(true);
    const [stock, setStock] = useState('');
    const [error, setError] = useState("");
    const [newPortfolioBalance, setNewPortfolioBalance] = useState(portfolioBalance)
    const [amountSelected, setAmountSelected] = useState("")
    const [buyOrSell, setBuyOrSell] = useState("Buy");
    const [orderType, setOrderType] = useState("Market Order");
    const [qty, setQty] = useState("");
    const [isShownMarketOrder, setIsShownMarketOrder] = useState(false)
    const [isShownLimitOrder, setIsShownLimitOrder] = useState(false)
    const [limitPrice, setLimitPrice] = useState(0)
    const [portfolioId, setPortfolioId] = useState()

    /// Redux ///
    const portfolios = useSelector((state) => state.portfolios)
    const { activePortfolios } = portfolios;


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

    useEffect(() => {
        if (orderType === "Market Order") {
            setIsShownMarketOrder(true)
            setIsShownLimitOrder(false)
        }
        else if (orderType === "Limit Order") {
            setIsShownMarketOrder(false)
            setIsShownLimitOrder(true)
        }

    }, [orderType])


    useEffect(() => {
        console.log("Called")
        console.log(portfolioId)
    },[portfolioId])




    

    return (
        <>
            {loading ? <LoadingSpinner /> : error ? <MessageAlert variant='danger'>{error}</MessageAlert> :
                <Container>
                    <Row md={3} sm={2} xs={2}>
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
                                <dt style={{ fontSize: "150%" }}>${stock.daily_change.currentprice.toFixed(2)}
                                </dt>
                            </dl>
                        </Col>
                        <Col>
                            <PortfolioSelectionDropdown portfolios={activePortfolios} state={portfolioId} setState={setPortfolioId}/>
                        </Col>
                    </Row>
                    <Col style={{ marginBottom: "0.625rem" }}>
                        <OrderType
                            setBuyOrSell={setBuyOrSell}
                            setOrderType={setOrderType}
                        />
                    </Col>
                    {isShownMarketOrder &&
                        <>
                            <Col style={{ marginBottom: "0.625rem" }}>
                                <QuantitySelect
                                    portfolioBalance={portfolioBalance}
                                    stockprice={stock.daily_change.currentprice}
                                    setNewPortfolioBalance={setNewPortfolioBalance}
                                    setAmountSelected={setAmountSelected}
                                    setQty={setQty}
                                />
                            </Col>
                            <Col style={{ marginBottom: "0.625rem" }}>
                                <BalanceComponent
                                    portfolioBalance={portfolioBalance}
                                    newPortfolioBalance={newPortfolioBalance}
                                    amountSelected={amountSelected}
                                />
                            </Col>
                        </>
                    }
                    {isShownLimitOrder &&
                        <>
                            <Col style={{ marginBottom: "0.625rem" }}>
                                <LimitQuantitySelect
                                    portfolioBalance={portfolioBalance}
                                    setQty={setQty}
                                    limitPrice={limitPrice}
                                    setAmountSelected={setAmountSelected}
                                    setNewPortfolioBalance={setNewPortfolioBalance}
                                />
                            </Col>
                            <Col style={{ marginBottom: "0.625rem" }}>
                                <LimitPriceSelect
                                    portfolioBalance={portfolioBalance}
                                    setAmountSelected={setAmountSelected}
                                    qty={qty}
                                    setLimitPrice={setLimitPrice}
                                    setNewPortfolioBalance={setNewPortfolioBalance}
                                />
                            </Col>
                        </>
                    }
                    <Col style={{ marginBottom: "0.625rem" }}>
                        <OrderSummary
                            buyOrSell={buyOrSell}
                            orderType={orderType}
                            newPortfolioBalance={newPortfolioBalance}
                            amountSelected={amountSelected}
                            qty={qty}
                        />
                    </Col>
                    <BottomStickyButton text="Confirm Order"></BottomStickyButton>
                    <div className='footerStyle'></div>
                </Container>
            }
        </>
    )
}

export default OrderConfirmationPage;
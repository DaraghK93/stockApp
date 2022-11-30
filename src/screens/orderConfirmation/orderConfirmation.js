import LoadingSpinner from "../../components/widgets/LoadingSpinner/LoadingSpinner";
import MessageAlert from "../../components/widgets/MessageAlert/MessageAlert";
import { Container, Row, Col } from "react-bootstrap";
import BottomStickyButton from "../../components/widgets/BottomStickyButton/BottomStickyButton";
import { useState, useEffect } from 'react';
import QuantitySelect from "../../components/confirmOrderComponents/QuantitySelect";
import OrderType from "../../components/confirmOrderComponents/OrderType";
import BalanceComponent from "../../components/confirmOrderComponents/balanceComponent";
import LimitQuantitySelect from "../../components/confirmOrderComponents/LimitQuantitySelect";
import LimitPriceSelect from "../../components/confirmOrderComponents/LimitPriceSelect";
import PortfolioSelectionDropdown from "../../components/portfolioComponents/portfolioSelectionDropdown/portfolioSelectionDropdown";
import AreYouSure from "../../components/confirmOrderComponents/AreYouSure";

import {useNavigate} from "react-router-dom"

/// Redux ///
import {useSelector} from 'react-redux';

/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";


function OrderConfirmationPage() {


    /// Stock State ///
    const [stockLoading, setStockLoading] = useState(true);
    const [stock, setStock] = useState('');
    const [error, setError] = useState("");
    
    /// Order State ////
    const [dollarAmountSelected, setDollarAmountSelected] = useState("")
    const [buyOrSell, setBuyOrSell] = useState("Buy");
    const [orderType, setOrderType] = useState("Market Order");
    const [qty, setQty] = useState("");
    const [isShownMarketOrder, setIsShownMarketOrder] = useState(false)
    const [isShownLimitOrder, setIsShownLimitOrder] = useState(false)
    const [limitPrice, setLimitPrice] = useState(0)
    const [showAreYouSureModal, setShowAreYouSureModal ] = useState(false);
   

    //// Portfolio State ////
    const [portfolio, setPortfolio] = useState({})
    const [portfolioId, setPortfolioId] = useState()
    const [portfolioLoading, setPortfolioLoading] = useState(true)
    const [portfolioError, setPortfolioError] = useState()
    const [newPortfolioBalance, setNewPortfolioBalance] = useState()

    /// Game State ///
    const [gameTradeFee, setGameTradeFee] = useState()

    

    /// Redux State ///
    const portfolios = useSelector((state) => state.portfolios)
    const {activePortfolios, loading} = portfolios;
    const user = useSelector((state) => state.user)
    const { userInfo } = user;
    const userToken = userInfo.token

    /// naviagte - to redirect 
    const navigate = useNavigate()


    useEffect(() => {
        /// getStockInfo ///
        // Description:
        //  Makes a GET request to the backend route /stock/:symbol
        const getStockInfo = async () => {
            try {
                // Request is being sent set loading true   
                setStockLoading(true);
                // get the symbol from the url string, use regex to extract capital letters only
                const symbol = window.location.href.replace(/[^A-Z]/g, '');
                // Set the path and use symbol to get single stock
                let path = `/api/stock/${symbol}`
                // Send the request with API package
                const res = await API.get(APIName, path)
                // Set the state for the stock and loading to false 
                setStock(res)
                setStockLoading(false)
            } catch (error) {
                // Set the error message to be displayed on the page 
                setError(error.response.data.errormessage)
                setStockLoading(false)
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


    /// Portfolio Id 
    useEffect(() => {
        const getPortfolioInfo = async () => {
            try{
                /// Set the portfolio Loading to true and reset error
                setPortfolioLoading(true)
                setPortfolioError()
                let path = `/api/portfolio/${portfolioId}`;
                let myInit = {
                    headers : {"x-auth-token": userToken},       
                }
                /// Send the request 
                const res = await API.get(APIName, path, myInit)
                /// Set the current portfolio 
                setPortfolio({
                    id: res._id,
                    portfolioName: res.portfolioName,
                    portfolioBalance: res.remainder
                })
                setGameTradeFee(res.league.tradingFee)
                /// Set the Iitiliase the new portfolio balance to the remainder of the current 
                setNewPortfolioBalance(res.remainder)
                setPortfolioLoading(false)
            }catch(error){
                console.log(error)
                setPortfolioError(error.response.data.errormessage)
                setPortfolioLoading(false)
            }
        }
        /// Need to set an intial value ///
        if (typeof portfolioId === "undefined" && loading === false){
            /// Add in a savety check here if a user naviagtes to the page by typing in url redirect them to the game screen
            if (activePortfolios.length === 0){
                navigate(`/game`)
            }else{
              /// For now set the current portfolio to the first portfolio may need to revisit this ///
            setPortfolioId(activePortfolios[0].leagueId)  
            }
        }else if(portfolioId){
            /// Get the portfolio data 
            getPortfolioInfo()
        }
    },[portfolioId,activePortfolios,loading, userToken,navigate])
    

    return (
        <>
            {stockLoading || loading || portfolioLoading ? <LoadingSpinner /> : error ? <MessageAlert variant='danger'>{error}</MessageAlert> :
                portfolioError ? <MessageAlert variant='danger'>{portfolioError}</MessageAlert> :
                <Container >
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
                        <Col className="pb-2 pt-3">
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
                    <Row className="my-2" sm={1} md={1} >
                            <Col>
                                <QuantitySelect
                                    portfolioBalance={portfolio.portfolioBalance}
                                    stockPrice={stock.daily_change.currentprice}
                                    setNewPortfolioBalance={setNewPortfolioBalance}
                                    dollarAmountSelected={dollarAmountSelected}
                                    setDollarAmountSelected={setDollarAmountSelected}
                                    setQty={setQty}
                                    buyOrSell={buyOrSell}
                                    gameTradeFee={gameTradeFee}
                                    maxQuantity={portfolio.portfolioBalance-gameTradeFee}
                                    qty={qty}
                                />
                                </Col>
                        </Row>
                        <Row>
                            <Col style={{ marginBottom: "0.625rem" }}>
                                <BalanceComponent
                                    portfolioName={portfolio.portfolioName}
                                    portfolioBalance={portfolio.portfolioBalance}
                                    newPortfolioBalance={newPortfolioBalance}
                                    dollarAmountSelected={dollarAmountSelected}
                                />
                            </Col>
                        </Row>
                    </>
                        
                    }
                    {isShownLimitOrder &&
                        <>
                            <Col style={{ marginBottom: "0.625rem" }}>
                                <LimitQuantitySelect
                                    portfolioBalance={portfolio.portfolioBalance}
                                    setQty={setQty}
                                    limitPrice={limitPrice}
                                    setDollarAmountSelected={setDollarAmountSelected}
                                    setNewPortfolioBalance={setNewPortfolioBalance}
                                />
                            </Col>
                            <Col style={{ marginBottom: "0.625rem" }}>
                                <LimitPriceSelect
                                    portfolioBalance={portfolio.portfolioBalance}
                                    setDollarAmountSelected={setDollarAmountSelected}
                                    qty={qty}
                                    setLimitPrice={setLimitPrice}
                                    setNewPortfolioBalance={setNewPortfolioBalance}
                                />
                            </Col>
                        </>
                    }
                    <AreYouSure showState={showAreYouSureModal} setShowState={setShowAreYouSureModal} 
                            buyOrSell={buyOrSell}
                            orderType={orderType}
                            newPortfolioBalance={newPortfolioBalance}
                            dollarAmountSelected={dollarAmountSelected}
                            qty={qty} 
                            stockId={stock.id}
                            portfolioId={portfolio.id}
                            limitPrice={limitPrice}
                            stockName={stock.longname}
                />
                    <BottomStickyButton onClick={() =>{setShowAreYouSureModal(true)}} text="Confirm Order"></BottomStickyButton>
                    <div className='footerStyle'></div>
                </Container>
            }
        </>
    )
}

export default OrderConfirmationPage;
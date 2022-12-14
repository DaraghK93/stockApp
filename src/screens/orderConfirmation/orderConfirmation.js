import LoadingSpinner from "../../components/widgets/LoadingSpinner/LoadingSpinner";
import MessageAlert from "../../components/widgets/MessageAlert/MessageAlert";
import { Container, Row, Col} from "react-bootstrap";
import BottomStickyButton from "../../components/widgets/BottomStickyButton/BottomStickyButton";
import { useState, useEffect } from 'react';
import QuantitySelect from "../../components/confirmOrderComponents/QuantitySelect";
import OrderType from "../../components/confirmOrderComponents/OrderType";
import BalanceComponent from "../../components/confirmOrderComponents/balanceComponent";
import LimitQuantitySelect from "../../components/confirmOrderComponents/LimitQuantitySelect";
import LimitPriceSelect from "../../components/confirmOrderComponents/LimitPriceSelect";
import PortfolioSelectionDropdown from "../../components/portfolioComponents/portfolioSelectionDropdown/portfolioSelectionDropdown";
import AreYouSure from "../../components/confirmOrderComponents/AreYouSure";
import BuyOrSell from "../../components/confirmOrderComponents/BuyOrSell";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {useNavigate, Link} from "react-router-dom"


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
    const [dollarAmountSelected, setDollarAmountSelected] = useState(0)
    const [dollarAmountLoading, setDollarAmountLoading] = useState(true)
    const [buyOrSell, setBuyOrSell] = useState("Buy");
    const [orderType, setOrderType] = useState("Market Order");
    const [qty, setQty] = useState("0");
    const [isShownMarketOrder, setIsShownMarketOrder] = useState(false)
    const [isShownLimitOrder, setIsShownLimitOrder] = useState(false)
    const [limitPrice, setLimitPrice] = useState(0)
    const [limitOrderQuantityError, setLimitOrderQuantityError] = useState("")
    const [limitOrderPriceError, setLimitOrderPriceError] = useState("")
    const [marketPriceError, setMarketPriceError] = useState("")
    const [showAreYouSureModal, setShowAreYouSureModal ] = useState(false);
    const [spendingPowerError, setSpendingPowerError] = useState("");
   
    /// Game State ///
    const [gameTradeFee, setGameTradeFee] = useState()
    const [gameId, setGameId] = useState()
    const [gameRestrictions, setGameRestrictions] = useState()
    const [gameESGRestrictionError, setGameESGRestrictionError] = useState()
    const [gameSectorRestrictionError, setGameSectorRestrictionError] = useState()
    
    //// Portfolio State ////
    const [portfolio, setPortfolio] = useState({})
    
    const [portfolioLoading, setPortfolioLoading] = useState(true)
    const [portfolioError, setPortfolioError] = useState()
    const [newPortfolioBalance, setNewPortfolioBalance] = useState()
    const [holding, setHolding] = useState()

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
        /// Reset the errors when you switch orders
        setLimitOrderQuantityError("")
        setLimitOrderPriceError("")
        setMarketPriceError("")
        setSpendingPowerError("")
    }, [orderType,gameId])


    /// Portfolio Id 
    useEffect(() => {
        const getPortfolioInfo = async () => {
            try{
                /// Set the portfolio Loading to true and reset error
                setPortfolioLoading(true)
                setPortfolioError()
                /// eset holding,will be set if they have any and reset buy incase they have no holdings 
                setHolding()
                setBuyOrSell("Buy")
                let path = `/api/portfolio/${gameId}`;
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
                /// Set the game restrictions 
                setGameRestrictions({
                    minERating: res.league.minERating,
                    minSRating: res.league.minSRating,
                    minGRating: res.league.minGRating,
                    sectors: res.league.sectors
                })
                /// Need to get the users current holding 
                if (res.holdings.length > 0){
                    res.holdings.forEach(item =>{
                        /// If the user has a postion in this stock it will match the stock ID 
                        /// the units will also not equal to 0 
                        if(item.stockId === stock.id && item.units > 0){
                            setHolding(item.units)
                        }
                    });
                }
                setGameTradeFee(res.league.tradingFee)
                /// Set the Iitiliase the new portfolio balance to the remainder of the current 
                setNewPortfolioBalance(res.remainder)
                setPortfolioLoading(false)
            }catch(error){
                setPortfolioError(error.response.data.errormessage)
                setPortfolioLoading(false)
            }
        }
        /// Need to set an intial value ///
        if (typeof gameId === "undefined" && loading === false){
            /// Add in a savety check here if a user naviagtes to the page by typing in url redirect them to the game screen
            if (activePortfolios.length === 0){
                navigate(`/game`)
            }else{
              /// For now set the current portfolio to the first portfolio may need to revisit this ///
            setGameId(activePortfolios[0].leagueId)  
            }
        }else if(gameId){
            /// Get the portfolio data 
            getPortfolioInfo()
        }
    },[gameId,activePortfolios,loading, userToken,navigate,stock._id,stock])

    /// buy/sell reset ///
    // This useEffect id used to reset values whne the user swiches between buy/sell
    // Need to reset the dollar amount as it may not make sense when you switch from buy to sell 
    useEffect(() => {
        setDollarAmountLoading(true)
        if(buyOrSell === "Buy" && stock !== ''){
            setDollarAmountSelected(stock.daily_change.currentprice)
        }else if(buyOrSell === "Sell"){
            setDollarAmountSelected(1)
        }
        setDollarAmountLoading(false)
    },[buyOrSell,stock,orderType])
    

    //// Cehck for the environment and sector scores ////
    useEffect(() => {
        /// Make sure they are not undefined before the check 
        if (typeof gameRestrictions !== "undefined" && typeof stock !== "undefined" && stock !== ''){
            /// Reset them as they may have switched portfolio 
            setGameESGRestrictionError("")
            setGameSectorRestrictionError(false)
            /// Do a check first for ESG restrictions 
            if (stock.esgrating.environment_score < gameRestrictions.minERating){
                setGameESGRestrictionError("Environment")
            }else if (stock.esgrating.governance_score < gameRestrictions.minGRating){
                setGameESGRestrictionError("Governance")
            }else if (stock.esgrating.social_score < gameRestrictions.minSRating){
                setGameESGRestrictionError("Social")
            }
            //// Now do a check for the sectors 
            /// true  -> Sector is tradabale
            /// false -> Sector is not tradeable 
            setGameSectorRestrictionError(!gameRestrictions.sectors.includes(stock.sector))
        }
       
    },[gameRestrictions,stock])
    

    return (
        <>
            { stockLoading || loading || portfolioLoading ? <LoadingSpinner /> 
            : error ? <MessageAlert variant='danger'>{error}</MessageAlert> 
            : portfolioError ? <MessageAlert variant='danger'>{portfolioError}</MessageAlert> 
            : <Container>
                    <Row>
                        <Link className="backToStockInfo" to={`/stock/${stock.symbol}`}>
                            <ArrowBackIcon/> <span>Stock Information</span>
                        </Link>
                    </Row>
                    <Row md={3} sm={2} xs={2}>
                        <Col className="col-md-3 col-sm-3 col-3">
                        <Link to={`/stock/${stock.symbol}`}><img src={stock.logo} className="img-fluid" alt="Company Logo" style={{
                                  maxHeight:"12rem", paddingTop: "1.25rem", paddingLeft: "1rem", position:"relative", float:"right" }} /></Link>
                        
                        </Col>
                        <Col className="stockInfoCol col-md-4 col-sm-8 col-6">
                            <dl className='infoList'>
                                <dt>
                                    <h1>
                                        {stock.longname}
                                    </h1>
                                </dt>
                                <dt>{stock.symbol}</dt>
                                <dt style={{ fontSize: "150%" }}>${stock.daily_change.currentprice.toFixed(2)}</dt>
                                <dt style={{ fontSize: "120%" }}>Sector: {stock.sector}</dt>
                            </dl>
                        </Col>
                    </Row>
                    <Row md={1} className="py-2" style={{"textAlign":"center","alignItems":"center"}}>
                        <h3>Active Portfolio</h3>
                        <PortfolioSelectionDropdown portfolios={activePortfolios} state={gameId} setState={setGameId} currentPortfolioName={portfolio.portfolioName}/>
                    </Row>
                    {(gameESGRestrictionError || gameSectorRestrictionError) && 
                    <Row md={1} style={{"textAlign":"center","alignItems":"center", "justifyContent":"center"}}>
                        <MessageAlert className="tradeRestrictionsError" variant='danger'>
                            {gameESGRestrictionError &&<p>Minimum {gameESGRestrictionError} rating not met</p>}
                            {gameSectorRestrictionError && <p>{stock.sector} sector stocks not tradable due to game restrictions</p>}
                            <p>
                                Try a different portfolio or view the available stocks to trade from the <span className="bolded">Trade Section</span> of the <Link className="linkStyle" to={`/game/${gameId}`}>Game Page!</Link>
                            </p>
                        </MessageAlert>
                    </Row>
                    
                   }
                    <Row className="py-3">
                        <BuyOrSell state={buyOrSell} setter={setBuyOrSell} holding={holding}/>
                    </Row>
                    <Row className="pt-4" md={1} xs={1} lg={1}>
                        <Col>
                         <OrderType
                                orderType={orderType}
                                setOrderType={setOrderType}
                                buyOrSell={buyOrSell}
                                portfolioBalance={portfolio.portfolioBalance}
                                gameTradeFee={gameTradeFee}
                            />
                        </Col>
                    </Row>
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
                                    holding={holding}
                                    marketPriceError = {marketPriceError}
                                    setMarketPriceError = {setMarketPriceError}
                                    dollarAmountLoading={dollarAmountLoading}
                                />
                                </Col>
                        </Row>
                    </>
                    }
                    {isShownLimitOrder &&
                        <Row className="my-2" sm={1} md={1} xs={1}>
                            <Col style={{ marginBottom: "0.625rem" }}>
                                <LimitPriceSelect
                                    portfolioBalance={portfolio.portfolioBalance}
                                    setDollarAmountSelected={setDollarAmountSelected}
                                    qty={qty}
                                    limitPrice={limitPrice}
                                    buyOrSell={buyOrSell}
                                    setLimitPrice={setLimitPrice}
                                    stockPrice={stock.daily_change.currentprice}
                                    setNewPortfolioBalance={setNewPortfolioBalance}
                                    limitOrderPriceError={limitOrderPriceError}
                                    setLimitOrderPriceError={setLimitOrderPriceError}
                                />
                            </Col>
                            <Col>
                                <LimitQuantitySelect
                                    portfolioBalance={portfolio.portfolioBalance}
                                    setQty={setQty}
                                    qty={qty}
                                    buyOrSell={buyOrSell}
                                    stockPrice={stock.daily_change.currentprice}
                                    limitPrice={limitPrice}
                                    holding={holding}
                                    gameTradeFee={gameTradeFee}
                                    setDollarAmountSelected={setDollarAmountSelected}
                                    setNewPortfolioBalance={setNewPortfolioBalance}
                                    limitOrderQuantityError={limitOrderQuantityError}
                                    setLimitOrderQuantityError={setLimitOrderQuantityError}
                                />
                            </Col>
                        </Row>
                    }
                    <Col className="pb-3">
                                <BalanceComponent
                                    portfolioName={portfolio.portfolioName}
                                    portfolioBalance={portfolio.portfolioBalance}
                                    newPortfolioBalance={newPortfolioBalance}
                                    dollarAmountSelected={dollarAmountSelected}
                                    buyOrSell={buyOrSell}
                                    holding={holding}
                                    stockPrice={stock.daily_change.currentprice}
                                    orderType={orderType}
                                    limitPrice={limitPrice}
                                    qty={qty}
                                    gameTradeFee={gameTradeFee}
                                    marketPriceError = {marketPriceError}
                                    spendingPowerError= {spendingPowerError}
                                    setSpendingPowerError={setSpendingPowerError}
                                />
                            </Col>
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
                            gameTradeFee={gameTradeFee}
                            stockLogo={stock.logo}
                            gameId={gameId}
                />
                    <BottomStickyButton 
                        onClick={() =>{setShowAreYouSureModal(true)}} 
                        text="Review Trade!" 
                        disabled={
                            (limitOrderQuantityError || limitOrderPriceError || marketPriceError || spendingPowerError || gameESGRestrictionError || gameSectorRestrictionError)
                        }></BottomStickyButton>
                    <div className='footerStyle'></div>
                </Container>
            }
        </>
    )
}

export default OrderConfirmationPage;
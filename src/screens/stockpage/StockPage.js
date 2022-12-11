/// Individual Stock Page ///
// Route:
//  <URL>/stock/:symbol
// Description:
//  This screen contains the components rendered to the user when they click on an individual stock
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import StockPriceChart from "../../components/stockVisualisationComponents/ChartTypes/PriceChart/PriceChart";
import ChartCard from '../../components/stockVisualisationComponents/ChartCard/ChartCard';
import ChartCardESG from "../../components/stockVisualisationComponents/ChartCard/ChartCard(ESG)";
import InfoButtonModal from '../../components/widgets/InfoButtonModal/InfoButtonModal';
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert';
import NewsArticleContainer from '../../components/newsComponents/newsArticleContainer/NewsArticleContainer';
import BottomStickyButton from '../../components/widgets/BottomStickyButton/BottomStickyButton';
import TweetContainer from '../../components/tweetComponents/tweetContainer/tweetContainer';
import BasicModal from "../../components/widgets/BasicModal/BasicModal";

/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";

/// Redux ///
import { useSelector,useDispatch } from 'react-redux';
import {updateActivePortfolios} from '../../actions/portfolioActions';


function StockPage() {
    /// Component State ///
    const [loading, setLoading] = useState(true);
    const [stock, setStock] = useState('');
    const [error, setError] = useState("");
    const [showTradeModal, setShowTradeModal] = useState(false)

    /// Redux State ///
    const dispatch = useDispatch()
    const portfolios = useSelector((state) => state.portfolios)
    const user = useSelector((state) => state.user)
    const { activePortfolios } = portfolios;
    const { userInfo } = user;

    /// React Router ///
    const navigate = useNavigate() 

    // get symbol from query Params
    const { symbol } = useParams()

    var lineColor;
    var gradientColor;
    var positiveSymbol;

    function redOrGreen() {
        if (parseFloat(stock.daily_change.absoluteChange) >= 0) {
            lineColor = "#00C49F"
            gradientColor = "#b5e8df"
            positiveSymbol = "+"
        }
        else {
            lineColor = "#d61e1e"
            gradientColor = "#ffc9c9"
        }
        return lineColor
    }

    function onClickTradeButton(){ 
        if(activePortfolios.length === 0){
            /// No Active Portfolios, show a info modal 
            setShowTradeModal(true)
        }else{
            /// Redirect to the trade page
            navigate(`/stock/${stock.symbol}/confirmorder`) 
        }
    }


    useEffect(() => {
        /// getStockInfo ///
        // Description:
        //  Makes a GET request to the backend route /stock/:symbol
        const getStockInfo = async () => {
            try {
                // Request is being sent set loading true   
                setLoading(true);
                // Set the path and use symbol to get single stock
                let path = `/api/stock/${symbol}`
                // Send the request with API package
                const res = await API.get(APIName, path)
                // Set the state for the stock and loading to false 
                setStock(res)
                setLoading(false)
                dispatch(updateActivePortfolios(userInfo.token)) 
            } catch (error) {
                // Log the error 
                console.log(error)
                // Set the error message to be displayed on the page 
                setError(error.response.data.errormessage)
                setLoading(false)
            }
        }
        getStockInfo();
    }, [symbol, dispatch,userInfo])



    return (
        
        <>
        
        
            {loading ? <LoadingSpinner /> : error ? <MessageAlert variant='danger'>{error}</MessageAlert> :
                <Container>
                    <Row>
                        <Col className="col-md-3 col-sm-3 col-3">
                            <img src={stock.logo} className="img-fluid" alt="Company Logo" style={{ width: "100%", paddingTop: "1.25rem" }} />
                        </Col>
                        <Col className="stockInfoCol col-md-7 col-sm-12 col-8">
                            <dl className='infoList'>
                                <dt>
                                    <h1>
                                        {stock.longname}<InfoButtonModal
                                        title="Company Information"
                                        info={stock.longbusinesssummary} /></h1>
                                </dt>
                                <dt>{stock.symbol}
                                    </dt>
                                <dt style={{ fontSize: "150%" }}>${stock.daily_change.currentprice.toFixed(2)}</dt>
                                <dt style={{ color: redOrGreen() }}>{positiveSymbol}${stock.daily_change.absoluteChange.toFixed(2)} ({positiveSymbol}{stock.daily_change.percentageChange.toFixed(2)}%)
                                </dt>
                                <dt style={{ fontSize: "150%" }}>Sector: {stock.sector}</dt>
                            </dl>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="stockInfoCol">
                            <BottomStickyButton onClick={onClickTradeButton} text="Lets Trade!" />
                            <BasicModal showState={showTradeModal} setShowState={setShowTradeModal} title={"No Active Portofolios"} 
                            bodyText={
                                <>
                                <p>It appears you don't have an active portfolio!</p>
                                <p>To be able to trade stocks you need to be part of an active game.</p>
                                <p>You can view your active games or create a new game from the <Link className="linkStyle" to={"/game/"}>Game Screen</Link> </p>
                                </>
                                }/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StockPriceChart stock={stock} lineColor={lineColor} gradientColor={gradientColor} />
                        </Col>
                    </Row>
                    <Row xl={3} lg={2} md={2} xs={1}>
                        <Col sm md={8} className="stockInfoCol">
                        <ChartCardESG title={"ESG Rating"} edata={((stock.esgrating.environment_score)/1000)*5} sdata={((stock.esgrating.social_score)/1000)*5} gdata={((stock.esgrating.governance_score)/1000)*5}/>
                        </Col>
                        <Col sm md={8} className="stockInfoCol">
                            <ChartCard title={"News Sentiment"} data={stock.newsSentiment} />
                        </Col>
                        <Col sm md={8} className="stockInfoCol">
                            <ChartCard title={"Twitter Sentiment"} data={stock.twitterSentiment} />
                        </Col>
                    </Row>
                    <Row md={2} xs={1}>
                        <Col className="stockInfoCol">
                            <NewsArticleContainer symbol={stock.symbol} shortname={stock.shortname} longname={stock.longname} />
                        </Col>
                        <Col className="stockInfoCol">
                        <TweetContainer stock={stock.symbol}></TweetContainer>
                        </Col>
                    </Row>
                    <div className='footerStyle'></div>
                </Container>
            }
        </>
    )
};


//<Col className="stockInfoCol">
//                        <Link to={`/stock/${stock.symbol}/confirmorder`}>
//                            <BottomStickyButton onClick={onClickTradeButton} text="Lets Trade!" />
//                            </Link>
//                        </Col>

export default StockPage;
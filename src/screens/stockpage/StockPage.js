/// Individual Stock Page ///
// Route:
//  <URL>/stock/:symbol
// Description:
//  This screen contains the components rendered to the user when they click on an individual stock
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
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
import { useSelector } from 'react-redux';


function StockPage() {
    /// Component State ///
    const [loading, setLoading] = useState(true);
    const [stockPricesLoading, setStockPricesLoading] = useState(true)


    const [stock, setStock] = useState('');
    const [error, setError] = useState("");
    const [showTradeModal, setShowTradeModal] = useState(false)
    const [absoluteChange, setAbsoluteChange] = useState()
    const [percentageChange, setPercentageChange] = useState()


    const day = [
        { date: '01-10', price: 400 },
        { date: '01-11', price: 700 },
        { date: '01-12', price: 60 },
        { date: '01-13', price: 700 },
        { date: '01-01', price: 500 }]

    // data coming directly from the stock object provided above. This means that another request is not needed
    const oneWeekPrices = stock.week
    const oneMonthPrices = stock.month
    const oneYearPrices = stock.year
    const [active, setActive] = useState("1");
    const [data, setData] = useState(day);
    /// Redux State ///
    const portfolios = useSelector((state) => state.portfolios)
    const { activePortfolios } = portfolios;

    /// React Router ///
    const navigate = useNavigate()

    // get symbol from query Params
    const { symbol } = useParams()

    var lineColor;
    var gradientColor;
    var positiveSymbol;

    var myPercentage;

    const DayData = event => {
        // toggle shown data
        setData(day);
        setAbsoluteChange(stock.daily_change.absoluteChange)
        setPercentageChange(stock.daily_change.percentageChange)
        setActive(event.target.id);
    };
    const WeekData = event => {
        // toggle shown data
        setData(oneWeekPrices);
        setActive(event.target.id);
        setAbsoluteChange((oneWeekPrices[oneWeekPrices.length - 1].price - oneWeekPrices[0].price).toFixed(2))
        setPercentageChange((((oneWeekPrices[oneWeekPrices.length - 1].price - oneWeekPrices[0].price) / oneWeekPrices[oneWeekPrices.length - 1].price) * 100).toFixed(2))
        redOrGreen()

    };
    const MonthData = event => {
        // toggle shown data
        setData(oneMonthPrices);
        setActive(event.target.id);
        setAbsoluteChange((oneMonthPrices[oneMonthPrices.length - 1].price - oneMonthPrices[0].price).toFixed(2))
        setPercentageChange((((oneMonthPrices[oneMonthPrices.length - 1].price - oneMonthPrices[0].price) / oneMonthPrices[oneMonthPrices.length - 1].price) * 100).toFixed(2))
        redOrGreen()
    };
    const YearData = event => {
        // toggle shown data
        setData(oneYearPrices);
        setActive(event.target.id);
        setAbsoluteChange((oneYearPrices[oneYearPrices.length - 1].price - oneYearPrices[0].price).toFixed(2))
        setPercentageChange((((oneYearPrices[oneYearPrices.length - 1].price - oneYearPrices[0].price) / oneYearPrices[oneYearPrices.length - 1].price) * 100).toFixed(2))
        redOrGreen()
    }




    function redOrGreen() {
        if (absoluteChange > 0) {
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

    function onClickTradeButton() {
        if (activePortfolios.length === 0) {
            /// No Active Portfolios, show a info modal 
            setShowTradeModal(true)
        } else {
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
            } catch (error) {
                // Log the error 
                console.log(error)
                // Set the error message to be displayed on the page 
                setError(error.response.data.errormessage)
                setLoading(false)
            }
        }
        getStockInfo();

    }, [symbol])

    useEffect(() => {
        try {
        setStockPricesLoading(true)
        setData(day)
        setActive("1")
        setAbsoluteChange(stock.daily_change.absoluteChange)
        setPercentageChange(stock.daily_change.percentageChange)
        setStockPricesLoading(false)
        } catch (e) {
            setStockPricesLoading(false)

        }
    }, [stock])

    return (

        <>


            {loading || stockPricesLoading ? <LoadingSpinner /> : error ? <MessageAlert variant='danger'>{error}</MessageAlert>
            : 
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
                                <dt style={{ color: redOrGreen() }}>
                                    {positiveSymbol}{absoluteChange} ({positiveSymbol}{percentageChange}%)
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
                                } />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card className="priceChartStyle">
                                <Container>
                                    <Row>
                                        <StockPriceChart data={data} lineColor={lineColor} gradientColor={gradientColor} dataKey={"price"}/>
                                    </Row>
                                    <Row
                                        style={{
                                            justifyContent: "center"
                                        }}>
                                        <Col className="centeredCol">
                                            <Button id={"1"} className={active === "1" ? 'btn-outline-info:active' : "btn-outline-info"} onClick={DayData}>1D</Button>
                                        </Col>
                                        <Col className="centeredCol">
                                            <Button id={"2"} className={active === "2" ? 'btn-outline-info:active' : "btn-outline-info"} onClick={WeekData}>1W</Button>
                                        </Col>
                                        <Col className="centeredCol">
                                            <Button id={"3"} className={active === "3" ? 'btn-outline-info:active' : "btn-outline-info"} onClick={MonthData}>1M</Button>
                                        </Col>
                                        <Col className="centeredCol">
                                            <Button id={"4"} className={active === "4" ? 'btn-outline-info:active' : "btn-outline-info"} onClick={YearData}>1Y</Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card>


                        </Col>
                    </Row>
                    <Row xl={3} lg={2} md={2} xs={1}>
                        <Col sm md={8} className="stockInfoCol">
                            <ChartCardESG title={"ESG Rating"} edata={((stock.esgrating.environment_score) / 1000) * 5} sdata={((stock.esgrating.social_score) / 1000) * 5} gdata={((stock.esgrating.governance_score) / 1000) * 5} />
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

export default StockPage;
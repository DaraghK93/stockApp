/// Individual Stock Page ///
// Route:
//  <URL>/stock/:symbol
// Description:
//  This screen contains the components rendered to the user when they click on an individual stock 

import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import StockPriceChart from "../../components/stockVisualisationComponents/ChartTypes/PriceChart/PriceChart";
import ChartCard from '../../components/stockVisualisationComponents/ChartCard/ChartCard';
import InfoButtonModal from '../../components/widgets/InfoButtonModal/InfoButtonModal';
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert';
import NewsArticleContainer from '../../components/newsComponents/newsArticleContainer/NewsArticleContainer';
import TradeButton from '../../components/stockComponents/TradeButton/TradeButton';
import FollowButton from '../../components/stockComponents/FollowButton/FollowButton';
/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";

function StockPage() {

    const [loading, setLoading] = useState(true);
    const [stock, setStock] = useState('');
    const [error, setError] = useState("");

    var lineColor;
    var gradientColor;
    var positiveSymbol;

    const newsSentimentData = [
        { name: 'Positive', value: 600 },
        { name: 'Negative', value: 300 },
        { name: 'Neutral', value: 100 }
    ];

    const twitterSentimentData = [
        { name: 'Positive', value: 100 },
        { name: 'Negative', value: 98 },
        { name: 'Neutral', value: 26 }
    ];

    function redOrGreen() {
        if (parseFloat(stock.daily_change.absoluteChange) >= 0) {
            lineColor = "#00C49F"
            gradientColor = "#b5e8df"
            positiveSymbol = "+"
        }
        else {
            lineColor = "#d61e1e"

            // lineColor = 
            // "#1E90FF"
            gradientColor = "#ffc9c9"
            // "#B2D9FF"
            
        
        }
        return lineColor
    }

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
                    <Row
                    // xs={3}
                    >
                        <Col className="col-md-2 col-sm-3 col-3">
                            <img src={stock.logo} className="img-fluid" alt="Company Logo" style={{ width: "100%", paddingTop: "1.25rem" }} />
                        </Col>
                        <Col className="col-sm-8 col-5" style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <dl className='infoList'>
                                <dt>
                                    <h1>
                                        {stock.longname}</h1>
                                </dt>
                                <dt>{stock.symbol}
                                    <InfoButtonModal
                                        title="Company Information"
                                        info={stock.longbusinesssummary} /></dt>
                                <dt style={{ fontSize: "150%" }}>${stock.daily_change.currentprice}</dt>
                                <dt style={{ color: redOrGreen() }}>{positiveSymbol}${stock.daily_change.absoluteChange} ({positiveSymbol}{stock.daily_change.percentageChange})
                                </dt>
                            </dl>
                        </Col>
                        <Col className="col-md-2 col-sm-3 col-3" style={{ marginTop: "20px" }}>
                            <FollowButton />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="stockInfoCol">
                            <TradeButton />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StockPriceChart symbol={stock.symbol} lineColor={lineColor} gradientColor={gradientColor} />
                        </Col>
                    </Row>
                    <Row xl={3} lg={2} md={2} xs={1}>
                        <Col sm md className="stockInfoCol">
                            <ChartCard title={"ESG Rating"} data={
                                [{ name: "E Score", value: stock.esgrating.environment_score },
                                { name: "S Score", value: stock.esgrating.social_score },
                                { name: "G Score", value: stock.esgrating.governance_score }]} />
                        </Col>
                        <Col sm md={8} className="stockInfoCol">
                            <ChartCard title={"News Sentiment"} data={newsSentimentData} />
                        </Col>
                        <Col sm md={8} className="stockInfoCol">
                            <ChartCard title={"Twitter Sentiment"} data={twitterSentimentData} />
                        </Col>
                    </Row>
                    <Row md={2} xs={1}>
                        <Col className="stockInfoCol">
                            <NewsArticleContainer symbol={stock.symbol} shortname={stock.shortname} longname={stock.longname} />
                        </Col>
                        <Col className="stockInfoCol">
                            {/*THINK THE TWITTER FEED WOULD WORK WELL HERE*/}
                        </Col>
                    </Row>
                    <div className='footerStyle'></div>
                </Container>
            }
        </>
    )
};


export default StockPage;
/// Individual Stock Page ///
// Route:
//  <URL>/stock/:symbol
// Description:
//  This screen contains the components rendered to the user when they click on an individual stock
import { Link } from "react-router-dom";
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
import FollowButton from '../../components/widgets/FollowButton/FollowButton';
import TweetContainer from '../../components/tweetComponents/tweetContainer/tweetContainer';

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
                // Log the error 
                console.log(error)
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
                    <Row
                    // xs={3}
                    >
                        <Col className="col-md-3 col-sm-3 col-3">
                            <img src={stock.logo} className="img-fluid" alt="Company Logo" style={{ width: "100%", paddingTop: "1.25rem" }} />
                        </Col>
                        <Col className="stockInfoCol col-md-4 col-sm-8 col-5">
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
                                <dt style={{ color: redOrGreen() }}>{positiveSymbol}${stock.daily_change.absoluteChange} ({positiveSymbol}{stock.daily_change.percentageChange}%)
                                </dt>
                            </dl>
                        </Col>
                        <Col className="followButtonCol col-md-2 col-sm-3 col-3">
                            <FollowButton />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="stockInfoCol">
                        <Link to={`/stock/${stock.symbol}/confirmorder`}>
                            <BottomStickyButton text="Trade" />
                            </Link>
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

export default StockPage;
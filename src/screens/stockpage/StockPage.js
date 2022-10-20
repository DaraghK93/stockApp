/// Individual Stock Page ///
// Route:
//  <URL>/stock/:symbol
// Description:
//  This screen contains the components rendered to the user when they click on an individual stock

import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import StockPriceChart from "../../components/stockVisualisationComponents/ChartTypes/PriceChart/PriceChart";
import ChartCard from '../../components/stockVisualisationComponents/ChartCard/ChartCard';
import InfoButtonModal from '../../components/widgets/InfoButtonModal/InfoButtonModal';
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert';
import NewsArticleContainer from '../../components/newsComponents/newsArticleContainer/NewsArticleContainer';
import TradeButton from '../../components/stockComponents/TradeButton/TradeButton';
import TweetContainer from '../../components/tweetComponents/tweetContainer/TweetContainer';

/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";

function StockPage() {

  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState('');
  const [error, setError] = useState("");

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
                    <Row xs={2}>
                        <Col className="col-md-2 col-sm-3 col-3">
                            <img src={stock.logo} className="img-fluid" alt="Company Logo" style={{ width: "100%", paddingTop: "1.25rem" }} />
                        </Col>
                        <Col className="col-sm-8 col-8" style={{ paddingLeft: 0 }}>
                            <dl className='infoList'>
                                <dt>
                                    <h1>
                                        {stock.longname}<InfoButtonModal
                                            title="Company Information"
                                            info={stock.longbusinesssummary} /></h1>
                                </dt>
                                <dt>{stock.symbol}</dt>
                                <dt style={{ fontSize: "150%" }}>$200</dt>
                                <dt>+$50 (25%)</dt>
                            </dl>

                        </Col>
                        <Col className="stockInfoCol">
                            <TradeButton />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StockPriceChart symbol={stock.symbol} />
                        </Col>
                    </Row>
                    <Row xl={3} lg={2} md={2} xs={1}>
                        <Col sm md className="stockInfoCol">
                            <ChartCard title={"ESG Rating"} data={
                        [{name: "E Score",value: stock.esgrating.environment_score},
                         {name: "S Score",value: stock.esgrating.social_score},
                         {name: "G Score",value: stock.esgrating.governance_score}]} />
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
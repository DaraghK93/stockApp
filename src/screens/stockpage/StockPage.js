/// Individual Stock Page ///
// Route:
//  <URL>/stock/:symbol
// Description:
//  This screen contains the components rendered to the user when they click on an individual stock 

import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import StockPriceChart from "../../components/stockVisualisationComponents/ChartTypes/PriceChart/PriceChart";
import ChartCard from '../../components/stockVisualisationComponents/ChartCard/ChartCard';
import PlainCard from '../../components/stockVisualisationComponents/PlainCard/PlainCard';
import LoadingSpinner from '../../components/widgets/LoadingSpinner/LoadingSpinner';
import MessageAlert from '../../components/widgets/MessageAlert/MessageAlert';
import NewsArticleContainer from '../../components/newsComponents/newsArticleContainer/NewsArticleContainer';


/// API ///
import { APIName } from '../../constants/APIConstants'
import { API } from "aws-amplify";



function StockPage() {

    const [loading, setLoading] = useState(true);
    const [stock, setStock] = useState('');
    const [error, setError] = useState("");

    const esgData = [
        { name: 'E Rating', value: 600 },
        { name: 'S Rating', value: 700 },
        { name: 'G Rating', value: 200 }
    ]

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
                    <Row lg={3} md={2} xs={1}>
                        <Col className="stockInfoCol">
                            <PlainCard
                                longname={stock.longname}
                                symbol={stock.symbol}
                                logo={stock.logo}
                                info={stock.longbusinesssummary}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StockPriceChart symbol={stock.symbol}/>
                        </Col>
                    </Row>
                    <Row xl={3} lg={2} md={2} xs={1}>
                        <Col sm md className="stockInfoCol">
                            <ChartCard title={"ESG Rating"} data={esgData} />
                        </Col>
                        <Col sm md={8} className="stockInfoCol">
                            <ChartCard title={"News Sentiment"} data={newsSentimentData} />
                        </Col>
                        <Col sm md={8} className="stockInfoCol">
                            <ChartCard title={"Twitter Sentiment"} data={twitterSentimentData} />
                        </Col>
                    </Row>
                    <NewsArticleContainer symbol={stock.symbol} shortname={stock.shortname} longname={stock.longname}/>
                </Container>
            }
        </>
    )
};


export default StockPage;
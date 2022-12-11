import { Container, Dropdown, Card, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import BarChartViz from "../ChartTypes/BarChartViz/BarChartViz";
import PieChartViz from "../ChartTypes/PieChartViz/PieChartViz";
import RadarChartViz from "../ChartTypes/RadarChartViz/RadarChartViz";
import MessageAlert from "../../widgets/MessageAlert/MessageAlert";
import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal";
import SentimentBadge from "../../widgets/sentimentBadge/SentimentBadge";

const ChartCard = ({ title, data }) => {

    const [isShownBarChart, setIsShownBarChart] = useState(false);
    const [isShownPieChart, setIsShownPieChart] = useState(false);
    const [isShownRadarChart, setIsShownRadarChart] = useState(false);
    const [noDataMessage, setNoDataMessage] = useState("");
    const [sentiment, setSentiment] = useState("neutral");
    const [currentChart, setCurrentChart] = useState("");

    useEffect(() => {
        // value totoal will be 0 if these is no data 
        let valueTotal = 0
        /// if there is no data to show 
        data.forEach(function (item, index) {
            valueTotal = valueTotal + item.value
        })


        if(data[2].value === data[0].value && data[2].value === data[1].value){
            setSentiment("neutral")
        }
        else if (data[0].value === data[1].value){
            setSentiment("neutral")
        }
        else if (data[0].value > data[1].value && data[0].value >= data[2].value){
            setSentiment("positive")
        }
        else if (data[1].value > data[0].value && data[1].value >= data[2].value){
            setSentiment("negative")
        }
        else{
            setSentiment("neutral")
        }



        if (valueTotal === 0) {
            setNoDataMessage("No data to show at the minute")
        } else {
            if (String(title) === "ESG Rating") {
                setIsShownBarChart(true);
                setCurrentChart("Bar Chart")
            }
            else if (String(title) === "News Sentiment") {
                setIsShownPieChart(true);
                setCurrentChart("Pie Chart")
            }
            else if (String(title) === "Twitter Sentiment") {
                setIsShownRadarChart(true);
                setCurrentChart("Radar Chart")
            }
        }

    }, [data, title]);


    const showBarChart = event => {
        // toggle shown state
        setIsShownBarChart(true);
        setIsShownPieChart(false);
        setIsShownRadarChart(false);
        setCurrentChart("Bar Chart")
    };

    const showPieChart = event => {
        // toggle shown state
        setIsShownPieChart(true);
        setIsShownBarChart(false);
        setIsShownRadarChart(false);
        setCurrentChart("Pie Chart")
    };

    const showRadarChart = event => {
        // toggle shown state
        setIsShownRadarChart(true);
        setIsShownBarChart(false);
        setIsShownPieChart(false);
        setCurrentChart("Radar Chart")
    };


    function information() {
        if (String(title) === "News Sentiment") {
            return (
                <>
                    <p>This information relates to the company's overall sentiment in news outlets. 
                        We have scraped the news article titles from various news sources and used AI to calculate what the overall sentiment of each article is. 
                        This can then be used to aid your investment decisions in game.
                    </p>
                    <p>Sentiment is broken down into the following categories:</p>
                    <p><SentimentBadge sentiment={"positive"} /> This is when the overall sentiment of the article is calculated as positive.</p> 
                    <p><SentimentBadge sentiment={"negative"} /> This is when the overall sentiment of the article is calculated as negative.</p>
                    <p><SentimentBadge sentiment={"neutral"} /> This is when the overall sentiment of the article is calculated as neutral.</p>
                    <p>Read more about sentiment <a className="linkStyle" href="https://www.techtarget.com/searchbusinessanalytics/definition/opinion-mining-sentiment-mining" target="_blank" rel="noopener noreferrer">here</a></p> 
                </>
            )
        } else if (String(title) === "Twitter Sentiment") {
            return (
                <>
                <p>This information relates to the company's overall sentiment on twitter. We have scraped tweets that contain the
                companies ticker symbol from twitter and used AI to calculate what the overall sentiment
                of each tweet is. This can then be used to aid your investment decisions in game.</p>
                <p>Sentiment is broken down into the following categories:</p>
                <p> <SentimentBadge sentiment={"positive"} /> This is when the overall sentiment of the article is calculated as positive.</p>
                <p><SentimentBadge sentiment={"negative"} /> This is when the overall sentiment of the article is calculated as negative.</p>
                <p><SentimentBadge sentiment={"neutral"} /> This is when the overall sentiment of the article is calculated as neutral.</p>
                <p>Read more about sentiment <a
                    className="linkStyle" href="https://www.techtarget.com/searchbusinessanalytics/definition/opinion-mining-sentiment-mining" target="_blank" rel="noopener noreferrer">here</a>.
                </p>
                </>
            )
        }
    }

    function titlesetting() {
        if (String(title) === "News Sentiment") {
            return (
                <h2>What is News Sentiment and why is it important?</h2>
            )
        } else if (String(title) === "Twitter Sentiment") {
            return (
                <h2>What is Twitter Sentiment and why is it important?</h2>
            );
        }
    }

    return (
        <>
            <Card className="infoCardStyle">
                <Container className="infoCardContainer">
                    <h2>{title}<InfoButtonModal title={titlesetting()} info={information()} /></h2>
                    
                    {noDataMessage
                        ? <MessageAlert variant='info'>{noDataMessage}</MessageAlert>

                        : <>
                        <Row>
                        <Col className="col-md-8 col-sm-8 col-12">
                        <span className="bolded" style={{fontSize:"1rem", marginBottom:3}}>Overall Sentiment <SentimentBadge customStyle={{fontSize:"0.80rem"}} sentiment={sentiment} /></span>
                            </Col><Col className="col-md-3 col-sm-3 col-3"><Dropdown style={{marginBottom:3 }}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                                    {currentChart}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={showPieChart}>Pie Chart</Dropdown.Item>
                                    <Dropdown.Item onClick={showRadarChart}>Radar Chart</Dropdown.Item>
                                    <Dropdown.Item onClick={showBarChart}>Bar Chart</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown></Col></Row>
                            {isShownBarChart && <BarChartViz data={data} title={title}/>}
                            {isShownPieChart && <PieChartViz data={data} />}
                            {isShownRadarChart && <RadarChartViz data={data} overallSentiment={sentiment} />}
                        </>
                    }
                </Container>
            </Card>
        </>
    )
}
export default ChartCard;
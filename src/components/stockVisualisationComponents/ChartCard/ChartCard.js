import { Container, Dropdown, Card } from "react-bootstrap";
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

    useEffect(() => {
        // value totoal will be 0 if these is no data 
        let valueTotal = 0
        /// if there is no data to show 
        data.forEach(function (item, index) {
            valueTotal = valueTotal + item.value
        })
        if (valueTotal === 0) {
            setNoDataMessage("No data to show at the minute")
        } else {
            if (String(title) === "ESG Rating") {
                setIsShownBarChart(true);
            }
            else if (String(title) === "News Sentiment") {
                setIsShownPieChart(true);
            }
            else if (String(title) === "Twitter Sentiment") {
                setIsShownRadarChart(true);
            }
        }
    }, [data, title]);


    const showBarChart = event => {
        // toggle shown state
        setIsShownBarChart(true);
        setIsShownPieChart(false);
        setIsShownRadarChart(false);
    };

    const showPieChart = event => {
        // toggle shown state
        setIsShownPieChart(true);
        setIsShownBarChart(false);
        setIsShownRadarChart(false);
    };

    const showRadarChart = event => {
        // toggle shown state
        setIsShownRadarChart(true);
        setIsShownBarChart(false);
        setIsShownPieChart(false);
    };


    function information() {
        if (String(title) === "News Sentiment") {
            return (
                <span>This information relates to the companies overall sentiment in news outlets. We have scraped the
                    news article titles from various news sources and used AI to calculate what the overall sentiment
                    of each article is. This can then be used to aid your investment decisions in game.<br></br><br></br>
                    Sentiment is broken down into the following categories:<br></br><br></br>
                    <SentimentBadge sentiment={"positive"} /> This is when the overall sentiment of the article is calculated as positive.<br></br>
                    <SentimentBadge sentiment={"negative"} /> This is when the overall sentiment of the article is calculated as negative.<br></br>
                    <SentimentBadge sentiment={"neutral"} /> This is when the overall sentiment of the article is calculated as neutral.<br></br><br></br>
                    Read more about sentiment <a
                        className="linkStyle" href="https://www.techtarget.com/searchbusinessanalytics/definition/opinion-mining-sentiment-mining" target="_blank" rel="noopener noreferrer">here</a>.</span>
            )
        } else if (String(title) === "Twitter Sentiment") {
            return (
                <span>This information relates to the companies overall sentiment on twitter. We have scraped tweets that contain the
                    companies ticker symbol from twitter and used AI to calculate what the overall sentiment
                    of each tweet is. This can then be used to aid your investment decisions in game.<br></br><br></br>
                    Sentiment is broken down into the following categories:<br></br><br></br>
                    <SentimentBadge sentiment={"positive"} /> This is when the overall sentiment of the article is calculated as positive.<br></br>
                    <SentimentBadge sentiment={"negative"} /> This is when the overall sentiment of the article is calculated as negative.<br></br>
                    <SentimentBadge sentiment={"neutral"} /> This is when the overall sentiment of the article is calculated as neutral.<br></br><br></br>
                    Read more about sentiment <a
                        className="linkStyle" href="https://www.techtarget.com/searchbusinessanalytics/definition/opinion-mining-sentiment-mining" target="_blank" rel="noopener noreferrer">here</a>.</span>
            )
        }
    }

    function titlesetting() {
        if (String(title) === "News Sentiment") {
            return (
                <h2>What is news sentiment and why is it important?</h2>
            )
        } else if (String(title) === "Twitter Sentiment") {
            return (
                <h2>What is twitter sentiment and why is it important?</h2>
            );
        }
    }

    return (
        <>
            <Card className="infoCardStyle">
                <Container className="infoCardContainer">
                    <h2>{title}  <InfoButtonModal title={titlesetting()} info={information()} /></h2>
                    {noDataMessage
                        ? <MessageAlert variant='info'>{noDataMessage}</MessageAlert>

                        : <>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                                    Graph Type
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={showPieChart}>Pie Chart</Dropdown.Item>
                                    <Dropdown.Item onClick={showRadarChart}>Radar Chart</Dropdown.Item>
                                    <Dropdown.Item onClick={showBarChart}>Bar Chart</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {isShownBarChart && <BarChartViz data={data} />}
                            {isShownPieChart && <PieChartViz data={data} />}
                            {isShownRadarChart && <RadarChartViz data={data} />}
                        </>
                    }
                </Container>
            </Card>
        </>
    )
}
export default ChartCard;
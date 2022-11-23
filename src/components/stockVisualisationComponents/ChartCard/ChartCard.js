import { Container, Dropdown, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import BarChartViz from "../ChartTypes/BarChartViz/BarChartViz";
import PieChartViz from "../ChartTypes/PieChartViz/PieChartViz";
import RadarChartViz from "../ChartTypes/RadarChartViz/RadarChartViz";
import MessageAlert from "../../widgets/MessageAlert/MessageAlert";
import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal";

const ChartCard = ({ title, data }) => {

    const [isShownBarChart, setIsShownBarChart] = useState(false);
    const [isShownPieChart, setIsShownPieChart] = useState(false);
    const [isShownRadarChart, setIsShownRadarChart] = useState(false);
    const [noDataMessage, setNoDataMessage] = useState("");

    const infotitle = "What is Sentiment Analysis?"

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
    return (
        <>
            <Card className="infoCardStyle">
                <Container className="infoCardContainer">
                    <h2>{title}  <InfoButtonModal title={infotitle} info={
                        <div>
                            <span>Sentiment analysis, also referred to as opinion mining, is an approach to natural 
                                language processing (NLP) that identifies the emotional tone behind a body of text. This is a popular way for 
                                organizations to determine and categorize opinions about a product, service, or idea. It involves the use of data mining, 
                                machine learning (ML) and artificial intelligence (AI) to mine text for sentiment and subjective information.
                                Read more about Sentiment Analysis <a className="linkStyle"
                                href="https://www.techtarget.com/searchbusinessanalytics/definition/opinion-mining-sentiment-mining" target="_blank" rel="noopener noreferrer">here</a>.</span>
                        </div>} /></h2>
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
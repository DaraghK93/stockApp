import { Container, Dropdown, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import BarChartViz from "../ChartTypes/BarChartViz/BarChartViz";
import PieChartViz from "../ChartTypes/PieChartViz/PieChartViz";
import RadarChartViz from "../ChartTypes/RadarChartViz/RadarChartViz";
import MessageAlert from "../../widgets/MessageAlert/MessageAlert";

const ChartCard = ({ title, data }) => {

    const [isShownBarChart, setIsShownBarChart] = useState(false);
    const [isShownPieChart, setIsShownPieChart] = useState(false);
    const [isShownRadarChart, setIsShownRadarChart] = useState(false);
    const [noDataMessage, setNoDataMessage] = useState("");

    useEffect(() => {
        // value totoal will be 0 if these is no data 
        let valueTotal = 0 
        /// if there is no data to show 
        data.forEach(function (item,index){
            valueTotal = valueTotal + item.value
        })
        if (valueTotal === 0){
            setNoDataMessage("No data to show at the minute")
        }else{
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
    }, [data,title]);


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
                    <h2>{title}  </h2>
                    {noDataMessage 
                    ? <MessageAlert variant='info'>{noDataMessage}</MessageAlert> 

                    :<>
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
                    {isShownBarChart && <BarChartViz data={data}/>}
                    {isShownPieChart && <PieChartViz data={data}/>}
                    {isShownRadarChart && <RadarChartViz data={data}/>} 
                    </>
    }
                </Container>
            </Card>
        </>
    )
}
export default ChartCard;
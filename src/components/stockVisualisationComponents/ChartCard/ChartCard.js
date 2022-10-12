import { Container, Dropdown, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import BarChartViz from "../ChartTypes/BarChartViz/BarChartViz";
import PieChartViz from "../ChartTypes/PieChartViz/PieChartViz";
import RadarChartViz from "../ChartTypes/RadarChartViz/RadarChartViz";
import { Info } from "react-feather"
//TODO
// Move dropdown to right hand side without losing functionality of button

const ChartCard = ({ title }) => {

    const [isShownBarChart, setIsShownBarChart] = useState(false);
    const [isShownPieChart, setIsShownPieChart] = useState(false);
    const [isShownRadarChart, setIsShownRadarChart] = useState(false);

    useEffect(() => {
        if (String(title) == "ESG Rating") {
            setIsShownBarChart(true);
        }
        else if (String(title) == "News Sentiment") {
            setIsShownPieChart(true);
        }
        if (String(title) == "Twitter Sentiment") {
            setIsShownRadarChart(true);
        }
    }, []); // <-- empty dependancies array


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
                <Container>
                    <h2>{title}  <Info size={20}/></h2>
                        <Dropdown 
                    //     style={{
                    //         float:"right"
                    //         , position:"relative"
                    // }}
                        >
                            <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                                Graph Type
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={showPieChart}>Pie Chart</Dropdown.Item>
                                <Dropdown.Item onClick={showRadarChart}>Radar Chart</Dropdown.Item>
                                <Dropdown.Item onClick={showBarChart}>Bar Chart</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    {/* show component on click */}
                    {isShownBarChart && <BarChartViz />}
                    {isShownPieChart && <PieChartViz />}
                    {isShownRadarChart && <RadarChartViz />}
                </Container>
            </Card>
        </>
    )
}
export default ChartCard;
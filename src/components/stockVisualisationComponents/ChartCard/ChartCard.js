import { Container, Dropdown, Card, Button } from "react-bootstrap";
import { useState } from "react";
import BarChartViz from "../ChartTypes/BarChartViz/BarChartViz";
import PieChartViz from "../ChartTypes/PieChartViz/PieChartViz";
import RadarChartViz from "../ChartTypes/RadarChartViz/RadarChartViz";

const ChartCard = ({ title }) => {

    const [isShownBarChart, setIsShownBarChart] = useState(true);
    const [isShownPieChart, setIsShownPieChart] = useState(false);
    const [isShownRadarChart, setIsShownRadarChart] = useState(false);

    const showBarChart = event => {
        // toggle shown state
        setIsShownBarChart(true);
        setIsShownPieChart(false);
        setIsShownRadarChart(false);
    };


    const showPieChart = event => {
        // toggle shown state
        setIsShownPieChart(current => !current);
        setIsShownBarChart(false);
        setIsShownRadarChart(false);
    };

    const showRadarChart = event => {
        // toggle shown state
        setIsShownRadarChart(current => !current);
        setIsShownBarChart(false);
        setIsShownPieChart(false);
    };




    return (
        <>
            <Card>
                <Container>
                    <h2>{title}</h2>

                    <button onClick={showBarChart}>Bar Chart</button>
                    <button onClick={showPieChart}>Pie Chart</button>
                    <button onClick={showRadarChart}>Radar Chart</button>

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






                    {/* <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                            Graph Type
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={showChart("Pie Chart")}>Pie Chart</Dropdown.Item> */}
                    {/* <Dropdown.Item onClick={showChart("Radar Chart")}>Radar Chart</Dropdown.Item>
                            <Dropdown.Item onClick={showChart("PieChart")}>Bar Chart</Dropdown.Item> */}
                    {/* </Dropdown.Menu>
                    </Dropdown> */}
                    {/* <Content /> */}
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
            <Card>
                <Container>
                    <h2>{title}</h2>

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
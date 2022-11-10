import { Card, Container, Col, Dropdown } from "react-bootstrap";
import CircleChartBalances from "../CircleChartBalances/CircleChartBalances";
import { useState } from "react";
import TableHoldings from "../CircleChartBalances/TableHoldings/TableHoldings";

function HoldingsCard({ data }) {
    const [isShownTable, setIsShownTable] = useState(false);
    const [isShownDoughnutChart, setIsShownDoughnutChart] = useState(true);

    const handleSelect = (e) => {
        if (e.target.id === "Circle Chart") {
            setIsShownDoughnutChart(true)
            setIsShownTable(false)
        }
        else if (e.target.id === "Table") {
            setIsShownTable(true)
            setIsShownDoughnutChart(false)
        }
    }

    const options = ["Circle Chart", "Table"]
    return (
        <>
            <Card>
                <div className="holdingCard">
                    <Col>
                        <h2 className="cardTitle">Holdings</h2>
                    </Col>
                    <Col>
                        <Dropdown className="dropDownRight">
                            <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                                Select Graph
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {options.map(option => (
                                    <Dropdown.Item
                                        value={option}
                                        id={option}
                                        key={option}
                                        onClick={handleSelect}>{option}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </div>
                {isShownDoughnutChart &&
                    <CircleChartBalances data={data} />}
                {isShownTable &&
                    <TableHoldings />}

            </Card>
        </>
    )

}
export default HoldingsCard;
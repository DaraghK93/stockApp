import { Card, Col, Dropdown, Container } from "react-bootstrap";
import CircleChartBalances from "../CircleChartBalances/CircleChartBalances";
import { useState } from "react";
import TableHoldings from "../TableHoldings/TableHoldings";

function HoldingsCard({ data, remainder }) {
    const [isShownTable, setIsShownTable] = useState(true);
    const [isShownDoughnutChart, setIsShownDoughnutChart] = useState(false);

    const handleSelect = (e) => {
        if (e.target.id === "By sector") {
            setIsShownDoughnutChart(true)
            setIsShownTable(false)
        }
        else if (e.target.id === "All holdings") {
            setIsShownTable(true)
            setIsShownDoughnutChart(false)
        }
    }


    const options = ["All holdings", "By sector" ]
    return (
        <>
            <Card>
                <div className="holdingCard">
                    <Col>
                        <h2 className="cardTitle">Holdings</h2>
                    </Col>
                    <Col>
                        <div className="dropDownRight">
                            <Dropdown>
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
                        </div>
                    </Col>

                </div>
                <Container>
                    <p>Balance: ${remainder}</p>
                </Container>
                {isShownDoughnutChart &&
                    <CircleChartBalances dataIn={data} />}
                {isShownTable &&
                    <TableHoldings data={data} />}

            </Card>
        </>
    )

}
export default HoldingsCard;
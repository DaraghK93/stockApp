import { Card, Col, Dropdown, Container } from "react-bootstrap";
import { useState } from "react";
import TableHoldings from "../TableHoldings/TableHoldings";

function HoldingsCard({ data, remainder }) {
    const [isShownTable, setIsShownTable] = useState(true);

    const handleSelect = (e) => {
        if (e.target.id === "All holdings") {
            setIsShownTable(true)
        }
    }


    const options = ["All holdings" ]
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
                {isShownTable &&
                    <TableHoldings data={data} />}

            </Card>
        </>
    )

}
export default HoldingsCard;
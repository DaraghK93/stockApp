import { Card, Button, Row, Col } from 'react-bootstrap';
import { useState } from "react";

function OrderType({setOrderType}) {
    const [active2, setActive2] = useState("");

    const handleClick2 = (event) => {
        setActive2(event.target.id);
        if (event.target.id === "1") {
            setOrderType("Market Order")
        }
        else if (event.target.id === "2") {
            setOrderType("Limit Order")
        }
    }

    return (
            <Card className="px-3">
                    <h5 style={{ marginTop: "10px" }}>Order Type</h5>
                    <Row style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                        <Col style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }}>
                            <Button
                                id={"1"}
                                onClick={handleClick2}
                                className={active2 === "1" ? "selectionButtonActive" : "selectionButton"}
                            >
                                Market Order</Button>
                        </Col>
                        <Col style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }}>
                            <Button
                                id={"2"}
                                onClick={handleClick2}
                                className={active2 === "2" ? "selectionButtonActive" : "selectionButton"}
                            >Limit Order</Button>
                        </Col>
                    </Row>
            </Card>
    );
}

export default OrderType;
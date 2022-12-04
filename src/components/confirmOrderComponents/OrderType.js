import { Card, Button, Row, Col } from 'react-bootstrap';
import { useState } from "react";

function OrderType({orderType,setOrderType}) {
    const [active, setActive] = useState("");

    const handleClick = (event) => {
        setActive(event.target.id);
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
                                active={orderType==="Market Order"}
                                size="lg"
                                onClick={handleClick}
                                className={active === "1" ? "selectionButtonActive" : "selectionButton"}
                            >
                                Market</Button>
                        </Col>
                        <Col style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }}>
                            <Button
                                id={"2"}
                                size="lg"
                                active={orderType==="Limit Order"}  
                                onClick={handleClick}
                                className={active === "2" ? "selectionButtonActive" : "selectionButton"}
                            >Limit</Button>
                        </Col>
                    </Row>
            </Card>
    );
}

export default OrderType;
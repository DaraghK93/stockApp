import { Card, Container, Button, Row, Col } from 'react-bootstrap';

function OrderType() {
    return (
        <>
            <Card>
                <Container>
                    <h5 style={{ marginTop: "10px" }}>Order Type</h5>
                    <Row style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Col style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }}>
                            <Button className="selectionButton">Buy</Button>
                        </Col>
                        <Col style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }}>
                            <Button className="selectionButton">Sell</Button>
                        </Col>
                    </Row>
                    <Row style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                        <Col style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }}>
                            <Button className="selectionButton">Market Order</Button>
                        </Col>
                        <Col style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }}>
                            <Button className="selectionButton">Limit Order</Button>
                        </Col>
                    </Row>

                </Container>
            </Card>
        </>
    );
}

export default OrderType;
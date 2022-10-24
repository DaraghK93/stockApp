import { Card, Container, Button, Row, Col } from 'react-bootstrap';

function OrderType() {
    return (
        <>
            <Card>
                <Container>
                    <h5>Order Type</h5>
                    <Row style={{display:"flex", alignItems:"center", justifyContent:"center", marginBottom: "10px"}}>
                        <Col style={{display:"flex", alignItems:"center", justifyContent:"center", padding:"5px"}}>
                            <Button>Market Order</Button>
                        </Col>
                        <Col style={{display:"flex", alignItems:"center", justifyContent:"center", padding:"5px"}}>
                            <Button>Limit Order</Button>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </>
    );
}

export default OrderType;
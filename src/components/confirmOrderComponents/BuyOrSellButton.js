import { Card, Container, Button, Row, Col } from 'react-bootstrap';

function BuyOrSellButton() {
    return (
        <>
            <Card style={{border:"none"}}>
                <Container>
                    <Row style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Col style={{display:"flex", alignItems:"center", justifyContent:"center", padding:"5px"}}>
                            <Button className="btn-outline-primary">Buy</Button>
                        </Col>
                        <Col style={{display:"flex", alignItems:"center", justifyContent:"center", padding:"5px"}}>
                            <Button>Sell</Button>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </>
    );
}

export default BuyOrSellButton;
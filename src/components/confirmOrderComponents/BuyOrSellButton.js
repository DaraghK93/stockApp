import { Card, Container, Button, Row, Col } from 'react-bootstrap';

function BuyOrSellButton() {
    return (
        <>
            <Card style={{border:"none"}}>
                <Container>
                    <Row style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Col style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <Button>Buy</Button>
                        </Col>
                        <Col>
                            <Button>Sell</Button>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </>
    );
}

export default BuyOrSellButton;
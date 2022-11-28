import { ProgressBar, Container, Row, Col, Image } from "react-bootstrap";

function ValueLine() {
    return (
        <Container>
            <Row>
                <Col xs="auto">
                    <Image src="/horses.png" style={{width:"3rem"}}></Image>
                </Col>
                <Col style={{paddingRight: "1rem"}}>
                    <ProgressBar label="Becks" striped variant="info" max={10} min={0} now={2} />
                    <ProgressBar label="Warren" striped variant="success" max={10} min={0} now={8} />
                    <ProgressBar label="Joey" striped variant="danger" max={10} min={0} now={5} />
          
                        <p>The race is on to reach <strong>$1000!</strong></p>
                        </Col>
                        </Row>
                        <Row>
                        <p><strong>Warren</strong> is in the lead, and only has to make <strong>$100</strong> to be crowned the winner.
                            Don't let them win, <strong>make a trade now</strong>!
                        </p>
                    </Row>
        </Container>
    )
}

export default ValueLine;
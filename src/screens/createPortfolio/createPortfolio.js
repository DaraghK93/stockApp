import { Container, Form, Row, Col, Button } from "react-bootstrap"

function CreatePortfolio() {
    return (
        <Container>
            <h1>Create Portfolio</h1>
            <br></br>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column xs={5}>Portfolio Name</Form.Label>
                    <Col xs={6}>
                        <Form.Control type="name" placeholder="" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column xs={5}>Select League</Form.Label>
                    <Col xs={6}>
                        <Form.Control type="name"  disabled />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 disabled">
                    <Form.Label column xs={5}>Select Budget</Form.Label>
                    <Col xs={6}>
                        <Form.Control type="name" disabled />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col xs={{ span: 10, offset: 5 }}>
                        <Button type="submit">Create Portfolio</Button>
                    </Col>
                </Form.Group>
            </Form>
        </Container >
    )
}

export default CreatePortfolio;
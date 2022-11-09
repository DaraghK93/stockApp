import { useState } from 'react'
import { Container, Row, Col,Button} from "react-bootstrap"

function CreateGameScreen(){
    const [screen, setScreen] = useState(1)



    return(
        <Container>
            <Row className="containerContent">
                <Col>
                    <p>Hello</p>
                </Col>
            </Row>
            <Row className="containerButtons" lg={2} md={2} xs={2}>
                <Col className="prevNextCol">
                    <Button>Back</Button>
                </Col>
                <Col className="prevNextCol">
                    <Button>Next</Button>
                </Col>            
            </Row>

        </Container>
    )
}

export default CreateGameScreen;
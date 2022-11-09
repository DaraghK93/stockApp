import { useState } from 'react'
import { Container, Row, Col,Button} from "react-bootstrap"

function CreateGameScreen(){
    const [screen, setScreen] = useState(1)

    console.log(screen)

    return(
        <Container>
            <Row className="containerContent">
                <Col>
                    <p>Hello</p>
                </Col>
            </Row>



            
            <Row className="containerButtons" lg={2} md={2} xs={2}>
                <Col className="prevNextCol">
                    <Button
                        disabled={screen === 1} 
                        onClick={() => {
                            setScreen(screen-1)
                        }}
                    >Back</Button>
                </Col>
                <Col className="prevNextCol">
                    <Button
                        onClick={() => {
                            setScreen(screen+1)
                        }}
                    >Next</Button>
                </Col>            
            </Row>

        </Container>
    )
}

export default CreateGameScreen;
/// Description:
//      This is the screen which is displayed when the user clicks into "game" on the nav bar 

import { Container, Button, Row, Col} from "react-bootstrap"


function GameScreen(){
    return(
        <Container>
            <Row>
                <Col><h1>GameScreen</h1></Col>
            </Row>
            <Row>
                <Col>My Games</Col>
                <Col>Join a Game</Col>
            </Row>
            <Row>
                <Col>Create a Game Component</Col>
            </Row>
            <Row>
                <Col>
                    Active Games 
                </Col>
            </Row>
            <Row>
                <Col>
                    Inactive Games 
                </Col>
            </Row>
        </Container>
    
        )

}

export default GameScreen;
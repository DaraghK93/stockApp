import {Card,Row,Col, ToggleButton} from "react-bootstrap"

function GameQuickGameSelection(){
    return(
         <>
        <Card.Title className="gameOptionsCardTitle">Select a Game</Card.Title>
        <Row>
            <Col>
                Game 1 
            </Col>
            <Col>
                Game 2
            </Col>
            <Col>
                Game 3
            </Col>
            <Col>
                Game 4 
            </Col>
        </Row>
        <Row>
            <Col>
                Configure Own Game
            </Col>
        </Row>
        </>
    )
}

export default GameQuickGameSelection;
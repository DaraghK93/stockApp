import {Card,Row,Col,Button} from "react-bootstrap"

function GameCreationOptionsCard({children, setScreen, screen, gameType}){
    return(
        <Card className="mt-5">
            <Card.Body>
                {children}
                <Row className="containerButtons" lg={2} md={2} xs={2}>
                    <Col className="prevNextCol">
                        <Button
                            disabled={screen === 1} 
                            onClick={() => {
                                setScreen(screen-1)
                            }}
                        >Back</Button>
                    </Col>
                    {(screen === 7 && gameType === "valueBased") || (screen === 6 && gameType === "timeBased")  ?
                        <Col className="prevNextCol">
                            <Button
                                onClick={() => {
                                    console.log("Im done")
                                }}
                            >Finish</Button>
                        </Col>
                        :
                        <Col className="prevNextCol">
                            <Button
                                onClick={() => {
                                    setScreen(screen+1)
                                }}
                            >Next</Button>
                        </Col>
                    }      
            </Row>
            </Card.Body>
        </Card>
    )

}

export default GameCreationOptionsCard;
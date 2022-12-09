import {Card,Row,Col, ToggleButton} from "react-bootstrap"

function GameQuickGameSelection({quickGame,setQuickGame}){
    console.log(quickGame)

    return(
         <>
        <Card.Title className="gameOptionsCardTitle">Select a Game</Card.Title>
        <Row>
            <Col>
                <ToggleButton
                            className="gameDetailsToggleButton"
                            key="gameOne"
                            id="radio-gameOne"
                            type="radio"
                            variant='outline-primary'
                            value="gameOne"
                            checked={quickGame === "gameOne"}
                            onChange={(e) => setQuickGame(e.currentTarget.value)}
                        >
                        <Card>
                                <Card.Body>
                                    <Card.Title>Game One</Card.Title>
                                        <Card.Text>
                                            Race to a goal value
                                        </Card.Text>
                                </Card.Body>
                        </Card>
                </ToggleButton>
            </Col>
            <Col>
            <ToggleButton
                            className="gameDetailsToggleButton"
                            key="gameTwo"
                            id="radio-gameTwo"
                            type="radio"
                            variant='outline-primary'
                            value="gameTwo"
                            checked={quickGame === "gameTwo"}
                            onChange={(e) => setQuickGame("gameTwo")}
                        >
                       <Card>
                                <Card.Body>
                                    <Card.Title>Game Two</Card.Title>
                                        <Card.Text>
                                            Race to a goal value
                                        </Card.Text>
                                </Card.Body>
                        </Card>
                </ToggleButton>
            </Col>
            <Col>
            <ToggleButton
                            className="gameDetailsToggleButton"
                            key="GameThree"
                            id="radio-GameThree"
                            type="radio"
                            variant='outline-primary'
                            value="gameThree"
                            checked={quickGame === "gameThree"}
                            onChange={(e) => setQuickGame(e.currentTarget.value)}
                        >
                        <Card>
                                <Card.Body>
                                    <Card.Title>Game Three</Card.Title>
                                        <Card.Text>
                                            Race to a goal value
                                        </Card.Text>
                                </Card.Body>
                        </Card>  
                </ToggleButton>
            </Col>
            <Col>
                  <ToggleButton
                            className="gameDetailsToggleButton"
                            key="gameFour"
                            id="radio-gameFour"
                            type="radio"
                            variant='outline-primary'
                            value="gameFour"
                            checked={quickGame === "gameFour"}
                            onChange={(e) => setQuickGame(e.currentTarget.value)}
                        >
                        <Card>
                                <Card.Body>
                                    <Card.Title>Game Four</Card.Title>
                                        <Card.Text>
                                            Race to a goal value
                                        </Card.Text>
                                </Card.Body>
                        </Card>  
                </ToggleButton>
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
import {Card,Row,Col, ToggleButton} from "react-bootstrap"
import SprintIcon from "../../icons/SprintIcon";
import RaceFlagIcon from "../../icons/RaceFlag";
import TreeIcon from "../../icons/TreeIcon";
import CoderIcon from "../../icons/CoderIcon";

function GameQuickGameSelection({quickGame,setQuickGame}){
    console.log(quickGame)

    return(
         <>
        <Card.Title className="gameOptionsCardTitle">Quick Game or Configure Game</Card.Title>
        <Row md={4} sm={1} xs={1}>
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
                        <Card className="quickGameCard">
                                <Card.Body>
                                    <Card.Title>Quick Sprint</Card.Title>
                                        <Card.Text>
                                            1 Week, $100,000, most profit wins!
                                        </Card.Text>
                                        <SprintIcon height="5rem" width="5rem" color="green"/>
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
                       <Card className="quickGameCard">
                                <Card.Body>
                                    <Card.Title>Stock Race</Card.Title>
                                        <Card.Text>
                                            Turn $100,000 into $105,000 to win! 
                                        </Card.Text>
                                        <RaceFlagIcon height="5rem" width="5rem" />
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
                        <Card className="quickGameCard">
                                <Card.Body>
                                    <Card.Title>Tree Huggers</Card.Title>
                                        <Card.Text>
                                            Environmentally Friendly Stocks Only! 
                                        </Card.Text>
                                        <TreeIcon height="5rem" width="5rem"/>
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
                        <Card className="quickGameCard">
                                <Card.Body>
                                    <Card.Title>Silicon Valley</Card.Title>
                                        <Card.Text>
                                            Technology Stocks Only! 
                                        </Card.Text>
                                        <CoderIcon height="5rem" width="5rem"/>
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
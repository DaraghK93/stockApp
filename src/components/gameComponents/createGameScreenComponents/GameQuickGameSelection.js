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
        <Row md={4} sm={2} xs={2}>
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
                                        <Card.Text className="quickGameCardBodyText">
                                            1 Week, $100,000, most profit wins!
                                        </Card.Text>
                                        <SprintIcon className="quickGameCardIcons" color="green"/>
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
                                        <Card.Text className="quickGameCardBodyText">
                                            Turn $100,000 into $105,000 to win! 
                                        </Card.Text>
                                        <RaceFlagIcon className="quickGameCardIcons" />
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
                                        <Card.Text className="quickGameCardBodyText">
                                            Green Stocks Only! 
                                        </Card.Text>
                                        <TreeIcon className="quickGameCardIcons"/>
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
                                        <Card.Text className="quickGameCardBodyText">
                                            Technology Stocks Only! 
                                        </Card.Text>
                                        <CoderIcon className="quickGameCardIcons"/>
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
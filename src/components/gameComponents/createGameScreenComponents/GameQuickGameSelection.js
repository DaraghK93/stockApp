import {Card,Row,Col, ToggleButton} from "react-bootstrap"
import SprintIcon from "../../icons/SprintIcon";
import RaceFlagIcon from "../../icons/RaceFlag";
import TreeIcon from "../../icons/TreeIcon";
import CoderIcon from "../../icons/CoderIcon";

function GameQuickGameSelection({quickGame,setQuickGame}){
    console.log(quickGame)

    return(
         <>
        <Card.Title className="gameOptionsCardTitle">Select Game</Card.Title>
        <Card.Text className="gameOptionsCardText">Get Started Now With a Quick Game</Card.Text>
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
                                    <SprintIcon className="quickGameCardIcons" color="green"/>
                                        <Card.Text className="quickGameCardBodyText">
                                            7 Days $100k to spend!
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
                       <Card className="quickGameCard">
                                <Card.Body>
                                    <RaceFlagIcon className="quickGameCardIcons" />
                                        <Card.Text className="quickGameCardBodyText">
                                            Turn $100k into $105k first to win! 
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
                        <Card className="quickGameCard">
                                <Card.Body>
                                    <TreeIcon className="quickGameCardIcons"/>
                                        <Card.Text className="quickGameCardBodyText">
                                            Green Stocks Only! 
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
                        <Card className="quickGameCard">
                                <Card.Body>
                                    <CoderIcon className="quickGameCardIcons"/>
                                        <Card.Text className="quickGameCardBodyText">
                                            Technology Stocks Only! 
                                        </Card.Text>
                                        
                                </Card.Body>
                        </Card>  
                </ToggleButton>
            </Col>
        </Row>
        <Row>
            <Card.Text className="gameOptionsCardText">Or Customise Your Own Game</Card.Text>
            <Col>
                Configure Own Game
            </Col>
        </Row>
        </>
    )
}

export default GameQuickGameSelection;
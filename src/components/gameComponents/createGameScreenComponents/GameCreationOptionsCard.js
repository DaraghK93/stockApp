/// Description:
//      This coponent is used for the game creation screen
//      It is used to display the options for creating a game along with the pagination
import {Card,Row,Col,Button} from "react-bootstrap"

/// GameCreationOptionsCard ///
//  poprs:
//      children  - The children of the component https://reactjs.org/docs/composition-vs-inheritance.html
//      setScreen - Setter to set createGameScreen state
//      screen    - The screen state set by setScreen
//      gameType  - The type of game, depedning upon game type there will  be extra screen for valueBased game 
function GameCreationOptionsCard({children, setScreen, screen, gameType}){
    return(
        <Card className="mt-5">
            <Card.Body>
                {children}
                <Row className="containerButtons" lg={2} md={2} xs={2}>
                    <Col className="prevNextCol">
                        {screen > 1 &&
                        <Button
                            onClick={() => {
                                setScreen(screen-1)
                            }}
                        >Back</Button>
                    }
                    </Col>
                    {(screen === 7 && gameType === "valueBased") || (screen === 6 && gameType === "timeBased")  ?
                        <Col className="prevNextCol">
                            <Button
                                onClick={() => {
                                    console.log("Im done this will eventually be redirect")
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
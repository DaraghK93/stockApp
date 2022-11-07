/// Description:
//      This is the screen which is displayed when the user clicks into "game" on the nav bar 
import { useState } from 'react'
import { Container, Row, Col} from "react-bootstrap"

//// Components ///
import ScreenSelectionRadioButton from "../../components/gameComponents/gameScreenComponents/screenSelectionRadioButton/screenSelectionRadioButton";
import CreateGameCard from '../../components/gameComponents/gameScreenComponents/createGameCard/createGameCard';




function GameScreen(){
    // constant email holds the value of the input email address
    const [screen, setScreen] = useState('1')


    /// The choices for the screens, used for buttons at top o screen 
    var screenChocies = [
        {name: 'My Games', value:'1'},
        {name: 'Join a Game', value: '2'}
    ]

    return(
        <Container>
            <Row className="py-3" lg={1} md={1} xs={1}>
                <ScreenSelectionRadioButton choices={screenChocies} state={screen} setter={setScreen}/>
            </Row>
            {screen === "1" ?(
            <>
            <Row className="px-2" lg={1} md={1} xs={1}>
                <CreateGameCard/>
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
            </>)
            :
            (
                <Row>
                    Join a Game Screen
                </Row>
            )}
        </Container>
    
        )

}

export default GameScreen;
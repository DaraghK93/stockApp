import {Card,Row,Col} from "react-bootstrap"
import ScreenSelectionRadioButton from "../gameScreenComponents/screenSelectionRadioButton/screenSelectionRadioButton"
import { useState} from 'react'
function GameSectorsSelection({}){
    const [screen, setScreen] = useState('1')

    /// The choices for the screens, used for buttons at top of screen 
    var screenChocies = [
        {name: 'All Sectors', value:'1'},
        {name: 'Select Sectors', value: '2'}
    ]
    


    return(
        <>
            <Card.Title  className="gameOptionsCardTitle">Stock Sectors</Card.Title>
            <Row>
                <ScreenSelectionRadioButton choices={screenChocies} state={screen} setter={setScreen}/>
            </Row>
        </>
    )
}

export default GameSectorsSelection;
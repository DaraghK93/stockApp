import {Card,Row,ToggleButton,ToggleButtonGroup,Col} from "react-bootstrap"
import ScreenSelectionRadioButton from "../gameScreenComponents/screenSelectionRadioButton/screenSelectionRadioButton"
import { useState} from 'react'
function GameSectorsSelection({}){
    const [screen, setScreen] = useState('1')
    const [values, setValues] = useState()

    /// The choices for the screens, used for buttons at top of screen 
    var sectorChoice = [
        {name: 'All Sectors', value:'1'},
        {name: 'Select Sectors', value: '2'}
    ]

    var individualSectors = [
        'Basic Materials',
        'Communication Services',
        'Consumer Cyclical',
        'Consumer Defensive',
        'Energy',
        'Financial Services',
        'Healthcare',
        'Industrials',
        'Real Estate',
        'Technology',
        'Utilities'
    ]

    const handleChange = (val) => {
        console.log(val)
    }
    
    return(
        <>
            <Card.Title  className="gameOptionsCardTitle">Stock Sectors</Card.Title>
            <Row className="pb-2">
                <ScreenSelectionRadioButton choices={sectorChoice} state={screen} setter={setScreen}/>
            </Row>
                <ToggleButtonGroup type="checkbox" value={values} onChange={handleChange}>
                    {individualSectors.map((sector, idx) => (
                         <ToggleButton
                            id={sector}
                            value={sector}
                            variant='outline-primary'
                            disabled = {screen === "1"}
                        >
                            {sector}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
          
        </>
    )
}

export default GameSectorsSelection;
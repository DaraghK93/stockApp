import {Card,Row,ToggleButton,ToggleButtonGroup,Col} from "react-bootstrap"
import ScreenSelectionRadioButton from "../gameScreenComponents/screenSelectionRadioButton/screenSelectionRadioButton"
import { useState} from 'react'
function GameSectorsSelection({stockTypes, setStockTypes}){
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
        console.log(values)
    }

    const handleToggle = (e) => {
        /// Check if value in the array 
        if (stockTypes.includes(e.currentTarget.value)){
            /// Make a copy, remove the value from the copy first and then push 
            var sectors = [...stockTypes]
            var index   = sectors.indexOf(e.currentTarget.value)
            sectors.splice(index,1)
            setStockTypes(sectors)
        }else{
            setStockTypes([...stockTypes,e.currentTarget.value])
        }
    }
    
    return(
        <>
            <Card.Title  className="gameOptionsCardTitle">Stock Sectors</Card.Title>
            <Row className="pb-2">
                <ScreenSelectionRadioButton choices={sectorChoice} state={screen} setter={setScreen}/>
            </Row>
                <Row md={4} xs={1}>
                {individualSectors.map((sector, idx) => (
                                                    <Col>
                                                        <ToggleButton
                                                            onChange={handleToggle}
                                                            type="checkbox"
                                                            id={sector}
                                                            value={sector}
                                                            variant='outline-primary'
                                                            checked={stockTypes.includes(sector)}
                                                            disabled = {screen === "1"}
                                                        >
                                                            {sector}
                                                        </ToggleButton>
                                                    </Col>
                                                ))}
                </Row>
                               
                            


                
          
        </>
    )
}
//<ToggleButtonGroup type="checkbox" value={values} onChange={handleChange}> </ToggleButtonGroup>
export default GameSectorsSelection;
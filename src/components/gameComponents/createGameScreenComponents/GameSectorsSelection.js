import {Card,Row,ToggleButton,Col} from "react-bootstrap"
import ScreenSelectionRadioButton from "../gameScreenComponents/screenSelectionRadioButton/screenSelectionRadioButton"
import {useState,useEffect, useMemo} from 'react'

function GameSectorsSelection({stockTypes, setStockTypes}){
    /// Screen used for "All Sectors" or "Select Sector"
    const [screen, setScreen] = useState()

    /// The choices for the screens, used for buttons at top of screen 
    var sectorChoice = [
        {name: 'All Sectors', value:'1'},
        {name: 'Select Sectors', value: '2'}
    ]

    /// use the useMemo hook to initiliase this to stop rerender 
    const individualSectors = useMemo(() => 
        [
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
        ],[])

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

    /// useEffect ///
    useEffect(() => { 
        if (typeof screen === "undefined" && stockTypes.length === individualSectors.length){
            /// If a user first enters the page set the page to all sectors 
            setScreen("1")
        }else if (typeof screen === "undefined" && stockTypes.length < individualSectors.length){
            /// If a user clicks off the page but we they have already deselected some value, set page to 2 
            setScreen("2")
       }else if (screen === "1" && stockTypes.length < individualSectors.length){
            /// When the use clicks "All Sectors" set the stockTypes state to all the sectors 
            setStockTypes([...individualSectors])
        }
    },[screen,individualSectors,setStockTypes,stockTypes])


    return(
        <>
            <Card.Title  className="gameOptionsCardTitle">Stock Sectors</Card.Title>
            <Row className="pb-2">
                <ScreenSelectionRadioButton choices={sectorChoice} state={screen} setter={setScreen}/>
            </Row>
                <Row className="py-3" md={4} xs={1}>
                {individualSectors.map((sector, idx) => (
                                                    <Col
                                                        key={`Col-${sector}`}
                                                        className="p-2"
                                                    >
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

export default GameSectorsSelection;
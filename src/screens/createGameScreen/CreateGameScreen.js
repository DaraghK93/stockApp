import { useState } from 'react'
import { Container, Row, Col,Button} from "react-bootstrap"

function CreateGameScreen(){
    const [screen, setScreen]       = useState(1)
    /// Page 1 State - Name, Type and Image for game
    const [gameName, setGameName]   = useState("")
    const [gameType, setGameType]   = useState("")
    const [gameImage, setGameImage] = useState("") 
    /// Page 2 - The duration of game, start data only for value based game
    const [gameStartDate, setGameStartDate] = useState("")
    const [gameEndDate, setGameEndDate] = useState("")
    /// Page 3 - Target value, only used if the game is value based 
    const [gameTargetValue, setGameTargetValue] = useState()
    /// Page 4 - Stock types, user can define custom stocks to trade 
    const [stockTypes, setStockTypes] = useState()
    /// Page 5 - The ESG settings, can ddefine min ratings for ESG 
    const [minEnvironmentRating, setMinEnvironmentRating] = useState("")
    const [minSocialRating, setSocialRating]         = useState("")
    const [minGovernanceRating, setGovernanceRating] = useState("")
    /// Page 6 - The strting balance, trading fee and the maxTrades per day 
    const [startingBalance, setStartingBalance] = useState("")
    const [tradingFee, setTradingFee] = useState("")
    const [maxTradesPerDay,setMaxTradesPerDay] = useState("")



    return(
        <Container>
            <Row className="containerContent">
                {screen === 1 ?
                <Col>
                    <h1>Game Name</h1>
                </Col>
                :screen === 2 ?
                <Col>
                    <h1>Duration</h1>
                </Col>
                :
                <Col>
                    <p>Default</p>
                </Col>
                }   
            </Row>




            <Row className="containerButtons" lg={2} md={2} xs={2}>
                <Col className="prevNextCol">
                    <Button
                        disabled={screen === 1} 
                        onClick={() => {
                            setScreen(screen-1)
                        }}
                    >Back</Button>
                </Col>
                <Col className="prevNextCol">
                    <Button
                        onClick={() => {
                            setScreen(screen+1)
                        }}
                    >Next</Button>
                </Col>            
            </Row>

        </Container>
    )
}

export default CreateGameScreen;
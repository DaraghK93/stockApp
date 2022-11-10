import { useState } from 'react'
import { Container, Row, Col,Button} from "react-bootstrap"

/// Componeents ///
import GameNameTypeImage from '../../components/gameComponents/createGameScreenComponents/gameNameTypeAndImage'
import {useSelector} from 'react-redux';
import GameCreationOptionsCard from '../../components/gameComponents/createGameScreenComponents/GameCreationOptionsCard';

function CreateGameScreen(){
    /// Redux ///
    const user = useSelector((state) => state.user)
    // Get the userInfo piece of state, dont need loading and error
    const {userInfo} = user; 
    const [screen, setScreen]       = useState(1)
    /// Page 1 State - Name, Type and Image for game
    const [gameName, setGameName]   = useState(`${userInfo.firstname}'s Stock Trading Game`)
    const [gameType, setGameType]   = useState("valueBased")
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


    //setGameType("valueBased")
    return(
        <Container style={{"textAlign":"center","alignItems":"center"}}>
            <Row className="containerContent">
                {screen === 1 ?
                    <GameCreationOptionsCard screen={screen} setScreen={setScreen} gameType={gameType}>
                        <h1>Hello</h1>
                    </GameCreationOptionsCard>
                :screen === 2 ?
                <Col>
                    <h1>Duration</h1>
                </Col>
                :screen === 3 && gameType === "valueBased" ?
                <Col>
                    <h1>The Winning Value Screen</h1>
                </Col>
                :(screen === 4 && gameType === "valueBased") || (screen === 3 && gameType === "timeBased")?
                    <Col>
                        <h1>Stock Type Screen</h1>
                    </Col>
                :(screen === 5 && gameType === "valueBased") || (screen === 4 && gameType === "timeBased")?
                    <Col>
                        <h1>ESG Restrictions</h1>
                    </Col>
                :(screen === 6 && gameType === "valueBased") || (screen === 5 && gameType === "timeBased")?
                    <Col>
                        <h1>Budget and Fees</h1>
                    </Col>
                :(screen === 7 && gameType === "valueBased") || (screen === 6 && gameType === "timeBased")?
                <Col>
                    <h1>Game Summary</h1>
                </Col>
                :
                <Col>
                    <h1>Hello</h1>
                </Col>
                }   
            </Row>
        </Container>
    )
}

export default CreateGameScreen;
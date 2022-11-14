import { useState } from 'react'
import { Container, Row, Col} from "react-bootstrap"
import {useSelector} from 'react-redux';

/// Componeents ///
import GameCreationOptionsCard from '../../components/gameComponents/createGameScreenComponents/GameCreationOptionsCard';
import GameNameImageTypeSelection from '../../components/gameComponents/createGameScreenComponents/GameNameImageTypeSelection';
import GameDurationSelection from '../../components/gameComponents/createGameScreenComponents/GameDurationSelection';

function CreateGameScreen(){
    /// Redux ///
    const user = useSelector((state) => state.user)
    // Get the userInfo piece of state, dont need loading and error
    const {userInfo} = user;

    /// screen - The screen number
    const [screen, setScreen]       = useState(1)
    /// Page 1 State - Name, Type and Image for game
    const [gameName, setGameName]   = useState(`${userInfo.firstname}'s Stock Trading Game`)
    const [gameType, setGameType]   = useState("")
    const [gameImage, setGameImage] = useState("") 
    /// Page 2 - The duration of game, initialise start date today, end date do two weeks, they have to be initlised as date object for calender 
    const days = 14
    const ms   = new Date().getTime() + (86400000 *days);
    const twoWeeks = new Date(ms);
    const [gameStartDate, setGameStartDate] = useState(new Date())
    const [gameEndDate, setGameEndDate] = useState(twoWeeks)
    /// Page 3 - Target value, only used if the game is value based 
    //const [gameTargetValue, setGameTargetValue] = useState()
    /// Page 4 - Stock types, user can define custom stocks to trade 
    //const [stockTypes, setStockTypes] = useState()
    /// Page 5 - The ESG settings, can ddefine min ratings for ESG 
    //const [minEnvironmentRating, setMinEnvironmentRating] = useState("")
    //const [minSocialRating, setSocialRating]         = useState("")
    //const [minGovernanceRating, setGovernanceRating] = useState("")
    /// Page 6 - The strting balance, trading fee and the maxTrades per day 
    //const [startingBalance, setStartingBalance] = useState("")
    //const [tradingFee, setTradingFee] = useState("")
    //const [maxTradesPerDay,setMaxTradesPerDay] = useState("")


    //setGameType("valueBased")
    return(
        <Container style={{"textAlign":"center","alignItems":"center"}}>
            <Row className="containerContent">
                {screen === 1 ?
                <Col>
                    <GameCreationOptionsCard screen={screen} setScreen={setScreen} gameType={gameType} disableNextStep={!(gameType&&gameName&&gameImage)}>
                        <GameNameImageTypeSelection 
                            gameType={gameType} setGameType={setGameType}  
                            gameName={gameName} setGameName={setGameName} 
                            gameImage={gameImage} setGameImage={setGameImage}
                            />
                    </GameCreationOptionsCard>
                </Col>
                :screen === 2 ?
                <Col>
                    <GameCreationOptionsCard screen={screen} setScreen={setScreen} gameType={gameType}>
                        <GameDurationSelection 
                            gameStartDate={gameStartDate} 
                            setGameStartDate={setGameStartDate}
                            gameEndDate={gameEndDate}
                            setGameEndDate={setGameEndDate}
                            gameType={gameType}
                        />
                    </GameCreationOptionsCard>
                </Col>
                :screen === 3 && gameType === "valueBased" ?
                <Col>
                    <GameCreationOptionsCard screen={screen} setScreen={setScreen} gameType={gameType}>
                        <h1>This will be the winning value screen</h1>
                    </GameCreationOptionsCard>
                </Col>
                :(screen === 4 && gameType === "valueBased") || (screen === 3 && gameType === "timeBased")?
                    <Col>
                        <GameCreationOptionsCard screen={screen} setScreen={setScreen} gameType={gameType}>
                            <h1>This will be stock type screen</h1>
                        </GameCreationOptionsCard>
                    </Col>
                :(screen === 5 && gameType === "valueBased") || (screen === 4 && gameType === "timeBased")?
                <Col>
                    <GameCreationOptionsCard screen={screen} setScreen={setScreen} gameType={gameType}>
                        <h1>This will be the ESG restrictions screen</h1>
                    </GameCreationOptionsCard>
                </Col>
                :(screen === 6 && gameType === "valueBased") || (screen === 5 && gameType === "timeBased")?
                <Col>
                    <GameCreationOptionsCard screen={screen} setScreen={setScreen} gameType={gameType}>
                        <h1>This will be the budget and fees screen</h1>
                    </GameCreationOptionsCard>
                </Col>
                :
                <Col>
                <GameCreationOptionsCard screen={screen} setScreen={setScreen} gameType={gameType}>
                        <h1>This will be the Game Summary Screen</h1>
                </GameCreationOptionsCard>
                </Col>
                }   
            </Row>
        </Container>
    )
}

export default CreateGameScreen;
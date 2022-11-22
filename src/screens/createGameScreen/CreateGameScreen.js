import { useState } from 'react'
import { Container, Row, Col} from "react-bootstrap"
import {useSelector} from 'react-redux';

/// Componeents ///
import GameCreationOptionsCard from '../../components/gameComponents/createGameScreenComponents/GameCreationOptionsCard';
import GameNameImageTypeSelection from '../../components/gameComponents/createGameScreenComponents/GameNameImageTypeSelection';
import GameDurationSelection from '../../components/gameComponents/createGameScreenComponents/GameDurationSelection';
import GameBalanceFeesTradeSelection from '../../components/gameComponents/createGameScreenComponents/GameBalanceFeesTradesSelection';
import GameWinningValueSelection from '../../components/gameComponents/createGameScreenComponents/GameWinningValueSelection';
import GameSectorsSelection from '../../components/gameComponents/createGameScreenComponents/GameSectorsSelection';
import GameESGRestrictionsSelection from '../../components/gameComponents/createGameScreenComponents/GameESGRestrrictionsSelection';

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
    const [gameStartDate, setGameStartDate] = useState(new Date())
    const days = 14
    const ms   = gameStartDate.getTime() + (86400000 *days); /// 86400000 -> ms in a day 
    const twoWeeks = new Date(ms); // set gameEnd default to two weeks from today 
    const [gameEndDate, setGameEndDate] = useState(twoWeeks)
    /// Page 3 - Starting Balance, fees and max trades 
    const [startingBalance, setStartingBalance] = useState(100000)
    const [tradingFee, setTradingFee] = useState(20)
    const [maxTradesPerDay,setMaxTradesPerDay] = useState(5)
    /// Page 4 - Winning value, only used if the game is value based 
    const [gameWinningValue, setGameWinningValue] = useState()
    /// Page 5 - Stock types, user can define custom stocks to trade 
    const [stockTypes, setStockTypes] = useState(['Basic Materials','Communication Services','Consumer Cyclical','Consumer Defensive','Energy','Financial Services','Healthcare','Industrials','Real Estate','Technology','Utilities'])
    /// Page 6 - The ESG settings, can ddefine min ratings for ESG 
    const [ESGGameType, setESGGameType] = useState("")
    const [minEnvironmentRating, setMinEnvironmentRating] = useState("")
    const [minSocialRating, setMinSocialRating]         = useState("")
    const [minGovernanceRating, setMinGovernanceRating] = useState("")
    /// Page 7 - The strting balance, trading fee and the maxTrades per day 
    
    /// Constants ///
    const minStartingBalance = 1000 
    const maxStartingBalance = 1000000
    const minTradingFee      = 1
    const maxTradingFee      = 300
    const minTrades          = 1
    const maxTrades          = 100
    const maxWinningValue    = Math.round(startingBalance*1.15)
    const minWinningValue    = Math.round(startingBalance*1.01)

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
                :screen === 3 ?
                <Col>
                    <GameCreationOptionsCard 
                        screen={screen} 
                        setScreen={setScreen} 
                        gameType={gameType}
                        disableNextStep={
                            !((startingBalance>= minStartingBalance && startingBalance<=maxStartingBalance) 
                            && (tradingFee>=minTradingFee && tradingFee<=maxTradingFee) 
                            && (maxTradesPerDay>=minTrades && maxTradesPerDay<=maxTrades))
                        }
                        >
                        <GameBalanceFeesTradeSelection
                            startingBalance = {startingBalance}
                            setStartingBalance = {setStartingBalance}
                            tradingFee = {tradingFee}
                            setTradingFee = {setTradingFee}
                            maxTradesPerDay = {maxTradesPerDay}
                            setMaxTradesPerDay ={setMaxTradesPerDay}
                        />
                    </GameCreationOptionsCard>
                </Col>
                :screen === 4 && gameType === "valueBased" ?
                <Col>
                    <GameCreationOptionsCard 
                        screen={screen} 
                        setScreen={setScreen} 
                        gameType={gameType}
                        disableNextStep={
                            !(gameWinningValue>=minWinningValue&&gameWinningValue<=maxWinningValue)
                        }
                        >
                        <GameWinningValueSelection 
                            startingBalance = {startingBalance}
                            gameWinningValue = {gameWinningValue} 
                            setGameWinningValue = {setGameWinningValue}
                        />
                    </GameCreationOptionsCard>
                </Col>
                :(screen === 5 && gameType === "valueBased") || (screen === 4 && gameType === "timeBased")?
                    <Col>
                        <GameCreationOptionsCard 
                            screen={screen} 
                            setScreen={setScreen} 
                            gameType={gameType}
                            disableNextStep={
                                (stockTypes.length === 0)
                            }
                            >
                            <GameSectorsSelection 
                                stockTypes={stockTypes} 
                                setStockTypes={setStockTypes}
                            />
                        </GameCreationOptionsCard>
                    </Col>
                :(screen === 6 && gameType === "valueBased") || (screen === 5 && gameType === "timeBased")?
                <Col>
                    <GameCreationOptionsCard 
                        screen={screen} 
                        setScreen={setScreen} 
                        gameType={gameType}
                        disableNextStep={!(ESGGameType)}
                        >
                        <GameESGRestrictionsSelection
                            setMinEnvironmentRating={setMinEnvironmentRating}
                            setMinSocialRating={setMinSocialRating}
                            setMinGovernanceRating={setMinGovernanceRating}
                            ESGGameType={ESGGameType}
                            setESGGameType={setESGGameType}
                        />
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
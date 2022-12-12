import { useState,useEffect } from 'react'
import { Container, Row} from "react-bootstrap"
import {useSelector} from 'react-redux';

/// Componeents ///
import GameCreationOptionsCard from '../../components/gameComponents/createGameScreenComponents/GameCreationOptionsCard';
import GameQuickGameSelection from '../../components/gameComponents/createGameScreenComponents/GameQuickGameSelection';
import GameNameImageTypeSelection from '../../components/gameComponents/createGameScreenComponents/GameNameImageTypeSelection';
import GameDurationSelection from '../../components/gameComponents/createGameScreenComponents/GameDurationSelection';
import GameBalanceFeesTradeSelection from '../../components/gameComponents/createGameScreenComponents/GameBalanceFeesTradesSelection';
import GameWinningValueSelection from '../../components/gameComponents/createGameScreenComponents/GameWinningValueSelection';
import GameSectorsSelection from '../../components/gameComponents/createGameScreenComponents/GameSectorsSelection';
import GameESGRestrictionsSelection from '../../components/gameComponents/createGameScreenComponents/GameESGRestrrictionsSelection';
import GameCreationSummary from '../../components/gameComponents/createGameScreenComponents/GameCreationSummary';

function CreateGameScreen(){
    /// Redux ///
    const user = useSelector((state) => state.user)
    // Get the userInfo piece of state, dont need loading and error
    const {userInfo} = user;

    /// screen - The screen number
    const [screen, setScreen]       = useState(1);
    const [mobileScreen, setMobileScreen] = useState()

    /// QucikGameSelection 
    const [quickGame, setQuickGame] = useState();


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
    const [gameDurationError, setGameDurationError] = useState()
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


    /// For mobile views 
    window.addEventListener("resize", screenSizeChange);

    function screenSizeChange() {
        if (window.innerWidth >= 800) {
            setMobileScreen(false)
        }
        else {
            setMobileScreen(true)
        }
    }
    /// Set the initial size of Window ///
    useEffect(() => {
        screenSizeChange()
    },[])
    return(
        <Container style={{"textAlign":"center","alignItems":"center","marginBottom":"100px"}}>
            <Row className="containerContent">
                {screen === 1 ?
                    <GameCreationOptionsCard screen={screen} setScreen={setScreen} gameType={gameType} disableNextStep={!(quickGame)} mobileScreen={mobileScreen} quickGame={quickGame}>
                       <GameQuickGameSelection
                        quickGame={quickGame} setQuickGame={setQuickGame}
                        setGameName={setGameName} setGameType={setGameType}
                        setGameImage={setGameImage} setGameStartDate={setGameStartDate}
                        setGameEndDate={setGameEndDate} setStartingBalance={setStartingBalance}
                        setTradingFee={setTradingFee} setMaxTradesPerDay={setMaxTradesPerDay}
                        setStockTypes={setStockTypes} setESGGameType={setESGGameType}
                        setMinEnvironmentRating={setMinEnvironmentRating} setMinSocialRating={setMinSocialRating}
                        setMinGovernanceRating={setMinGovernanceRating}  setGameWinningValue={setGameWinningValue}
                       /> 
                    </GameCreationOptionsCard>
                :screen === 2 ?
                    <GameCreationOptionsCard screen={screen} setScreen={setScreen} gameType={gameType} disableNextStep={!(gameType&&gameName&&gameImage)} mobileScreen={mobileScreen} quickGame={quickGame}>
                        <GameNameImageTypeSelection 
                            gameType={gameType} setGameType={setGameType}  
                            gameName={gameName} setGameName={setGameName} 
                            gameImage={gameImage} setGameImage={setGameImage}
                            />
                    </GameCreationOptionsCard>
                :screen === 3 ?
                    <GameCreationOptionsCard screen={screen} setScreen={setScreen} gameType={gameType} mobileScreen={mobileScreen} quickGame={quickGame} disableNextStep={gameDurationError}>
                        <GameDurationSelection 
                            gameStartDate={gameStartDate} 
                            setGameStartDate={setGameStartDate}
                            gameEndDate={gameEndDate}
                            setGameEndDate={setGameEndDate}
                            gameType={gameType}
                            gameDurationError={gameDurationError} setGameDurationError={setGameDurationError}
                        />
                    </GameCreationOptionsCard>
                :screen === 4 ?
                    <GameCreationOptionsCard 
                        screen={screen} 
                        setScreen={setScreen} 
                        gameType={gameType}
                        quickGame={quickGame}
                        disableNextStep={
                            !((startingBalance>= minStartingBalance && startingBalance<=maxStartingBalance) 
                            && (tradingFee>=minTradingFee && tradingFee<=maxTradingFee) 
                            && (maxTradesPerDay>=minTrades && maxTradesPerDay<=maxTrades))
                        }
                        mobileScreen={mobileScreen}>
                        <GameBalanceFeesTradeSelection
                            startingBalance = {startingBalance}
                            setStartingBalance = {setStartingBalance}
                            tradingFee = {tradingFee}
                            setTradingFee = {setTradingFee}
                            maxTradesPerDay = {maxTradesPerDay}
                            setMaxTradesPerDay ={setMaxTradesPerDay}
                        />
                    </GameCreationOptionsCard>
                :screen === 5 && gameType === "valueBased" ?
                    <GameCreationOptionsCard 
                        screen={screen} 
                        quickGame={quickGame}
                        setScreen={setScreen} 
                        gameType={gameType}
                        disableNextStep={
                            !(gameWinningValue>=minWinningValue&&gameWinningValue<=maxWinningValue)
                        }
                        mobileScreen={mobileScreen} >
                        <GameWinningValueSelection 
                            startingBalance = {startingBalance}
                            gameWinningValue = {gameWinningValue} 
                            setGameWinningValue = {setGameWinningValue}
                        />
                    </GameCreationOptionsCard>
                :(screen === 6 && gameType === "valueBased") || (screen === 5 && gameType === "timeBased")?
                        <GameCreationOptionsCard 
                            screen={screen} 
                            setScreen={setScreen} 
                            quickGame={quickGame}
                            gameType={gameType}
                            disableNextStep={
                                (stockTypes.length === 0)
                            }
                            mobileScreen={mobileScreen}>
                            <GameSectorsSelection 
                                stockTypes={stockTypes} 
                                setStockTypes={setStockTypes}
                            />
                        </GameCreationOptionsCard>
                :(screen === 7 && gameType === "valueBased") || (screen === 6 && gameType === "timeBased" )?
                    <GameCreationOptionsCard 
                        screen={screen} 
                        setScreen={setScreen} 
                        quickGame={quickGame}
                        gameType={gameType}
                        disableNextStep={!(ESGGameType)}
                        mobileScreen={mobileScreen}>
                        <GameESGRestrictionsSelection
                            setMinEnvironmentRating={setMinEnvironmentRating}
                            setMinSocialRating={setMinSocialRating}
                            setMinGovernanceRating={setMinGovernanceRating}
                            ESGGameType={ESGGameType}
                            setESGGameType={setESGGameType}
                        />
                    </GameCreationOptionsCard>
                :
                    <GameCreationOptionsCard 
                        screen={screen} setScreen={setScreen} 
                        gameName={gameName} gameType={gameType} gameImage={gameImage} 
                        gameStartDate={gameStartDate} gameEndDate={gameEndDate} 
                        startingBalance={startingBalance} tradingFee={tradingFee} maxTradesPerDay={maxTradesPerDay} 
                        gameWinningValue={gameWinningValue} stockTypes={stockTypes} 
                        minEnvironmentRating={minEnvironmentRating}  minSocialRating={minSocialRating} 
                        minGovernanceRating={minGovernanceRating}
                        mobileScreen={mobileScreen} quickGame={quickGame}>
                            <GameCreationSummary 
                                gameType={gameType}
                                gameName={gameName}
                                gameStartDate={gameStartDate}
                                gameEndDate={gameEndDate}
                                startingBalance={startingBalance}
                                tradingFee={tradingFee}
                                maxTradesPerDay={maxTradesPerDay}
                                gameWinningValue={gameWinningValue}
                                stockTypes={stockTypes}
                                ESGGameType={ESGGameType}
                            />
                    </GameCreationOptionsCard>
                }   
            </Row>
        </Container>
    )
}

export default CreateGameScreen;
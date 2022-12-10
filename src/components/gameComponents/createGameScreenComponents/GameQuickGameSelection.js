import {Card,Row,Col, ToggleButton} from "react-bootstrap"
import SprintIcon from "../../icons/SprintIcon";
import RaceFlagIcon from "../../icons/RaceFlag";
import TreeIcon from "../../icons/TreeIcon";
import CoderIcon from "../../icons/CoderIcon";
import PencilIcon from "../../icons/PencilIcon";

function GameQuickGameSelection({quickGame,setQuickGame,
    setGameName,
    setGameType,
    setGameImage,
    setGameStartDate,
    setGameEndDate,
    setStartingBalance,
    setTradingFee,
    setMaxTradesPerDay,
    setStockTypes,
    setESGGameType,
    setMinEnvironmentRating,
    setMinSocialRating,
    setMinGovernanceRating,
    setGameWinningValue

}){
   
    // const gameSettings = {
    //     "gameOne": {
    //         "name": "Quick Sprint Game",
    //         "type": "timeBased",
    //         "start": new Date(),
    //         "end": 
    //         "startingBalance":
    //         "tradeFee":
    //         "maxDailyTrades":
    //         "sectors":
    //         "ESGRestrictions":
    //     },
        // "gameTwo": {
        //     "name": 
        //     "type":
        //     "start":
        //     "end":
        //     "startingBalance":
        //     "tradeFee":
        //     "maxDailyTrades":
        //     "sectors":
        //     "ESGRestrictions":
        // },
        // "gameThree": {
        //     "name": 
        //     "type":
        //     "start":
        //     "end":
        //     "startingBalance":
        //     "tradeFee":
        //     "maxDailyTrades":
        //     "sectors":
        //     "ESGRestrictions":
        // },
        // "gameFour": {
        //     "name": 
        //     "type":
        //     "start":
        //     "end":
        //     "startingBalance":
        //     "tradeFee":
        //     "maxDailyTrades":
        //     "sectors":
        //     "ESGRestrictions":
        // },
        // "customGame":{
        //     "name": 
        //     "type":
        //     "start":
        //     "end":
        //     "startingBalance":
        //     "tradeFee":
        //     "maxDailyTrades":
        //     "sectors":
        //     "ESGRestrictions":
        // }
    //}

    const gameChange = (e) => {
        setQuickGame(e.currentTarget.value)
        if(e.currentTarget.value === "gameOne"){
            /// Set the name
            setGameName("Quick Sprint Game")
            /// Set the type
            setGameType("timeBased")
            /// Set the image 
            setGameImage("/stock_photo_1.jpg")
            /// Set the start date and end date - end is a week from now
            setGameStartDate(new Date())
            const weekFromdate = new Date();
            weekFromdate.setDate(weekFromdate.getDate() + 7);
            setGameEndDate(weekFromdate)
            /// Set the starting balance 
            setStartingBalance(100000)
            /// Set the trading fee 
            setTradingFee(5)
            /// Set the max trades per day 
            setMaxTradesPerDay(20)
            ///  Set the staock types 
            setStockTypes(['Basic Materials','Communication Services','Consumer Cyclical','Consumer Defensive','Energy','Financial Services','Healthcare','Industrials','Real Estate','Technology','Utilities'])
            /// Set the ESG game Type
            setESGGameType("No Restrictions")
            setMinEnvironmentRating(0)
            setMinSocialRating(0)
            setMinGovernanceRating(0)
        }else if (e.currentTarget.value === "gameTwo"){
            /// Set the name
            setGameName("Quick Race To Value Game")
            /// Set the type
            setGameType("valueBased")
            /// Set the image 
            setGameImage("/stock_photo_2.jpg")
            /// Set the start date and end date - end is blank for value based
            setGameStartDate(new Date())
            setGameEndDate("")
            /// Set the starting balance 
            setStartingBalance(100000)
            /// Set the trading fee 
            setTradingFee(5)
            /// Set the max trades per day 
            setMaxTradesPerDay(20)
            /// Set the winning value 
            setGameWinningValue(105000)
            ///  Set the staock types 
            setStockTypes(['Basic Materials','Communication Services','Consumer Cyclical','Consumer Defensive','Energy','Financial Services','Healthcare','Industrials','Real Estate','Technology','Utilities'])
            /// Set the ESG game Type
            setESGGameType("No Restrictions")
            setMinEnvironmentRating(0)
            setMinSocialRating(0)
            setMinGovernanceRating(0)
        }else if (e.currentTarget.value === "gameThree"){
            /// Set the name
            setGameName("Quick Environment Game")
            /// Set the type
            setGameType("timeBased")
            /// Set the image 
            setGameImage("/stock_photo_3.jpg")
            /// Set the start date and end date - end is a week from now
            setGameStartDate(new Date())
            const weekFromdate = new Date();
            weekFromdate.setDate(weekFromdate.getDate() + 7);
            setGameEndDate(weekFromdate)
            /// Set the starting balance 
            setStartingBalance(100000)
            /// Set the trading fee 
            setTradingFee(5)
            /// Set the max trades per day 
            setMaxTradesPerDay(20)
            ///  Set the staock types 
            setStockTypes(['Basic Materials','Communication Services','Consumer Cyclical','Consumer Defensive','Energy','Financial Services','Healthcare','Industrials','Real Estate','Technology','Utilities'])
            /// Set the ESG game Type
            setESGGameType("Environment")
            setMinEnvironmentRating(700)
            setMinSocialRating(0)
            setMinGovernanceRating(0)
        }
    }



    // /// Called when the quickGame State changes ///
    // useEffect(() => {
    //     console.log(quickGame)
    //     /// Quick Game One - 7 Days 100k 
    //     if(quickGame === "gameOne"){
    //         /// Set the name
    //         setGameName("Quick Sprint Game")
    //         /// Set the type
    //         setGameType("timeBased")
    //         /// Set the image 
    //         setGameImage("/stock_photo_1.jpg")
    //         // /// Set the start date and end date - end is a week from now
    //         // setGameStartDate(new Date())
    //         // const date = new Date();
    //         // date.setDate(date.getDate() + 7);
    //         // console.log(date)
            


    //     }

    //     /// Qucik Game Two - Value Game 100k to 105k 

    //     /// Qucik Game Three - Environment Game 

    //     /// Quick Game Four - Tech Stocks Only 




    // },[quickGame,setGameName,setGameType,setGameImage,setGameStartDate,setGameEndDate])


    return(
        <>
        <Card.Title className="gameOptionsCardTitle">Select Game</Card.Title>
        <Card.Text className="gameOptionsCardText">Get Started Now With a Quick Game</Card.Text>
        <Row md={4} sm={2} xs={2}>
            <Col>
                <ToggleButton
                            className="gameDetailsToggleButton"
                            key="gameOne"
                            id="radio-gameOne"
                            type="radio"
                            variant='outline-primary'
                            value="gameOne"
                            checked={quickGame === "gameOne"}
                            onChange={gameChange}
                        >
                        <Card className="quickGameCard">
                                <Card.Body>
                                    <SprintIcon className="quickGameCardIcons" color="green"/>
                                        <Card.Text className="quickGameCardBodyText">
                                            7 Days $100k to spend!
                                        </Card.Text>
                                </Card.Body>
                        </Card>
                </ToggleButton>
            </Col>
            <Col>
            <ToggleButton
                            className="gameDetailsToggleButton"
                            key="gameTwo"
                            id="radio-gameTwo"
                            type="radio"
                            variant='outline-primary'
                            value="gameTwo"
                            checked={quickGame === "gameTwo"}
                            // onChange={(e) => setQuickGame("gameTwo")}
                            onChange={gameChange}
                        >
                       <Card className="quickGameCard">
                                <Card.Body>
                                    <RaceFlagIcon className="quickGameCardIcons" />
                                        <Card.Text className="quickGameCardBodyText">
                                            Turn $100k into $105k first to win! 
                                        </Card.Text>
                                        
                                </Card.Body>
                        </Card>
                </ToggleButton>
            </Col>
            <Col>
            <ToggleButton
                            className="gameDetailsToggleButton"
                            key="GameThree"
                            id="radio-GameThree"
                            type="radio"
                            variant='outline-primary'
                            value="gameThree"
                            checked={quickGame === "gameThree"}
                            onChange={gameChange}
                        >
                        <Card className="quickGameCard">
                                <Card.Body>
                                    <TreeIcon className="quickGameCardIcons"/>
                                        <Card.Text className="quickGameCardBodyText">
                                            Green Stocks Only! 
                                        </Card.Text>
                                       
                                </Card.Body>
                        </Card>  
                </ToggleButton>
            </Col>
            <Col>
                  <ToggleButton
                            className="gameDetailsToggleButton"
                            key="gameFour"
                            id="radio-gameFour"
                            type="radio"
                            variant='outline-primary'
                            value="gameFour"
                            checked={quickGame === "gameFour"}
                            onChange={gameChange}
                        >
                        <Card className="quickGameCard">
                                <Card.Body>
                                    <CoderIcon className="quickGameCardIcons"/>
                                        <Card.Text className="quickGameCardBodyText">
                                            Technology Stocks Only! 
                                        </Card.Text>
                                        
                                </Card.Body>
                        </Card>  
                </ToggleButton>
            </Col>
        </Row>
        <Row>
            <Card.Text className="gameOptionsCardText m-0 bolded">Or</Card.Text>
            <Col>
                 <ToggleButton
                            className="gameDetailsToggleButton"
                            key="customGame"
                            id="radio-customGame"
                            type="radio"
                            variant='outline-primary'
                            value="customGame"
                            checked={quickGame === "customGame"}
                            onChange={gameChange}
                        >
                        <Card className="customGameCard">
                                <Card.Body>
                                    <PencilIcon className="quickGameCardIcons"/>
                                        <Card.Text className="quickGameCardBodyText">
                                            Customise Your Own Game!
                                        </Card.Text>
                                        
                                </Card.Body>
                        </Card>  
                </ToggleButton>
            </Col>
        </Row>
        </>
    )
}

export default GameQuickGameSelection;
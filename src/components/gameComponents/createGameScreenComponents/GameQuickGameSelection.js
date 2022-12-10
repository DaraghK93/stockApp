import {Card,Row,Col, ToggleButton} from "react-bootstrap"
import SprintIcon from "../../icons/SprintIcon";
import RaceFlagIcon from "../../icons/RaceFlag";
import TreeIcon from "../../icons/TreeIcon";
import CoderIcon from "../../icons/CoderIcon";
import PencilIcon from "../../icons/PencilIcon";
import {useSelector} from 'react-redux';

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
    /// Redux ///
    const user = useSelector((state) => state.user)
    // Get the userInfo piece of state, dont need loading and error
    const {userInfo} = user;

    /// Dates reused in game settings 
    const weekFromdate = new Date();
    weekFromdate.setDate(weekFromdate.getDate() + 7);

    /// All sectors ///
    const allSectors = ['Basic Materials','Communication Services','Consumer Cyclical','Consumer Defensive','Energy','Financial Services','Healthcare','Industrials','Real Estate','Technology','Utilities']

   
    const gameSettings = {
        "gameOne": {
            "name": "Quick Sprint Game",
            "type": "timeBased",
            "image": "/stock_photo_1.jpg",
            "startDate": new Date(),
            "endDate": weekFromdate,
            "startingBalance": 100000,
            "tradeFee": 5,
            "maxDailyTrades": 20,
            "winningValue":"",
            "sectors": allSectors, 
            "ESGRestrictions": "No Restrictions",
            "minERating": 0, 
            "minSRating": 0,
            "minGRating":0
        }}
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
        console.log(gameSettings[e.currentTarget.value])
        if(e.currentTarget.value === "gameOne"){
            /// Set the name
            setGameName(gameSettings[e.currentTarget.value]["name"])
            /// Set the type
            setGameType(gameSettings[e.currentTarget.value]["type"])
            /// Set the image 
            setGameImage(gameSettings[e.currentTarget.value]["image"])
            /// Set the start date and end date - end is a week from now
            setGameStartDate(gameSettings[e.currentTarget.value]["startDate"])
            setGameEndDate(gameSettings[e.currentTarget.value]["endDate"])
            /// Set the starting balance 
            setStartingBalance(gameSettings[e.currentTarget.value]["startingBalance"])
            /// Set the trading fee 
            setTradingFee(gameSettings[e.currentTarget.value]["tradeFee"])
            /// Set the max trades per day 
            setMaxTradesPerDay(gameSettings[e.currentTarget.value]["maxDailyTrades"])
            /// Set the winning value 
            setGameWinningValue(gameSettings[e.currentTarget.value]["winningValue"])
            ///  Set the staock types 
            setStockTypes(gameSettings[e.currentTarget.value]["sectors"])
            /// Set the ESG game Type
            setESGGameType(gameSettings[e.currentTarget.value]["ESGRestrictions"])
            setMinEnvironmentRating(gameSettings[e.currentTarget.value]["minERating"])
            setMinSocialRating(gameSettings[e.currentTarget.value]["minSRating"])
            setMinGovernanceRating(gameSettings[e.currentTarget.value]["minGRating"])
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
        }else if (e.currentTarget.value === "gameFour"){
            /// Set the name
            setGameName("Quick Tech Only Game")
            /// Set the type
            setGameType("timeBased")
            /// Set the image 
            setGameImage("/stock_photo_4.jpg")
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
            setStockTypes(['Technology'])
            /// Set the ESG game Type
            setESGGameType("No Restrictions")
            setMinEnvironmentRating(0)
            setMinSocialRating(0)
            setMinGovernanceRating(0)
        }else if(e.currentTarget.value === "customGame"){
            /// Set the name
            setGameName(`${userInfo.firstname}'s Stock Trading Game`)
            /// Set the type
            setGameType("")
            /// Set the image 
            setGameImage("")
            /// Set the start date and end date - end is a week from now
            setGameStartDate(new Date())
            const weekFromdate = new Date();
            weekFromdate.setDate(weekFromdate.getDate() + 7);
            setGameEndDate(weekFromdate)
            /// Set the starting balance 
            setStartingBalance(100000)
            /// Set the trading fee 
            setTradingFee(20)
            /// Set the max trades per day 
            setMaxTradesPerDay(5)
            /// set game winning value 
            setGameWinningValue()
            ///  Set the staock types 
            setStockTypes(['Basic Materials','Communication Services','Consumer Cyclical','Consumer Defensive','Energy','Financial Services','Healthcare','Industrials','Real Estate','Technology','Utilities'])
            /// Set the ESG game Type
            setESGGameType("")
            setMinEnvironmentRating("")
            setMinSocialRating("")
            setMinGovernanceRating("")

        }
    }

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
/// Description:
//      This coponent is used for the game creation screen
//      It is used to display the options for creating a game along with the pagination
import {Card,Row,Col,Button} from "react-bootstrap"
import { APIName } from '../../../constants/APIConstants'
import { useState } from 'react';
import { API } from "aws-amplify";
import {useSelector} from 'react-redux';


/// GameCreationOptionsCard ///
//  prprs:
//      children         - The children of the component https://reactjs.org/docs/composition-vs-inheritance.html
//      setScreen        - Setter to set createGameScreen state
//      screen           - The screen state set by setScreen
//      gameType         - The type of game, depedning upon game type there will  be extra screen for valueBased game 
//      disableNextStep  - This is boolean, true then cant go onto next step, false then you can go onto next step 
function GameCreationOptionsCard({children, setScreen, screen, disableNextStep, 
                                gameName, gameType, gameImage, gameStartDate, gameEndDate, 
                                startingBalance, tradingFee, maxTradesPerDay, gameWinningValue,  
                                stockTypes, minEnvironmentRating,  minSocialRating, minGovernanceRating}){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //Redux
    const user = useSelector((state) => state.user)
    const {userInfo} = user
    const userToken = userInfo.token

    const createGame = async () => {
        try{
            setLoading(true)
            let path = '/api/league/createleague'
            // token in header
            // Set the common fields in the body 
            let myInit = {
                    headers : {"x-auth-token": userToken},       
                    body:{
                        "leagueName":gameName ,
                        "leagueType":gameType,
                        "startingBalance": startingBalance,
                        "maxDailyTrades": maxTradesPerDay,
                        "tradingFee": tradingFee,
                        "startDate": gameStartDate,
                        "image": gameImage,
                        "sectors": stockTypes,
                        "minERating": minEnvironmentRating,
                        "mingSRating": minSocialRating,
                        "mingGRating": minGovernanceRating
                    }
            }
            /// Set unique fields to the game type 
            if (gameType === "valueBased"){
                myInit.body.winningValue = gameWinningValue
            }else if(gameType === "valueBased"){
                myInit.body.endDate = gameEndDate
            }
            /// Send the request 
            const res = await API.get(APIName, path, myInit)
            
            setLoading(false)
        }catch(error){
            setError(error.response.data.errormessage)
            setLoading(false)
        }
    }

    return(
        <Card className="my-5">
            <Card.Body>
                {children}
                <Row className="containerButtons" lg={2} md={2} xs={2}>
                    <Col className="prevNextCol">
                        {screen > 1 &&
                        <Button
                            className="prevNextButtons"
                            onClick={() => {
                                setScreen(screen-1)
                            }}
                        >Back</Button>
                    }
                    </Col>
                    {(screen === 7 && gameType === "valueBased") || (screen === 6 && gameType === "timeBased")  ?
                        <Col className="prevNextCol">
                            <Button
                                className="prevNextButtons"
                                disabled={disableNextStep}
                                onClick={createGame}
                            >Finish</Button>
                        </Col>
                        :
                        <Col className="prevNextCol">
                            <Button
                                className="prevNextButtons"
                                disabled={disableNextStep}
                                onClick={() => {
                                    setScreen(screen+1)
                                }}
                            >Next</Button>
                        </Col>
                    }      
            </Row>
            </Card.Body>
        </Card>
    )

}


export default GameCreationOptionsCard;
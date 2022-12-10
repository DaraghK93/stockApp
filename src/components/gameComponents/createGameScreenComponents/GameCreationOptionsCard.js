/// Description:
//      This coponent is used for the game creation screen
//      It is used to display the options for creating a game along with the pagination
import {Card,Row,Col,Button} from "react-bootstrap"
import { APIName } from '../../../constants/APIConstants'
import { useState } from 'react';
import { API } from "aws-amplify";
import MessageAlert from "../../widgets/MessageAlert/MessageAlert";
import LoadingSpinner from "../../widgets/LoadingSpinner/LoadingSpinner";
import {useNavigate} from "react-router-dom"

import { useSelector,useDispatch } from 'react-redux';
import {updateActivePortfolios} from '../../../actions/portfolioActions';


/// GameCreationOptionsCard ///
//  props:
//      children         - The children of the component https://reactjs.org/docs/composition-vs-inheritance.html
//      setScreen        - Setter to set createGameScreen state
//      screen           - The screen state set by setScreen
//      gameType         - The type of game, depedning upon game type there will  be extra screen for valueBased game 
//      disableNextStep  - This is boolean, true then cant go onto next step, false then you can go onto next step 
function GameCreationOptionsCard({children, setScreen, screen, disableNextStep, 
                                gameName, gameType, gameImage, gameStartDate, gameEndDate, 
                                startingBalance, tradingFee, maxTradesPerDay, gameWinningValue,  
                                stockTypes, minEnvironmentRating,  minSocialRating, minGovernanceRating,
                                mobileScreen
                            }){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /// naviagte - to redirect 
    const navigate = useNavigate()

    //Redux
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const {userInfo} = user
    const userToken = userInfo.token

    const createGame = async () => {
        try{
            setLoading(true)
            setError()
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
            }else if(gameType === "timeBased"){
                myInit.body.endDate = gameEndDate
            }
            /// Send the request 
            const res = await API.post(APIName, path, myInit)
            /// Just console log for now 
            console.log(res)
            if (res.newLeague.active){
                /// If the game is active then update the active portfolios state in redux 
                /// Called becuase creating a game will also create a portfolio
                dispatch(updateActivePortfolios(userInfo.token))  
            }
            /// Will need to be updated to redirect to game page 
            navigate(`/game`)
            setLoading(false)
        }catch(error){
            /// Will be hit if error in the POST 
            setError(error.response.data.errormessage)
            setLoading(false)
        }
    }

    const PrevNextButtons = () => {
        return(
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
                    {(screen === 8 && gameType === "valueBased") || (screen === 7 && gameType === "timeBased")  ?
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
        )
    }


    const Content = () => {
        return (
            <>
                {children}
                {error && <MessageAlert variant="danger">{error}</MessageAlert>}
                {loading && <LoadingSpinner/>}
                {mobileScreen === true ?
                    <Card className="tradeButtonCard rounded-0" >
                        <PrevNextButtons />
                    </Card>
                :
                    <PrevNextButtons />
            }
            </>
        )
    }



    return(
        <>
        {mobileScreen === true ? <Content className="my-5"/>
        :
        <Card className="my-5">
           <Card.Body>
             <Content/>
           </Card.Body>
        </Card> 
    }
    </>
    )

}


export default GameCreationOptionsCard;
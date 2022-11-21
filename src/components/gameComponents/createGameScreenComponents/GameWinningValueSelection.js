import {Card,Row,Col} from "react-bootstrap"
import RangeSlider from "../../widgets/RangeSlider/RangeSlider"
import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal"
import { useEffect,useState } from "react"
import LoadingSpinner from "../../widgets/LoadingSpinner/LoadingSpinner"
import MessageAlert from "../../widgets/MessageAlert/MessageAlert"

function GameWinningValueSelection({startingBalance, gameWinningValue, setGameWinningValue}){
    const [max, setMax] = useState()
    const [min, setMin] = useState()
    const [loading, setLoading] = useState(true)
    const [warning, setWarning] = useState(false)
    const [error, setError] = useState(true)

    useEffect(() => { 
        // On the first load will gameWinningValue will be undefined, set the initial value 
        if (typeof gameWinningValue === "undefined"){
            setLoading(true)
            setGameWinningValue(Math.round(startingBalance*1.05))
            setMin(Math.round(startingBalance*1.01))
            setMax(Math.round(startingBalance*1.15))
            setLoading(false)
        /// If a user changes the portfolio starting balance and comes back to this page need to update the max and min to reflect this 
        }else if (Math.round(gameWinningValue*1.01) !== min || Math.round(gameWinningValue*1.15) !== max){
            setLoading(true)
            setMin(Math.round(startingBalance*1.01))
            setMax(Math.round(startingBalance*1.15))
            /// If the game winning value not within the limits of max and min then reset it too as doesnt max sense 
            /// Dont reset it if still makes sense the user may just be going back to adjust some things 
            /// Note dont use max/min for this check the state may not be updated quick enough calculate it using starting balance 
            if (gameWinningValue > Math.round(startingBalance*1.15) || gameWinningValue < Math.round(startingBalance*1.01)){
                /// Set the ame winning value back within the limits to the recommended value
                //setGameWinningValue(Math.round(startingBalance*1.05))
                setError(true)
            }else{
                setError(false)
            }
            setLoading(false)
        }
        /// Give the user a warning if they go over the average storck market retrun value of 10% for year 
        if(gameWinningValue > startingBalance*1.10 && gameWinningValue < max && gameWinningValue < min){
            setWarning(true)
        }else{
            setWarning(false)
        }
    },[gameWinningValue,setGameWinningValue,startingBalance, max, min])

    return(
        <>
        <Card.Title className="gameOptionsCardTitle">Game Winning Value</Card.Title>
        {typeof gameWinningValue === "undefined" || loading ? <LoadingSpinner/>
        :
        <>  
          <Row className="pb-2">
                <Col>
                        <Card.Text className="gameOptionsCardText">
                            Winning value of  
                            { gameWinningValue < min || gameWinningValue > max  ?
                                <>
                                 <span className="spanSpaceLeft red">${gameWinningValue}</span>
                                 <span className="spanSpaceLeft">is</span>
                                 <span className="spanSpaceLeft red spanSpaceRight">{`${(((gameWinningValue/startingBalance) - 1)*100).toFixed(2)}%`}</span>
                                 <span>profit with starting balance of</span>
                                 <span className="spanSpaceLeft red">${`${startingBalance}`}</span>
                                </>
                            :
                                <>
                                <span className="spanSpaceLeft" >${gameWinningValue}</span>
                                <span className="spanSpaceLeft">is</span>
                                <span className="spanSpaceLeft spanSpaceRight" >{`${(((gameWinningValue/startingBalance) - 1)*100).toFixed(2)}%`}</span>
                                <span>profit with starting balance of</span>
                                <span className="spanSpaceLeft">${`${startingBalance}`}</span>
                                </>
                            }
                        </Card.Text>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card.Text className="gameOptionsCardSubTitle">Winning Value
                    <InfoButtonModal title="Winning Value" info={<>
                            <p>You have selected a value based game.</p>
                            <p>In a value based game players trade stocks to race to a winning value set by you.</p>
                            <p>The stock market returns on average <span className="bolded">10% every year</span>.</p>
                            <p>As you have chosen <span className="bolded">${startingBalance} </span> as the starting balance for each player below are some suggestions based on that balance</p>
                            <p><span className="bolded">Short Game (1% to 5%)</span> - Winning value of <span className="bolded">${Math.round(startingBalance*1.01)}</span> to <span className="bolded">${Math.round(startingBalance*1.05)}</span>.</p>
                            <p><span className="bolded">Medium Game (5% to 10%)</span> - Winning value of <span className="bolded">${Math.round(startingBalance*1.05)}</span> to <span className="bolded">${Math.round(startingBalance*1.1)}</span> </p>
                            <p><span className="bolded">Long Game (10% to 15%)</span> - Winning value of <span className="bolded">${Math.round(startingBalance*1.1)}</span> to <span className="bolded">${Math.round(startingBalance*1.15)}</span>.</p>
                            </>}/>
                    </Card.Text>  
                </Col>
            </Row>
            <Row>
                <Col>
                    <RangeSlider 
                        setter={setGameWinningValue}
                        state={gameWinningValue.toString()}
                        min={min}
                        max={max}
                        label={"$"}
                        showError={false}
                    />
                </Col>
            </Row> 
            {warning && <MessageAlert variant="warning">
                <p>
                    <span className="bolded">Warning:</span> A winning value of ${gameWinningValue} is greater than the average stock market return in a year (10%).
                </p>
                <p style={{"margin":"0"}}>
                    Setting this may result in a long game.
                </p>
                </MessageAlert>}
            {error && <MessageAlert variant="danger">
                <p>
                    <span className="bolded">Error:</span> A winning value of ${gameWinningValue} is not within the limit ${min} to ${max}.
                </p>
                <p style={{"margin":"0"}}>
                    The max and min limits are set based upon the portfolio starting value of ${startingBalance}.
                </p>
                <p>
                     The min limit being 1% (${min}) profit and the max being 15% (${max}) profit.
                </p>
                </MessageAlert>}
        </>
        }   
        </>
    )
}

export default GameWinningValueSelection
import {Card,Row,Col} from "react-bootstrap"
import RangeSlider from "../../widgets/RangeSlider/RangeSlider"
import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal"
import { useEffect,useState } from "react"
import LoadingSpinner from "../../widgets/LoadingSpinner/LoadingSpinner"

function GameWinningValueSelection({startingBalance, gameWinningValue, setGameWinningValue}){
    const [max, setMax] = useState()
    const [min, setMin] = useState()
    const [loading, setLoading] = useState(true)

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
                setGameWinningValue(Math.round(startingBalance*1.05))
            }
            setLoading(false)
        }
    },[gameWinningValue,setGameWinningValue,startingBalance, max, min])

    return(
        <>
        <Card.Title className="gameOptionsCardTitle">Game Winning Value</Card.Title>
        {typeof gameWinningValue === "undefined" || loading ? <LoadingSpinner/>
        :
        <>
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
                    />
                </Col>
            </Row>
        </>
        }   
        </>
    )
}

export default GameWinningValueSelection
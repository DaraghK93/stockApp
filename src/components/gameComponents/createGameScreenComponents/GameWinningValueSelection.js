import {Card,Row,Col} from "react-bootstrap"
import RangeSlider from "../../widgets/RangeSlider/RangeSlider"
import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal"
import { useEffect,useState } from "react"
import LoadingSpinner from "../../widgets/LoadingSpinner/LoadingSpinner"

function GameWinningValueSelection({startingBalance, gameWinningValue, setGameWinningValue}){
    const [max, setMax] = useState(Math.round(startingBalance*1.01))
    const [min, setMin] = useState(Math.round(startingBalance*1.15))
    const [loading, setLoading] = useState(true)

    useEffect(() => { 
        console.log("Called")
        // On the first load will be undefined, set the initial value 
        if (typeof gameWinningValue === "undefined"){
            setLoading(true)
            console.log("UNDEFINED")
            setGameWinningValue(Math.round(startingBalance*1.05))
            setLoading(false)
        /// If a user changes the portfolio starting balance need to update max and mins 
        }else if (Math.round(startingBalance*1.01) !== min || Math.round(startingBalance*1.15) !== max){
            setLoading(true)
            console.log("HIT HERERER")
            setMin(Math.round(startingBalance*1.01))
            setMax(Math.round(startingBalance*1.15))
            setGameWinningValue(Math.round(startingBalance*1.05))
            setLoading(false)
        }
    },[gameWinningValue,setGameWinningValue,startingBalance])

    /// User has gone back a step, changed the starting balance
    /// Need to adjust the suggestions based uon this 
    //if (Math.round(startingBalance*1.01) !== min || Math.round(startingBalance*1.15) !== max){
    //    setLoading(true)
    //    setMin(Math.round(startingBalance*1.01))
    //    setMax(Math.round(startingBalance*1.15))
    //    setLoading(false)
    //}

    console.log(max)
    console.log(min)


    console.log("Winning Val", gameWinningValue)

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
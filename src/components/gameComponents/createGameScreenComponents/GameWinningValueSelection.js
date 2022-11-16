import {Card,Row,Col} from "react-bootstrap"
import RangeSlider from "../../widgets/RangeSlider/RangeSlider"
import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal"
import { useEffect,useState } from "react"
import LoadingSpinner from "../../widgets/LoadingSpinner/LoadingSpinner"

function GameWinningValueSelection({startingBalance, gameWinningValue, setGameWinningValue}){
    const [max, setMax] = useState(Math.round(startingBalance*1.01))
    const [min, setMin] = useState(Math.round(startingBalance*1.15))

    useEffect(() => { 
        console.log("Called")
        // On the first load will be undefined, set the initial value 
        if (typeof gameWinningValue === "undefined"){
            setGameWinningValue(Math.round(startingBalance*1.05))
        }
    },[gameWinningValue,setGameWinningValue,startingBalance])

    /// User has gone back a step, changed the starting balance which no longer lies between max and min
    /// Need to reset and adjust these values 
    if (Math.round(startingBalance*1.01) !== min || Math.round(startingBalance*1.15) !== max){
        setMin(Math.round(startingBalance*1.01))
        setMax(Math.round(startingBalance*1.15))
    }

    console.log(max)
    console.log(min)


    console.log(gameWinningValue)

    return(
        <>
        {gameWinningValue === "undefined" ? <LoadingSpinner/>
        :
        <> 
        <Card.Title className="gameOptionsCardTitle">Game Winning Value</Card.Title>
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
        </>
        }
            
          
        </>
    )
}

export default GameWinningValueSelection
import {Card,Row,Col} from "react-bootstrap"
import {useEffect,useState} from 'react'
import LoadingSpinner from "../../widgets/LoadingSpinner/LoadingSpinner"
import moment from "moment";

function GameCreationSummary({gameType,gameName, gameStartDate, gameEndDate, startingBalance, tradingFee, maxTradesPerDay, gameWinningValue, stockTypes, ESGGameType }){
    const [gameSummary, setGameSummary] = useState()
    const [loading, setLoading] = useState(true)

    /// useEffect ///
    useEffect(() => { 
        setLoading(true)
        var summary = [
                {"displayName":"Game Name", "value": gameName},
                {"displayName":"Game Start Date", "value": moment(gameStartDate).format('MMMM d, YYYY')},
                {"displayName":"Game Starting Balance", "value": `$${(startingBalance).toLocaleString('en')}`},
                {"displayName":"Trading Fee", "value": `$${(tradingFee).toLocaleString('en')}`},
                {"displayName":"Max Daily Trades", "value": `${maxTradesPerDay.toLocaleString('en')}`},
                {"displayName":"Tradable Sectors", "value": stockTypes},
                {"displayName":"ESG Restrictions", "value": ESGGameType}
        ]
        if (gameType === "timeBased"){
            summary.splice(1,0,{"displayName":"Game Type", "value": "Time"})
            summary.splice(3,0, {"displayName":"Game End Date", "value": moment(gameEndDate).format('MMMM d, YYYY')})
        }else if (gameType === "valueBased"){
            summary.splice(1,0,{"displayName":"Game Type", "value": "Value"})
            summary.splice(3,0, {"displayName":"Game Winning Value", "value":`$${(gameWinningValue).toLocaleString('en')}`})
        }
        setGameSummary(summary)
        setLoading(false)
    },[ESGGameType,gameEndDate,gameName,gameStartDate,gameType,gameWinningValue,maxTradesPerDay,startingBalance,stockTypes,tradingFee])

    return(
        <>
             <Card.Title className="gameOptionsCardTitle">Game Summary</Card.Title>
             <Card.Body>
                {loading ? <LoadingSpinner/>
                :
                <Row md={3} sm={1} xs={1}>
                     {gameSummary.map((option) => (
                        <Col className="pb-3" key={`${option.displayName}`}>
                            <Card.Text className="mb-0 mt-1 gameCreationSummaryHeadingText">{option.displayName}</Card.Text>
                            {option.displayName === "Tradable Sectors" ?
                                <>
                                {option.value.length === 11 ?
                                    <Card.Text className=" pt-0 gameCreationSummaryText">All</Card.Text>
                                :
                                <> 
                                {
                                    <Card.Text className="pt-0 gameCreationSummaryText" >{option.value.join(", ")}</Card.Text>
                                }
                                </>
                                }
                                </>
                            :
                            <Card.Text className="pt-0 gameCreationSummaryText">{option.value}</Card.Text>
                            }
                            
                        </Col>                        
                            ))}
                </Row>
                }
             </Card.Body>
        </>
        )
}

export default GameCreationSummary;
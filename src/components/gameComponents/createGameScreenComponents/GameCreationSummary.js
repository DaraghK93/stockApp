import {Card,Row,Col} from "react-bootstrap"
import {useEffect,useState} from 'react'
import LoadingSpinner from "../../widgets/LoadingSpinner/LoadingSpinner"
import moment from "moment";



function GameCreationSummary({gameType,gameName, gameStartDate, gameEndDate, startingBalance, tradingFee, maxTradesPerDay, gameWinningValue, stockTypes, ESGGameType }){
    const [gameSummary, setGameSummary] = useState()
    const [loading, setLoading] = useState(true)


    console.log(typeof moment(gameStartDate).format('MMMM d, YYYY'))


    /// useEffect ///
    useEffect(() => { 
        setLoading(true)
        if (gameType === "timeBased"){
            setGameSummary([
                {"displayName":"Game Name", "value": gameName},
                {"displayName":"Game Type", "value": "Time"},
                {"displayName":"Game Start Date", "value": moment(gameStartDate).format('MMMM d, YYYY')},
                {"displayName":"Game End Date", "value": moment(gameEndDate).format('MMMM d, YYYY')},
                {"displayName":"Game Starting Balance", "value": `$${(startingBalance).toLocaleString('en')}`},
                {"displayName":"Trading Fee", "value": `$${(tradingFee).toLocaleString('en')}`},
                {"displayName":"Max Daily Trades", "value": `${maxTradesPerDay.toLocaleString('en')}`},
                {"displayName":"Tradable Sectors", "value": stockTypes},
                {"displayName":"ESG Restrictions", "value": ESGGameType}
            ])
        }else if (gameType === "valueBased"){
            setGameSummary([
                {"displayName":"Game Name", "value": gameName},
                {"displayName":"Game Type", "value": "Value"},
                {"displayName":"Game Start Date", "value": moment(gameStartDate).format('MMMM d, YYYY')},
                {"displayName":"Game Winning Value", "value": gameWinningValue},
                {"displayName":"Game Starting Balance", "value": startingBalance},
                {"displayName":"Trading Fee", "value": tradingFee},
                {"displayName":"Max Daily Trades", "value": maxTradesPerDay},
                {"displayName":"Tradable Sectors", "value": stockTypes},
                {"displayName":"ESG Restrictions", "value": ESGGameType}
            ])
        }
        setLoading(false)
    },[])

    return(
        <>
             <Card.Title className="gameOptionsCardTitle">Game Summary</Card.Title>
             <Card.Body>
                {loading ? <LoadingSpinner/>
                :
                <Row md={3} sm={2} xs={1}>
                     {gameSummary.map((option) => (
                        <Col key={`${option.displayName}`}>
                            <Card.Text className="mb-0 mt-1 gameCreationSummaryHeadingText">{option.displayName}</Card.Text>
                            <Card.Text className=" pt-0 gameCreationSummaryText">{option.value}</Card.Text>
                        </Col>                        
                            ))}
                </Row>
                }
             </Card.Body>
        </>
        )
}



                // <Row md={3} sm={2} xs={1}>
                //     <Col>
                //         <Card.Text className="mb-0 mt-1 gameCreationSummaryHeadingText">Game Name</Card.Text>
                //         <Card.Text className=" pt-0 gameCreationSummaryText">{gameName}</Card.Text>
                //     </Col>
                //     <Col>
                //         <Card.Text className="mb-0 mt-1 gameCreationSummaryHeadingText">Game Type</Card.Text>
                //     </Col>
                //     <Col>
                //          <Card.Text className="mb-0 mt-1 gameCreationSummaryHeadingText"> Start Date</Card.Text>
                //     </Col>
                //     {gameType === "timeBased"?
                //     <Col>
                //         <Card.Text className="mb-0 mt-1 gameCreationSummaryHeadingText">End Date </Card.Text>
                //     </Col>
                //     :
                //     <Col>
                //         <Card.Text className="mb-0 mt-1 gameCreationSummaryHeadingText">Winning Value</Card.Text>
                //     </Col>
                //     }
                //     <Col>
                //         <Card.Text className="mb-0 mt-1 gameCreationSummaryHeadingText"> Starting Balance </Card.Text>
                //     </Col>
                //     <Col>
                //          <Card.Text className="mb-0 mt-1 gameCreationSummaryHeadingText">Trading Fee </Card.Text>
                //     </Col>
                //     <Col>
                //         <Card.Text className="mb-0 mt-1 gameCreationSummaryHeadingText">Max Daily Trades </Card.Text>
                //     </Col>
                //     <Col>
                //         <Card.Text className="mb-0 mt-1 gameCreationSummaryHeadingText">Sectors  </Card.Text>
                //     </Col>
                //     <Col>
                //          <Card.Text className="mb-0 mt-1 gameCreationSummaryHeadingText"> ESG Restrictions </Card.Text>
                //     </Col>
                // </Row>

export default GameCreationSummary;
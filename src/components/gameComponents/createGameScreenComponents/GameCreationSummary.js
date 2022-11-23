import {Card,Row,Col} from "react-bootstrap"

function GameCreationSummary({gameType}){
    return(
        <>
             <Card.Title className="gameOptionsCardTitle">Game Summary</Card.Title>
             <Card.Body>
                <Row md={3}>
                    <Col>
                        Game Name
                    </Col>
                    <Col>
                        Game Type
                    </Col>
                    <Col>
                        Start Date
                    </Col>
                    {gameType === "timeBased"?
                    <Col>
                        End Date 
                    </Col>
                    :
                    <Col>
                        Winning Value
                    </Col>
                    }
                    <Col>
                        Starting Balance 
                    </Col>
                    <Col>
                        Trading Fee
                    </Col>
                    <Col>
                        Max Daily Trades 
                    </Col>
                    <Col>
                        Sectors 
                    </Col>
                    <Col>
                        ESG Restrictions 
                    </Col>
                </Row>
             </Card.Body>
        </>
        )
}

export default GameCreationSummary;
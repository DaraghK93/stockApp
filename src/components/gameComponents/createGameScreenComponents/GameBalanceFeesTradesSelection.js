import {Card,Row,Col} from "react-bootstrap"
import RangeSlider from "../../widgets/RangeSlider/RangeSlider"


function GameBalanceFeesTradeSelection({startingBalance, setStartingBalance, tradingFee, setTradingFee, maxTradesPerDay,setMaxTradesPerDay}){
    ///
    //  Max - 1,000,000
    //  Defautl - 100,000
    //  Min - 1000
    return(
        <>
            <Card.Title className="gameOptionsCardTitle">Balances and Fees</Card.Title>
            <Row>
                <Col>
                    <Card.Text className="gameOptionsCardText">Starting Balance</Card.Text> 
                </Col>
            </Row>
            <Row>
                <Col>
                    <RangeSlider 
                        label={`$`}
                        setter={setStartingBalance}
                        state={startingBalance}
                        min={1000}
                        max={1000000}
                        startWidth={"5.75rem"}
                        
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card.Text className="gameOptionsCardText">Trading Fee</Card.Text> 
                </Col>
            </Row>
            <Row>
                <Col>
                    <RangeSlider 
                        label={`$`}
                        setter={setTradingFee}
                        state={tradingFee}
                        min={1}
                        max={300}
                        startWidth={"2.5rem"}
                     
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card.Text className="gameOptionsCardText">Max Daily Trades</Card.Text> 
                </Col>
            </Row>
            <Row>
                <Col>
                    <RangeSlider 
                        setter={setMaxTradesPerDay}
                        state={maxTradesPerDay}
                        min={1}
                        max={100}
                        startWidth={"2rem"}
                    />
                </Col>
            </Row>
            
        </>
    )
}

export default GameBalanceFeesTradeSelection
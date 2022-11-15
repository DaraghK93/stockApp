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
                        label={`$ ${startingBalance}`}
                        setter={setStartingBalance}
                        state={startingBalance}
                        min={100000}
                        max={10000000}
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
                        label={`$ ${tradingFee}`}
                        setter={setTradingFee}
                        state={tradingFee}
                        min={10}
                        max={300}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card.Text className="gameOptionsCardText">Max Daily trades</Card.Text> 
                </Col>
            </Row>
            <Row>
                <Col>
                    <RangeSlider 
                        label={`${maxTradesPerDay}`}
                        setter={setMaxTradesPerDay}
                        state={maxTradesPerDay}
                        min={1}
                        max={100}
                    />
                </Col>
            </Row>
            
        </>
    )
}

export default GameBalanceFeesTradeSelection
import {Card,Row,Col} from "react-bootstrap"
import RangeSlider from "../../widgets/RangeSlider/RangeSlider"
import InfoButtonModal from "../../widgets/InfoButtonModal/InfoButtonModal"


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
                    <Card.Text className="gameOptionsCardText">Starting Balance
                    <InfoButtonModal title="Starting Balance" info={<p>The Starting Balance is the Dollar amount each player in the game will have to invest. Each player starts out with the same amount.</p>}/>
                    </Card.Text> 
                    
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
                    <Card.Text className="gameOptionsCardText">Trading Fee
                    <InfoButtonModal title="Trading Fee" info={
                        <>
                            <p>The Trading Fee is the dollar amount deducted from each trade made within the league. </p>
                            <p>The higher the trading fee the more risk associated with performing trades as they will cost more money to perform.</p>
                            <p>The lower the trading fee the more freedom the user has to perform trades without worrying about extra fees.</p>
                        </>
                        }/>
                    </Card.Text> 
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
                    <Card.Text className="gameOptionsCardText">Max Daily Trades
                    <InfoButtonModal title="Max Daily Trades" info={<>
                            <p>The Max Daily Trades sets a limit on the number of trades a user can make within a day.</p>
                            <p>A smaller number set here will make the user have to use there trades more wisely.</p>
                            <p>A larger number set here will give players more freedom to trade.</p>
                            </>}/>
                    </Card.Text> 
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
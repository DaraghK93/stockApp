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
                    <InfoButtonModal title="Starting Balance" info={
                        <>
                        <p>The Starting Balance is the Dollar amount each player in the game will have to invest.</p>
                        <p>Each player starts out with the starting balance.</p>
                        <p><span className="bolded">Relaxed ($300,000 - $1,000,000)</span>- Makes the game less realisitc but more relaxed game with freedom to invest</p>
                        <p><span className="bolded">Medium ($25,000 - $300,000)</span>- Still gives user lot of freedom but need to be more cautious about some investments</p>
                        <p><span className="bolded">Harsh ($1,000 - $25,000)</span>- More realisitic game, the user has less money to spend and needs to think about larger investments.</p>
                        </>
                   }/>
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
                        startWidth={"6.75rem"}
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
                            <p><span className="bolded">Relaxed ($1 - $20)</span>- Users wont be as penalised for making lots of trades</p>
                            <p><span className="bolded">Medium ($20 - $150)</span>- Users penalised slighty more and may have to think more about trades.</p>
                            <p><span className="bolded">Harsh ($150 - $300)</span>- Harsher penalty, the user will have to seriously think if they can make money on this trade factoring in the trade fee.</p>
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
                        startWidth={"2.75rem"}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card.Text className="gameOptionsCardText">Max Daily Trades
                    <InfoButtonModal title="Max Daily Trades" info={<>
                            <p>The Max Daily Trades sets a limit on the number of trades a user can make within a day.</p>
                            <p>A smaller number set here will make the user have to use their trades more wisely.</p>
                            <p>A larger number set here will give players more freedom to trade.</p>
                            <p><span className="bolded">Relaxed (50 - 100)</span>- Lot of freedom for the user to make lots of trades.</p>
                            <p><span className="bolded">Medium (15 - 50)</span>- Bit tighter resticitions users will have to think more about how they use their daily limit.</p>
                            <p><span className="bolded">Harsh (1 - 15)</span>- Very restrictive, a user will really need to think about how they can get the most out of their max daily trades.</p>
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